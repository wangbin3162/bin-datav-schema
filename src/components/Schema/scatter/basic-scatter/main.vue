<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'
import { getAutoValue, getLimitValue } from '@/utils/echarts-utils'

export default {
  name: 'VBasicScatter',
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
      list: dvData.value.list ?? [],
    }))

    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))

    const options = computed(() => {
      const { global, legend, tooltip, xAxis, yAxis } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      const pointerLineStyle = {
        type:
          tooltip.pointer.line.type === 'dashed'
            ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
            : tooltip.pointer.line.type,
        width: tooltip.pointer.line.width,
        color: tooltip.pointer.line.color,
      }
      return {
        grid: { ...global.margin },
        legend: {
          show: legend.show,
          top: legendTop,
          left: legendLeft,
          orient: legend.orient,
          textStyle: { ...legend.textStyle },
          icon: legend.symbol.show ? (legend.symbol.icon === 'auto' ? null : legend.symbol.icon) : 'none',
          itemWidth: legend.symbol.width,
          itemHeight: legend.symbol.height,
          itemGap: legend.symbol.gap,
        },
        xAxis: {
          show: xAxis.show,
          type: xAxis.type,
          scale: xAxis.scale,
          name: xAxis.title.show ? xAxis.title.name : '',
          nameLocation: xAxis.title.location,
          nameRotate: xAxis.title.display.rotate,
          nameGap: xAxis.title.display.offset,
          nameTextStyle: { ...xAxis.title.textStyle },
          // boundaryGap: [`${xAxis.boundaryGap}%`, `${xAxis.boundaryGap}%`],
          axisLine: {
            show: xAxis.axisLine.show,
            lineStyle: {
              type: xAxis.axisLine.type,
              width: xAxis.axisLine.width,
              color: xAxis.axisLine.color,
            },
          },
          axisTick: {
            show: xAxis.axisTick.show,
            lineStyle: {
              type: xAxis.axisTick.type,
              width: xAxis.axisTick.width,
              color: xAxis.axisTick.color,
            },
            alignWithLabel: true,
          },
          axisLabel: {
            show: xAxis.axisLabel.show,
            interval: getAutoValue(xAxis.axisLabel.interval),
            rotate: xAxis.axisLabel.display.rotate,
            margin: xAxis.axisLabel.display.margin,
            align: xAxis.axisLabel.align,
            ...xAxis.axisLabel.textStyle,
            formatter: `{value} ${xAxis.axisLabel.formatter}`,
          },
          splitLine: {
            show: xAxis.grid.show,
            lineStyle: {
              type:
                xAxis.grid.line.type === 'dashed'
                  ? [xAxis.grid.line.dashedLength, xAxis.grid.line.dashedSpace]
                  : xAxis.grid.line.type,
              width: xAxis.grid.line.width,
              color: xAxis.grid.line.color,
            },
          },
        },
        yAxis: {
          show: yAxis.show,
          type: yAxis.type,
          scale: yAxis.scale,
          name: yAxis.title.show ? yAxis.title.name : '',
          nameLocation: yAxis.title.location,
          nameRotate: yAxis.title.display.rotate,
          nameGap: yAxis.title.display.offset,
          nameTextStyle: { ...yAxis.title.textStyle },
          boundaryGap: [`${yAxis.axisLabel.boundaryGap}%`, `${yAxis.axisLabel.boundaryGap}%`],
          axisLine: {
            show: yAxis.axisLine.show,
            lineStyle: {
              type: yAxis.axisLine.type,
              width: yAxis.axisLine.width,
              color: yAxis.axisLine.color,
            },
          },
          axisTick: {
            show: yAxis.axisTick.show,
            lineStyle: {
              type: yAxis.axisTick.type,
              width: yAxis.axisTick.width,
              color: yAxis.axisTick.color,
            },
            alignWithLabel: true,
          },
          axisLabel: {
            show: yAxis.axisLabel.show,
            rotate: yAxis.axisLabel.display.rotate,
            margin: yAxis.axisLabel.display.margin,
            align: yAxis.axisLabel.align,
            ...yAxis.axisLabel.textStyle,
            formatter: `{value} ${yAxis.axisLabel.formatter}`,
          },
          splitLine: {
            show: yAxis.grid.show,
            lineStyle: {
              type:
                yAxis.grid.line.type === 'dashed'
                  ? [yAxis.grid.line.dashedLength, yAxis.grid.line.dashedSpace]
                  : yAxis.grid.line.type,
              width: yAxis.grid.line.width,
              color: yAxis.grid.line.color,
            },
          },
          min: getLimitValue(yAxis.extent.min),
          max: getLimitValue(yAxis.extent.max),
          splitNumber: yAxis.splitNumber > 0 ? yAxis.splitNumber : null,
        },
        tooltip: {
          show: tooltip.show,
          textStyle: { ...tooltip.textStyle },
          padding: [tooltip.background.padding.v, tooltip.background.padding.h],
          backgroundColor: tooltip.background.color,
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { show: false },
            lineStyle: pointerLineStyle,
            crossStyle: pointerLineStyle,
          },
          borderWidth: 1,
        },
        series: getSeries(),
      }
    })

    const getSeries = () => {
      const { global, label, series } = config.value
      // const { list } = props.config.data.static
      // 根据返回数据进行遍历拼接

      return chartData.value.list.map((item, i) => {
        return {
          name: item.name,
          type: 'scatter',
          symbol: global.symbol,
          symbolSize: global.symbolSize,
          symbolRotate: global.symbolRotate,
          symbolOffset: global.symbolOffset,
          datasetIndex: 0,
          label: {
            show: label.show,
            position: label.position,
            distance: label.distance,
            rotate: label.rotate,
            offset: label.offset,
            color: label.color,
            fontWeight: label.fontWeight,
            fontSize: label.fontSize,
            align: label.align,
            verticalAlign: label.verticalAlign,
          },
          itemStyle: {
            color:
              series[i].color.type === 'gradient'
                ? {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: series[i].color.from },
                      { offset: 1, color: series[i].color.to },
                    ],
                  }
                : series[i].color.value,
            opacity: global.itemStyle.opacity,
          },
          data: item.list,
        }
      })
    }

    // 设置seriesCount
    watch(
      () => dvData.value,
      val => {
        apiData.value.config.seriesCount = val.list ? val.list.length : 0
        nextTick(() => {
          chartRef.value && chartRef.value.refresh()
        })
      },
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
