<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'
import * as echarts from 'echarts'
import china from './assets/china.json'

export default {
  name: 'VBasicMap',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData, apiData } = useDataCenterOther(props.data)

    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)
    const chartRef = ref(null)

    const chartData = computed(() => ({
      xData: dvData.value.xData ?? [],
      yData: dvData.value.yData ?? [],
    }))

    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))

    const options = computed(() => {
      const { tooltip, geo, series, global, label } = config.value

      return {
        tooltip,
        geo: {
          ...geo,
          itemStyle: {
            shadowColor: global.shadowColor,
            shadowOffsetX: global.shadowOffsetX,
            shadowOffsetY: global.shadowOffsetY,
          },
        },
        series: {
          ...series[0],
          itemStyle: {
            borderColor: global.borderColor,
            borderWidth: global.borderWidth,
            borderType: global.borderType,
            areaColor:
              global.areaColor.type === 'gradient'
                ? {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: global.areaColor.from },
                      { offset: 1, color: global.areaColor.to },
                    ],
                  }
                : global.areaColor.value,
          },
          label: {
            show: label.show,
            color: label.color,
            fontSize: label.fontSize,
            fontWeight: label.fontWeight,
            position: label.position,
          },
          emphasis: {
            label: {
              show: label.emphasis.show,
              color: label.emphasis.color,
              fontSize: label.emphasis.fontSize,
              fontWeight: label.emphasis.fontWeight,
              position: label.emphasis.position,
            },
            itemStyle: {
              areaColor: global.itemStyle.areaColor,
              borderColor: global.itemStyle.borderColor,
              borderWidth: global.itemStyle.borderWidth,
              borderType: global.itemStyle.borderType,
            },
          },
          data: [],
        },
      }
    })

    function initData() {
      echarts.registerMap('china', china)
    }

    initData()

    // 设置seriesCount
    watch(
      () => dvData.value,
      val => {
        apiData.value.config.seriesCount = val.yData ? val.yData.length : 0
        nextTick(() => {
          chartRef.value && chartRef.value.refresh()
        })
      },
      { deep: true },
    )

    return {
      chartRef,
      attr,
      config,
      wrapperStyle,
      options,
    }
  },
}
</script>
