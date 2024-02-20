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
import { useScriptAction } from '@/hooks/schema/useScriptAction'

defineOptions({
  name: 'VBasicScatter',
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
  list: dvData.value.list ?? [],
}))

const getSeries = () => {
  const { global } = config.value
  const yData = chartData.value.list
  // 根据返回数据进行遍历拼接
  return yData.map((item, index) => {
    const cfg = {
      type: 'scatter',
      name: item.name ?? `系列${index + 1}`,
      label: global.label,
      emphasis: { label: global.label },
      symbol: global.symbol,
      symbolSize: global.symbolSize,
      symbolRotate: global.symbolRotate,
      symbolOffset: global.symbolOffset,
      data: item.list,
    }
    return cfg
  })
}

const updateSeries = debounce(() => {
  config.value.series = getSeries()
}, 200)

// 初始化图表
function initCharts() {
  render.value = false
  config.value.series = getSeries()
  config.value.color = themeColors.value

  render.value = true
  refreshChart()
  // console.log('----------初始化图表配置项', config.value)
}

initCharts()

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
