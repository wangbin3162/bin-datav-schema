<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
    <g-breadcrumb v-if="couldDrill" v-bind="{ drillData, drillIndex, drillFilters }" @scroll-up="dvScrollUp" />
  </div>
</template>

<script>
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { getAutoValue, getLimitValue, valueFormater } from '@/utils/echarts-utils'
import dayjs from 'dayjs'
import { defaultColors } from '@/config/colors'

export default {
  name: 'VBasicArea',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData, apiData, dvEmit, dvScrollUp, drillData, drillIndex, drillFilters, couldDrill } = useDataCenter(
      props.data,
    )
    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)
    // event属性
    const events = computed(() => props.data.events)

    const chartRef = ref(null)

    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))

    const chartData = computed(() => ({
      xData: dvData.value.xData ?? [],
      yData: dvData.value.yData ?? [],
    }))

    const options = computed(() => {
      const { global, xAxis, yAxis, tooltip, legend } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      const pointerLineStyle = {
        type:
          tooltip.pointer.line.type === 'dashed'
            ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
            : tooltip.pointer.line.type,
        width: tooltip.pointer.line.width,
        color: tooltip.pointer.line.color,
      }
      const { xData } = chartData.value

      return {
        textStyle: { fontFamily: global.fontFamily },
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
          name: xAxis.title.show ? xAxis.title.name : '',
          nameLocation: xAxis.title.location,
          nameRotate: xAxis.title.display.rotate,
          nameGap: xAxis.title.display.offset,
          nameTextStyle: { ...xAxis.title.textStyle },
          boundaryGap: xAxis.boundaryGap,
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
            formatter: val => {
              if (xAxis.type === 'time') {
                return dayjs(val).format(xAxis.axisLabel.timeFormat)
              }
              return val
            },
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
          data: xData,
        },
        yAxis: {
          show: yAxis.show,
          type: 'value',
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
            formatter: val => {
              return valueFormater(val, yAxis.axisLabel.valueFormat)
            },
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
          trigger: tooltip.pointer.show ? 'axis' : 'item',
          axisPointer: {
            type: tooltip.pointer.show ? 'cross' : 'none',
            label: { show: false },
            lineStyle: pointerLineStyle,
            crossStyle: pointerLineStyle,
          },
          borderWidth: 0,
        },
        series: getSeries(),
        color: defaultColors,
      }
    })

    const getSeries = () => {
      const { global, label, series } = config.value
      const { yData } = chartData.value
      // 根据返回数据进行遍历拼接
      return yData.map((item, index) => {
        return {
          type: 'line',
          name: item.name ?? `系列${index + 1}`,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            offset: [label.offsetX, label.offsetY],
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: series[index].areaStyle.from },
                { offset: 1, color: series[index].areaStyle.to },
              ],
            },
            opacity: series[index].areaStyle.opacity,
          },
          smooth: global.smooth,
          lineStyle: { ...series[index].lineStyle },
          itemStyle: { color: series[index].lineStyle.color },
          data: item.data,
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
