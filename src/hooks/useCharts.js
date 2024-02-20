import { computed, nextTick, ref } from 'vue'

//图表hook，需要传入props.data 配置项
export function useChartMain(data) {
  // config 配置项
  const config = computed(() => data.config)
  // event属性
  const events = computed(() => data.events)

  const chartRef = ref(null)
  const render = ref(false)

  // 刷新图表
  function refreshChart() {
    nextTick(() => {
      chartRef.value && chartRef.value.refresh()
    })
  }

  return {
    config,
    events,
    chartRef,
    render,
    refreshChart,
  }
}
