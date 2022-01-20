<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef" />
    <g-breadcrumb
      v-if="couldDrill"
      v-bind="{ drillData, drillIndex, drillFilters }"
      @scroll-up="dvScrollUp"
    />
  </div>
</template>

<script>
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { computed, nextTick, onMounted, ref, watch } from 'vue'

export default {
  name: 'VBasicRadar',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData, dvEmit, dvScrollUp, drillData, drillIndex, drillFilters, couldDrill } =
      useDataCenter(props.data)
    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)
    // event属性
    const events = computed(() => props.data.events)

    const chartRef = ref(null)

    // 容器style
    const wrapperStyle = computed(() => ({
      width: `${attr.value.w}px`,
      height: `${attr.value.h}px`,
    }))

    const chartData = computed(() => ({
      xData: dvData.value.xData ?? [],
      yData: dvData.value.yData ?? [],
      indicator: dvData.value.indicator ?? [],
    }))

    const options = computed(() => {
      const { global, tooltip, legend } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      return {
        textStyle: { fontFamily: global.fontFamily },
        legend: {
          show: legend.show,
          top: legendTop,
          left: legendLeft,
          orient: legend.orient,
          textStyle: { ...legend.textStyle },
          icon: legend.symbol.show
            ? legend.symbol.icon === 'auto'
              ? null
              : legend.symbol.icon
            : 'none',
          itemWidth: legend.symbol.width,
          itemHeight: legend.symbol.height,
          itemGap: legend.symbol.gap,
        },
        tooltip: {
          show: tooltip.show,
          textStyle: { ...tooltip.textStyle },
          padding: [tooltip.background.padding.v, tooltip.background.padding.h],
          backgroundColor: tooltip.background.color,
          trigger: 'item',
          borderWidth: 0,
        },
        radar: {
          indicator: chartData.value.indicator,
          startAngle: global.startAngle,
          shape: global.shape,
          splitNumber: global.splitNumber,
          center: global.center,
          radius: global.radius,
          splitLine: {
            show: global.splitLine.show,
            lineStyle: {
              color: global.splitLine.lineStyle.color,
            },
          },
          splitArea: {
            show: global.splitArea.show,
            areaStyle: { ...global.splitArea.areaStyle },
          },
          axisLine: {
            show: global.axisLine.show,
            lineStyle: {
              color: global.axisLine.lineStyle.color,
            },
          },
          axisName: {
            show: global.axisName.show,
            color: global.axisName.color,
          },
        },
        series: getSeries(),
        color: config.value.color,
      }
    })

    const getSeries = () => {
      const { label, global } = config.value
      const { yData } = chartData.value
      // 根据返回数据进行遍历拼接
      return yData.map((item, index) => {
        return {
          type: 'radar',
          name: item.name ?? `系列${index + 1}`,
          symbolSize: global.symbolSize,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            formatter: label.formatter || '{c}',
          },
          areaStyle: {
            opacity: global.areaStyle.opacity,
          },
          data: item.data,
        }
      })
    }

    const onClick = (params) => {
      dvEmit('click', params)
    }

    // 设置seriesCount
    watch(
      () => dvData.value,
      (val) => {
        props.data.apiData.config.seriesCount = val.yData ? val.yData.length : 0
        nextTick(() => {
          chartRef.value && chartRef.value.refresh()
        })
      },
    )
    // 注册点击事件
    onMounted(() => {
      // 如果click事件存在，则绑定事件
      if (events.value.click) {
        chartRef.value && chartRef.value.getInstance().on('click', onClick)
      }
    })

    return {
      chartRef,
      attr,
      config,
      wrapperStyle,
      options,
      drillData,
      drillIndex,
      drillFilters,
      couldDrill,
      dvScrollUp,
    }
  },
}
</script>
