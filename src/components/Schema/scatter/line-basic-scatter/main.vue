<template>
  <div class="dv-wrapper">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'
import { getAutoValue, getLimitValue } from '@/utils/echarts-utils'
import { transform } from 'echarts-stat'
import * as echarts from 'echarts'

export default {
  name: 'VLineBasicScatter',
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
    const chartRef = ref(null)

    const chartData = computed(() => ({
      list: dvData.value.list ?? [
        [1, 4862.4],
        [2, 5294.7],
        [3, 5934.5],
        [4, 7171.0],
        [5, 8964.4],
        [6, 10202.2],
        [7, 11962.5],
        [8, 14928.3],
        [9, 16909.2],
        [10, 18547.9],
        [11, 21617.8],
        [12, 26638.1],
        [13, 34634.4],
        [14, 46759.4],
        [15, 58478.1],
        [16, 67884.6],
        [17, 74462.6],
        [18, 79395.7],
      ],
      name: dvData.value.name ?? '分值',
    }))

    function initLine() {
      echarts.registerTransform(transform.regression)
    }

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
          icon: legend.symbol.show
            ? legend.symbol.icon === 'auto'
              ? null
              : legend.symbol.icon
            : 'none',
          itemWidth: legend.symbol.width,
          itemHeight: legend.symbol.height,
          itemGap: legend.symbol.gap,
          data: [chartData.value.name],
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
        dataset: getData(),
      }
    })

    const getSeries = () => {
      const { global, label, line } = config.value
      const lineSet = line.show
        ? {
            name: chartData.value.name,
            color: '#91cc75',
            type: 'line',
            datasetIndex: 1,
            symbolSize: 0.1,
            symbol: 'circle',
            smooth: line.smooth,
            label: {
              show: line.label.show,
              position: line.label.position,
              distance: line.label.distance,
              rotate: line.label.rotate,
              offset: line.label.offset,
              color: line.label.color,
              fontWeight: line.label.fontWeight,
              fontSize: line.label.fontSize,
              align: line.label.align,
              verticalAlign: line.label.verticalAlign,
            },
            encode: { label: 2, tooltip: 1 },
          }
        : null
      const scatterSet = {
        name: chartData.value.name,
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
          color: global.itemStyle.color,
          opacity: global.itemStyle.opacity,
        },
      }
      // 根据返回数据进行遍历拼接
      return [scatterSet, lineSet]
    }

    const getData = () => {
      const { line } = config.value
      return [
        {
          source: chartData.value.list,
        },
        {
          transform: {
            type: 'ecStat:regression',
            config: { method: line.lineEcStat },
          },
        },
      ]
    }

    initLine()

    // 设置seriesCount
    watch(
      [() => dvData.value, () => config.value.line],
      val => {
        apiData.value.config.seriesCount = val.list ? val.list.length : 0
        nextTick(() => {
          initLine()
          chartRef.value && chartRef.value.refresh()
        })
      },
      {
        deep: true,
      },
    )

    return {
      chartRef,
      config,
      options,
    }
  },
}
</script>
