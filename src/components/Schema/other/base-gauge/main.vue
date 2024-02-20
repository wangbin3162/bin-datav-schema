<template>
  <div class="dv-wrapper">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { getEventParamsSexact, useEventBus } from '@/hooks/schema/useEventBus'
import { usePolling } from '@/hooks/schema/usePolling'
import { useChartThemeColor } from '@/theme'
import { useChartMain } from '@/hooks/useCharts'
import { useScriptAction } from '@/hooks/schema/useScriptAction'

defineOptions({
  name: 'VBasicGauge',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { dvData, apiData, buildParams, setDvData } = useDataCenter(props.data)
const { config, chartRef, refreshChart } = useChartMain(props.data)

const { getThemeColors } = useChartThemeColor()

const themeColors = computed(() => getThemeColors(props.data.attr.chartThemeColor))

const chartData = computed(() => ({
  list: dvData.value.list ?? [],
}))

const options = computed(() => {
  const {
    global,
    detail,
    axisLine,
    progress,
    splitLine,
    axisTick,
    axisLabel,
    pointer,
    anchor,
    itemStyle,
    title,
    tooltip,
  } = config.value
  return {
    color: themeColors.value,
    tooltip: tooltip,
    series: [
      {
        zlevel: 0,
        z: 2,
        name: 'Indicator',
        type: 'gauge',
        ...global,
        data: getSeries(),
        detail: detail,
        axisLine: axisLine,
        progress: progress,
        splitLine: splitLine,
        axisTick: axisTick,
        axisLabel: axisLabel,
        pointer: pointer,
        anchor: anchor,
        itemStyle: itemStyle,
        title: title,
      },
    ],
  }
})

const getSeries = () => {
  const { title, detail } = config.value
  return [
    {
      ...chartData.value.list[0],
      title: {
        offsetCenter: [title.offsetCenter[0], title.offsetCenter[1]],
      },
      detail: {
        offsetCenter: [title.offsetCenter[0], detail.offsetCenter[1]],
        formatter: function (value) {
          return value + detail.unit
        },
      },
    },
  ]
}

// 设置seriesCount
watch(
  () => dvData.value,
  val => {
    apiData.value.config.seriesCount = val.list ? val.list.length : 0
    refreshChart()
  },
)

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
