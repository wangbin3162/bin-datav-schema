<template>
  <div class="dv-wrapper">
    <b-charts
      v-if="render"
      :options="config"
      style="width: 100%; height: 100%"
      ref="chartRef"
    ></b-charts>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { getEventParamsSexact, useEventBus } from '@/hooks/schema/useEventBus'
import { useChartThemeColor } from '@/theme'
import { useChartMain } from '@/hooks/useCharts'
import { usePolling } from '@/hooks/schema/usePolling'
import { debounce } from '@/utils/util'
import { transform } from 'echarts-stat'
import * as echarts from 'echarts'
import { useScriptAction } from '@/hooks/schema/useScriptAction'

defineOptions({
  name: 'VLineBasicScatter',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const { dvData, apiData, buildParams, setDvData } = useDataCenter(props.data)

const { config, chartRef, render, refreshChart } = useChartMain(props.data)

const { getThemeColors, pageConfig } = useChartThemeColor()

const themeColors = computed(() => getThemeColors(props.data.attr.chartThemeColor))

const chartData = computed(() => ({
  list: dvData.value.list ?? [
    [1, 4862.4],
    [2, 5294.7],
    [3, 5934.5],
    [4, 7171.0],
    [5, 8964.4],
    [6, 10202.2],
    [7, 11962.5],
    [8, 14928.3],
    [9, 16909.2],
    [10, 18547.9],
    [11, 21617.8],
    [12, 26638.1],
    [13, 34634.4],
    [14, 46759.4],
    [15, 58478.1],
    [16, 67884.6],
    [17, 74462.6],
    [18, 79395.7],
  ],
  name: dvData.value.name ?? '分值',
}))

const getData = () => {
  const { line } = config.value.global
  return [
    {
      source: chartData.value.list,
    },
    {
      transform: {
        type: 'ecStat:regression',
        config: { method: line.lineEcStat },
      },
    },
  ]
}

const getSeries = () => {
  const { global } = config.value
  const { line } = global
  const lineSet = line.show
    ? {
        name: chartData.value.name,
        color: themeColors.value[1],
        type: 'line',
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        smooth: line.smooth,
        label: {
          show: line.label.show,
          position: line.label.position,
          distance: line.label.distance,
          rotate: line.label.rotate,
          offset: line.label.offset,
          color: line.label.color,
          fontWeight: line.label.fontWeight,
          fontSize: line.label.fontSize,
          align: line.label.align,
          verticalAlign: line.label.verticalAlign,
        },
        encode: { label: 2, tooltip: 1 },
      }
    : null
  // 根据返回数据进行遍历拼接
  const scatterSet = {
    type: 'scatter',
    name: chartData.value.name,
    label: global.label,
    emphasis: { label: global.label },
    symbol: global.symbol,
    symbolSize: global.symbolSize,
    symbolRotate: global.symbolRotate,
    symbolOffset: global.symbolOffset,
    datasetIndex: 0,
  }
  // 根据返回数据进行遍历拼接
  return [scatterSet, lineSet]
}

const updateSeries = debounce(() => {
  config.value.series = getSeries()
  config.value.dataset = getData()
  refreshChart()
}, 200)

function initLine() {
  echarts.registerTransform(transform.regression)
}
// 初始化图表
function initCharts() {
  render.value = false
  config.value.series = getSeries()
  config.value.dataset = getData()
  config.value.color = themeColors.value

  render.value = true
  refreshChart()
  // console.log('----------初始化图表配置项', config.value)
}

initCharts()
initLine()

// 更新series
watch(
  () => config.value.global,
  () => {
    updateSeries()
  },
  { deep: true },
)

// 设置seriesCount
watch(
  () => dvData.value,
  () => {
    apiData.value.config.seriesCount = dvData.value.yData ? dvData.value.yData.length : 0
    initCharts()
  },
)

// 主题更换的刷新
watch([() => pageConfig.value.chartThemeColor, () => props.data.attr.chartThemeColor], () => {
  initCharts()
})

// 获取响应事件
const actions = {
  getData(params, onEvent) {
    const p = getEventParamsSexact(params, onEvent.actionParams)
    buildParams(p)
    setDvData()
    // 执行对应脚本
    useScriptAction(props.data, onEvent)
  },
}
// 事件系统增加
useEventBus(props.data, actions)
usePolling(setDvData, apiData.value.config)
</script>
