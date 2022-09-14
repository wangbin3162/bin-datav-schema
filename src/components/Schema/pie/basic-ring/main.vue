<template>
  <div class="dv-wrapper">
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
import { defaultColors } from '@/config/colors'

export default {
  name: 'VBasicRing',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData, apiData, dvEmit, dvScrollUp, drillData, drillIndex, drillFilters, couldDrill } =
      useDataCenter(props.data)
    // config 配置项
    const config = computed(() => props.data.config)
    // event属性
    const events = computed(() => props.data.events)

    const chartRef = ref(null)

    const chartData = computed(() => ({
      xData: dvData.value.xData ?? [],
      yData: dvData.value.yData ?? [],
    }))

    const options = computed(() => {
      const { global, tooltip, legend, color } = config.value
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
        series: getSeries(),
        color,
      }
    })

    const getSeries = () => {
      const { global, label } = config.value
      const { xData, yData } = chartData.value
      // 根据返回数据进行遍历拼接
      return yData.map((item, index) => {
        const sData = []
        for (let i = 0; i < xData.length; i++) {
          sData.push({ name: xData[i], value: item.data[i] })
        }
        return {
          type: 'pie',
          name: item.name ?? `系列${index + 1}`,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            formatter: label.formatter || '{b}',
            alignTo: label.alignTo,
            bleedMargin: label.bleedMargin,
            distanceToLabelLine: label.distanceToLabelLine,
          },
          itemStyle: {
            borderRadius: global.borderRadius,
          },
          center: global.center,
          radius: global.radius,
          roseType: global.roseType ? 'area' : false,
          data: sData,
        }
      })
    }

    const onClick = params => {
      dvEmit('click', params)
    }

    // 设置seriesCount
    watch(
      () => dvData.value,
      val => {
        apiData.value.config.seriesCount = val.yData ? val.yData.length : 0
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
      config,
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
