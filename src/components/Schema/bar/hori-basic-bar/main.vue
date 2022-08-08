<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
    <g-breadcrumb v-if="couldDrill" v-bind="{ drillData, drillIndex, drillFilters }" @scroll-up="dvScrollUp" />
  </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import dayjs from 'dayjs'
import { getAutoValue, getLimitValue, valueFormater } from '@/utils/echarts-utils'
import { defaultColors } from '@/config/colors'

export default {
  name: 'VHorizontalBar',
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
    const wrapperStyle = computed(() => ({
      width: `${attr.value.w}px`,
      height: `${attr.value.h}px`,
    }))

    const chartData = computed(() => ({
      xData: dvData.value.xData ?? [],
      yData: dvData.value.yData ?? [],
    }))

    const options = computed(() => {
      const { global, xAxis, yAxis, tooltip, legend, colors } = config.value
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
        yAxis: {
          show: yAxis.show,
          type: yAxis.type,
          name: yAxis.title.show ? yAxis.title.name : '',
          nameLocation: yAxis.title.location,
          nameRotate: yAxis.title.display.rotate,
          nameGap: yAxis.title.display.offset,
          nameTextStyle: { ...yAxis.title.textStyle },
          boundaryGap: yAxis.boundaryGap,
          inverse: true,
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
            interval: getAutoValue(yAxis.axisLabel.interval),
            rotate: yAxis.axisLabel.display.rotate,
            margin: yAxis.axisLabel.display.margin,
            align: yAxis.axisLabel.align,
            ...yAxis.axisLabel.textStyle,
            formatter: val => {
              if (yAxis.type === 'time') {
                return dayjs(val).format(yAxis.axisLabel.timeFormat)
              }
              return val
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
          data: xData,
        },
        xAxis: {
          show: xAxis.show,
          type: 'value',
          name: xAxis.title.show ? xAxis.title.name : '',
          nameLocation: xAxis.title.location,
          nameRotate: xAxis.title.display.rotate,
          nameGap: xAxis.title.display.offset,
          nameTextStyle: { ...xAxis.title.textStyle },
          boundaryGap: [`${xAxis.axisLabel.boundaryGap}%`, `${xAxis.axisLabel.boundaryGap}%`],
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
            rotate: xAxis.axisLabel.display.rotate,
            margin: xAxis.axisLabel.display.margin,
            align: xAxis.axisLabel.align,
            ...xAxis.axisLabel.textStyle,
            formatter: val => {
              return valueFormater(val, xAxis.axisLabel.valueFormat)
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
          min: getLimitValue(xAxis.extent.min),
          max: getLimitValue(xAxis.extent.max),
          splitNumber: xAxis.splitNumber > 0 ? xAxis.splitNumber : null,
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
          type: 'bar',
          name: item.name ?? `系列${index + 1}`,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            offset: [label.offsetX, label.offsetY],
          },
          itemStyle: {
            color:
              series[index].color.type === 'gradient'
                ? {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: series[index].color.from },
                      { offset: 1, color: series[index].color.to },
                    ],
                  }
                : series[index].color.value,
            borderRadius: global.borderRadius,
          },
          barWidth: global.barWidth,
          barGap: `${global.innerPadding}%`,
          barCategoryGap: `${global.outerPadding}%`,
          showBackground: global.background.show,
          backgroundStyle: { color: global.background.color },
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
