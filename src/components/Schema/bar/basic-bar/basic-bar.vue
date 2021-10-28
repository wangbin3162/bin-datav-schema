<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-charts :options="options" style="width:100%;height: 100%;" ref="chartRef"></b-charts>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import useApiStore from '@/hooks/schema/useApiStore'
import { getFieldMap, useDataCenter } from '@/hooks/schema/useDataCenter'
import { groupBy } from 'lodash-es'
import dayjs from 'dayjs'
import { getAutoValue, getLimitValue, valueFormater } from '@/utils/echarts-utils'

export default {
  name: 'VBasicBar',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { apiDataMap } = useApiStore()
    const { dvEmit } = useDataCenter(props.data)
    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)

    const chartRef = ref(null)

    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))
    // dv 数据，跟进apiDataMap中取得 source[]
    const dv_data = computed(() => apiDataMap.value[props.data.id]?.source ?? [])
    // dv 字段 return: {x: 'x', y: 'y'}
    const dv_field = computed(() => getFieldMap(props.data.apis.source.fields))

    // 拉平数据，分别返回{keys,values} 分别为x轴data和y轴data
    const chartData = computed(() => {
      const groups = groupBy(dv_data.value, item => item[dv_field.value.x])
      return {
        keys: Object.keys(groups),
        values: Object.values(groups),
      }
    })

    const options = computed(() => {
      const { global, xAxis, yAxis, tooltip, legend, color } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      const pointerLineStyle = {
        type: tooltip.pointer.line.type === 'dashed'
          ? [tooltip.pointer.line.dashedLength, tooltip.pointer.line.dashedSpace]
          : tooltip.pointer.line.type,
        width: tooltip.pointer.line.width,
        color: tooltip.pointer.line.color,
      }

      return {
        textStyle: { fontFamily: global.fontFamily },
        grid: { ...global.margin },
        legend: {
          show: legend.show,
          top: legendTop,
          left: legendLeft,
          orient: legend.orient,
          textStyle: { ...legend.textStyle },
          icon: legend.symbol.show ? legend.symbol.icon === 'auto' ? null : legend.symbol.icon : 'none',
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
            formatter: (val) => {
              if (xAxis.type === 'time') {
                return dayjs(val).format(xAxis.axisLabel.timeFormat)
              }
              return val
            },
          },
          splitLine: {
            show: xAxis.grid.show,
            lineStyle: {
              type: xAxis.grid.line.type === 'dashed'
                ? [xAxis.grid.line.dashedLength, xAxis.grid.line.dashedSpace]
                : xAxis.grid.line.type,
              width: xAxis.grid.line.width,
              color: xAxis.grid.line.color,
            },
          },
          data: chartData.value.keys,
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
            formatter: (val) => {
              return valueFormater(val, yAxis.axisLabel.valueFormat)
            },
          },
          splitLine: {
            show: yAxis.grid.show,
            lineStyle: {
              type: yAxis.grid.line.type === 'dashed'
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
        color,
      }
    })

    const getSeries = () => {
      const { global, label, series } = config.value
      const { values } = chartData.value
      return series.map((item, idx) => {
        return {
          type: item.type,
          name: item.name,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            offset: [label.offsetX, label.offsetY],
          },
          itemStyle: {
            color: item.color.type === 'gradient'
              ? {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ offset: 0, color: item.color.from }, { offset: 1, color: item.color.to }],
              }
              : item.color.value,
          },
          barWidth: global.barWidth,
          barGap: `${global.innerPadding}%`,
          barCategoryGap: `${global.outerPadding}%`,
          showBackground: global.background.show,
          backgroundStyle: { color: global.background.color },
          data: values.map(v => {
            const obj = v[idx] // {x:'',y:11}
            return {
              value: obj ? obj[dv_field.value.y] : null,
              dataRef: obj ?? {},
            }
          }),
        }
      })
    }

    const onClick = (params) => {
      dvEmit('click', { x: params.name, y: params.value })
    }

    onMounted(() => {
      chartRef.value && chartRef.value.getInstance().on('click', onClick)
    })

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
