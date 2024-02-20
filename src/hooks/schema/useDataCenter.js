import { toRefs, watch, ref, computed } from 'vue'
import {
  ApiType,
  BASE_ECHART,
  INDICATOR,
  BOXPLOT_ECHART,
  CAPSULE_BAR_ECHART,
  CIRCLE,
  DASHBOARD_ECHART,
  FORM_SELECT,
  OTHER_ECHART,
  RADAR_ECHART,
  SCATTER_ECHART,
  SCATTER_ECHART_BASE,
  SCROLL_TABLE,
  TRAPEZIUM_ECHART,
} from '@/config/data-source'
import { throwError, toJson, isEmpty, logger } from '@/utils/util'
import { getModelDataById, compFetchData } from '@/api/modules/analysis-dashboard.api'
import { useStore } from '@/store'
import { buildReqParams } from '@/config/utils'

/**
 * 数据中心hook
 * @param com 传入的组件对象
 */
export const useDataCenter = com => {
  const { schemaStore } = useStore() // 执行获取schema专属store
  const { apiData, events, componentType } = toRefs(com)
  const dvData = ref({})
  const params = ref({})
  const baseList = [BASE_ECHART, SCATTER_ECHART, SCATTER_ECHART_BASE, BOXPLOT_ECHART]
  const axisConfig = [BASE_ECHART, SCATTER_ECHART, SCATTER_ECHART_BASE, RADAR_ECHART]
  const mapConfig = [
    OTHER_ECHART,
    CIRCLE,
    INDICATOR,
    TRAPEZIUM_ECHART,
    DASHBOARD_ECHART,
    FORM_SELECT,
    CAPSULE_BAR_ECHART,
  ]
  const legendConfig = [SCATTER_ECHART, SCATTER_ECHART_BASE, BOXPLOT_ECHART]
  let initFlag = true

  // 下钻配置数据
  const drillData = computed(() => apiData.value.config.drill || [])
  // 下钻层级
  const drillIndex = ref(0)
  // 下钻数据
  const drillFilters = ref([])
  // 是否可以下钻
  const couldDrill = computed(() => drillData.value.length > 0)

  // 设置dvData，读取数据并塞入存储数据
  const setDvData = async (filters = []) => {
    const { comId, type, config, compType } = apiData.value
    schemaStore.setGlobalLoading(true)
    try {
      // 获取源数据
      if (type === ApiType.static) {
        dvData.value = toJson(config.data, {})
      } else if (type === ApiType.model) {
        const { modelId, y, legend } = config
        const cfgFilters = config.filters || []
        // 如可以下钻，则从下钻对应层级取得x轴数据
        const drillX = drillData.value[drillIndex.value]
        const dimension = compType === RADAR_ECHART ? config.dimensionModel : undefined
        const axisFieldsModel = compType === RADAR_ECHART ? config.axisFieldsModel : null

        const mappingFields = mapConfig.includes(compType) ? config.mappingFieldsModel : null
        const x = couldDrill.value && drillX ? [drillX] : config.x
        const tableFields = compType === SCROLL_TABLE ? config.tableModelFields : null

        const lineData = baseList.includes(compType) ? {
          x: x.map(item => ({
            field: item.fieldId,
            title: item.title,
          })),
          y: y.map(item => ({
            field: item.fieldId,
            title: item.title,
            aggregator: item.aggregator,
          })),
          legend: legend.map(item => ({
            field: item.fieldId,
            title: item.title,
          })),
        } : null
        if (!isEmpty(modelId)) {
          dvData.value = await getModelDataById({
            dimension: dimension,
            modelId: modelId,
            ...mappingFields,
            ...lineData,
            ...axisFieldsModel,
            ...tableFields,
            compType: compType,
            // filters: [...cfgFilters, ...filters],
          })
          logger.primary(`==> 载入动态数据，comId：${comId} ，modelId：${modelId}`)
          // 设置系列数量
          if (dvData.value.yData && dvData.value.yData.length > 0) {
            config.seriesCount = dvData.value.yData.length
          }
        }
      } else {
        // for(let key in actParams) {
        //   params.value[key] = actParams[key]
        // }
        const axisFields = axisConfig.includes(compType) ? config.axisFields : null
        const mappingFields = mapConfig.includes(compType) ? config.mappingFields : null
        // const name = compType === SCATTER_ECHART || compType === SCATTER_ECHART_BASE ? config.name : undefined
        const dimension = compType === RADAR_ECHART ? config.dimension : undefined
        const boxFields = legendConfig.includes(compType)
          ? { x: config.boxFields.x, y: config.boxFields.y, legend: config.boxFields.nAmE }
          : null
        const tableFields = compType === SCROLL_TABLE ? config.tableFields : null
        if (!isEmpty(config.serviceId)) {
          dvData.value = await compFetchData({
            serviceId: config.serviceId,
            ...axisFields,
            // nAmE: name,
            ...boxFields,
            ...mappingFields,
            ...tableFields,
            dimension: dimension,
            ...params.value,
            compType,
          })
          // 设置系列数量
          if (dvData.value.yData && dvData.value.yData.length > 0) {
            config.seriesCount = dvData.value.yData.length
          }
        }
      }
    } catch (e) {
      throwError('useDataCenter/setDvData', e)
    }
    // setTimeout(() => {
    schemaStore.setGlobalLoading(false)
    // }, 800)
  }

  // 组件事件系统
  const dvEmit = (eventName, data) => {
    // 获取点击内容的所在维度索引seriesIndex，name，value
    const { seriesIndex, name } = data
    // 获取当前点击的x轴维度信息
    const xData = apiData.value.config.x[seriesIndex]
    // 如果x轴维度存在切设置过下钻，则拼装下钻filters信息
    if (drillIndex.value < drillData.value.length - 1) {
      // 如可以下钻，则从下钻对应层级取得x轴数据
      const drillX = drillData.value[drillIndex.value]
      const x = couldDrill.value && drillX ? drillX : xData
      drillFilters.value.push({
        ...x,
        complexFilter: {
          operator: 'AND',
          items: [{ oper: 'EQ', value: name }],
        },
      })
      drillIndex.value++ // 下钻层级
      setDvData(drillFilters.value)
    }
  }

  // 组件上卷事件
  const dvScrollUp = ({ index }) => {
    drillIndex.value = index
    if (index === 0) {
      drillFilters.value = []
    } else {
      drillFilters.value.splice(index)
    }
    setDvData(drillFilters.value)
  }

  /**
   * 设置并返回参数对象
   * @param {*} p
   * @returns
   */
  function buildParams(p = {}) {
    params.value = { ...params.value, ...p }
    // console.log(params.value)
    // return params.value
  }

  // 监听数据变更，如apis配置变化了或数据配置项apiData.source.config中修改了，则需要重新设置数据
  watch(
    [
      () => apiData.value.type,
      () => apiData.value.config.data,
      // () => apiData.value.config.x,
      // () => apiData.value.config.y,
      () => apiData.value.flushFlag,
    ],
    async () => {
      if (
        initFlag &&
        !events.value.defaultAction &&
        Object.keys(events.value).includes('defaultAction')
      ) {
        initFlag = false
      } else {
        drillIndex.value = 0
        drillFilters.value = []
        params.value = buildReqParams(apiData.value.config.reqParam)

        await setDvData()
      }
    },
    { deep: true, immediate: true },
  )

  return {
    dvData,
    apiData,
    drillData,
    drillIndex,
    drillFilters,
    couldDrill,
    dvEmit,
    dvScrollUp,
    buildParams,
    setDvData,
  }
}
