<template>
  <div class="dv-wrapper" v-if="props.data.hided">
    <b-charts
      v-if="render"
      :options="config"
      style="width: 100%; height: 100%"
      ref="chartRef"
    ></b-charts>
    <g-breadcrumb
      v-if="couldDrill"
      v-bind="{ drillData, drillIndex, drillFilters }"
      @scroll-up="dvScrollUp"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { getEventParamsSexact, useEventBus } from '@/hooks/schema/useEventBus'
import { useChartThemeColor } from '@/theme'
import { useChartMain } from '@/hooks/useCharts'
import { usePolling } from '@/hooks/schema/usePolling'
import { debounce } from '@/utils/util'
import { useScriptAction } from '@/hooks/schema/useScriptAction'

defineOptions({
  name: 'VBasicRing',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const {
  dvData,
  apiData,
  dvEmit,
  dvScrollUp,
  drillData,
  drillIndex,
  drillFilters,
  couldDrill,
  buildParams,
  setDvData,
} = useDataCenter(props.data)

const { config, events, chartRef, render, refreshChart } = useChartMain(props.data)

const { getThemeColors, pageConfig } = useChartThemeColor()

const themeColors = computed(() => getThemeColors(props.data.attr.chartThemeColor))

const chartData = computed(() => ({
  xData: dvData.value.xData ?? [],
  yData: dvData.value.yData ?? [],
}))

const getSeries = yData => {
  const { global } = config.value
  const { xData } = chartData.value
  // 根据返回数据进行遍历拼接
  return yData.map((item, index) => {
    const sData = []
    for (let i = 0; i < xData.length; i++) {
      sData.push({ name: xData[i], value: item.data[i] })
    }
    const cfg = {
      type: 'pie',
      name: item.name ?? `系列${index + 1}`,
      label: global.label,
      emphasis: { label: global.label },
      itemStyle: global.itemStyle,
      center: global.center,
      radius: global.radius,
      roseType: global.roseType ? 'area' : false,
      data: sData,
    }
    return cfg
  })
}

const updateSeries = debounce(() => {
  const { yData } = chartData.value
  config.value.series = getSeries(yData)
}, 200)

// 初始化图表
function initCharts() {
  render.value = false
  const { yData } = chartData.value
  config.value.series = getSeries(yData)
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

const onClick = params => {
  dvEmit('click', params)
}
// 注册点击事件
onMounted(() => {
  // 如果click事件存在，则绑定事件
  if (events.value.click) {
    chartRef.value && chartRef.value.getInstance().on('click', onClick)
  }
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
