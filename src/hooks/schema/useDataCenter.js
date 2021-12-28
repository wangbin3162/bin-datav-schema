import { toRefs, watch, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ApiType } from '@/config/data-source'
import { throwError, toJson, isEmpty, logger } from '@/utils/util'
import { getModelDataById } from '@/api/modules/analysis-dashboard.api'

/**
 * 数据中心hook
 * @param com 传入的组件对象
 */
export const useDataCenter = com => {
  const $store = useStore()
  const { apiData } = toRefs(com)
  const dvData = ref({})

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
    const { comId, type, config } = apiData.value
    $store.commit('schema/setLoading', true)
    try {
      // 获取源数据
      if (type === ApiType.static) {
        dvData.value = toJson(config.data, {})
      } else {
        const { modelId, y } = config
        const cfgFilters = config.filters || []
        // 如可以下钻，则从下钻对应层级取得x轴数据
        const drillX = drillData.value[drillIndex.value]
        const x = (couldDrill.value && drillX) ? [drillX] : config.x
        if (!isEmpty(modelId) && !isEmpty(x) && !isEmpty(y)) {
          dvData.value = await getModelDataById({
            modelId,
            x,
            y,
            filters: [...cfgFilters, ...filters],
          })
          logger.primary(`==> 载入动态数据，comId：${comId} ，modelId：${modelId}`)
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
    $store.commit('schema/setLoading', false)
    // }, 800)
  }

  // 组件事件系统
  const dvEmit = (eventName, data) => {
    // 获取点击内容的所在维度索引seriesIndex，name，value
    const { seriesIndex, name, value } = data
    // 获取当前点击的x轴维度信息
    const xData = apiData.value.config.x[seriesIndex]
    // 如果x轴维度存在切设置过下钻，则拼装下钻filters信息
    if (drillIndex.value < drillData.value.length - 1) {
      // 如可以下钻，则从下钻对应层级取得x轴数据
      const drillX = drillData.value[drillIndex.value]
      const x = (couldDrill.value && drillX) ? drillX : xData
      drillFilters.value.push({
        ...x,
        complexFilter: {
          operator: 'AND',
          items: [{ oper: 'EQ', value: name }],
        },
      })
      drillIndex.value++  // 下钻层级
      setDvData(drillFilters.value)
    }
  }

  // 组件上卷事件
  const dvScrollUp = ({ item, index }) => {
    drillIndex.value = index
    if (index === 0) {
      drillFilters.value = []
    } else {
      drillFilters.value.splice(index)
    }
    setDvData(drillFilters.value)
  }

  // 监听数据变更，如apis配置变化了或数据配置项apiData.source.config中修改了，则需要重新设置数据
  watch(
    [
      () => apiData.value.type,
      () => apiData.value.config.data,
      () => apiData.value.config.x,
      () => apiData.value.config.y,
    ],
    async () => {
      drillIndex.value = 0
      drillFilters.value = []
      await setDvData()
    },
    { deep: true, immediate: true },
  )
  return {
    dvData,
    drillData,
    drillIndex,
    drillFilters,
    couldDrill,
    dvEmit,
    dvScrollUp,
  }
}
