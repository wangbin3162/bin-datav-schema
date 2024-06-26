import { ref, computed, onMounted, watch } from 'vue'
import { deepMerge } from '@/utils/util'
import * as echarts from 'echarts/core'
import { requireJson } from '@/api/json-loader.api'
import { getPublicPath } from '@/utils/env'

export const insideList = ref([])

export function useMap(props) {
  const regionName = ref(
    props.config.cityValue !== '' ? props.config.cityValue : props.config.province,
  )
  const bChartsRef = ref(null)
  const options = ref(
    deepMerge(
      {
        tooltip: {
          show: false,
          trigger: 'item',
        },
        geo: {
          map: regionName.value,
          silent: false, // 控制是否可以点击与选中地图区域，true为不允许
          zoom: 1.2,
          roam: false, // 是否允许缩放
          nameProperty: 'name',
          label: {
            show: true,
            color: '#333',
            fontSize: 10,
          },
          itemStyle: { areaColor: '#bddffd', borderColor: '#0E95F1', borderWidth: 1 },
          emphasis: {
            itemStyle: { areaColor: '#FFD181', borderColor: '#a3d0f8', borderWidth: 1 },
            label: { show: true },
          },
          select: {
            itemStyle: { areaColor: '#FFD181', borderColor: '#a3d0f8', borderWidth: 1 },
            label: { show: true },
          },
        },
      },
      {
        geo: props.config.geo,
      },
    ),
  )
  const regionStack = ref([])
  const showBackBtn = computed(() => {
    return regionStack.value.length > 0
  })
  // useEventBus(props)
  // const { emitDefault, emitClickRegion } = useEvent(props)

  onMounted(async () => {
    const chart = bChartsRef.value.getInstance()
    initMap(chart, regionName.value)
    // emitDefault(regionName.value)
  })

  watch(
    () => props.config.geo,
    newVal => {
      // 这里响应设置项的变动，使用setOption手动更新数据
      options.value = deepMerge(options.value, {
        geo: newVal,
      })
      const chart = bChartsRef.value.getInstance()
      chart.setOption(options.value)
    },
    {
      deep: true,
    },
  )

  // 用于配置时选择省份后重新渲染
  watch(
    () => props.config.province,
    newVal => {
      const chart = bChartsRef.value.getInstance()
      initMap(chart, newVal)
    },
  )

  watch(
    () => props.config.cityValue,
    newVal => {
      const chart = bChartsRef.value.getInstance()
      if (newVal) {
        initMap(chart, newVal)
      } else {
        initMap(chart, props.config.province)
      }
    },
  )

  /**
   * 初始化地图
   * @param {*} chart
   * @param {*} regionName
   */
  async function initMap(chart, regionName) {
    const geoJson = await getGeoJson(regionName)
    await getList()
    renderMap(regionName, geoJson, chart)
  }

  // 获取城市列表
  async function getList() {
    const listValue = await getGeoJson(props.config.province)
    if (listValue.features[0].properties.level === 'city') {
      insideList.value = listValue.features.map(item => ({
        label: item.properties.name,
        value: item.properties.name,
      }))
    } else {
      insideList.value = []
    }
  }

  /**
   * 获取GeoJson数据
   * @param {*} regionName
   */
  async function getGeoJson(regionName) {
    bChartsRef.value.showLoading({
      color: '#1089ff',
      maskColor: 'rgba(255, 255, 255, 0)',
    })
    const path = getPublicPath(`/data/map/province/${props.config.province}/${regionName}.json`)
    // console.log(path)
    const res = await requireJson(path)
    bChartsRef.value.hideLoading()
    return res
  }

  /**
   * 可用于下钻的地图渲染函数
   * @param {*} name
   * @param {*} geoJson
   * @param {*} chart
   */
  function renderMap(name, geoJson, chart) {
    // 注册地图
    echarts.registerMap(name, geoJson)
    options.value.geo.map = name
    // 街道层级只选中，不进行下钻
    if (geoJson.features[0].properties.level === 'district') {
      options.value.geo.selectedMode = 'single'
    } else {
      options.value.geo.selectedMode = false
    }
    chart.setOption(options.value)
    // 清理上次绑定的click事件
    chart.off('click')
    // // 绑定本次的click事件
    chart.on('click', async params => {
      console.log(params)
      // TODO: 需要通过事件总线发送事件
      // emitClickRegion(params.name)
      // 市级才允许点击下钻
      if (geoJson.features[0].properties.level === 'city') {
        // 不重复则入栈
        if (!regionStack.value.includes(name)) {
          regionStack.value.push(name) // 入栈当前地图名称，用于下钻返回
        }
        // 点击geo组件才进行下钻渲染
        if (params.componentType === 'geo') {
          const regionGeoJson = await getGeoJson(params.name)
          renderMap(params.name, regionGeoJson, chart)
        }
      }
      if (geoJson.features[0].properties.level === 'district') {
        chart.dispatchAction({
          type: 'geoSelect',
          name: params.name,
        })
      }
    })
  }

  /**
   * 返回按钮回调
   */
  function handleBackBtnClick() {
    // TODO: 需要通过事件总线发送事件
    const regionName = regionStack.value.pop()
    const chart = bChartsRef.value.getInstance()
    initMap(chart, regionName)
    // emitClickRegion(regionName)
  }

  return {
    bChartsRef,
    options,
    showBackBtn,
    handleBackBtnClick,
  }
}
