<template>
  <div class="dv-wrapper">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'

export default {
  name: 'VBasicFunnel',
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
      list: dvData.value.list ?? [],
    }))

    const options = computed(() => {
      const { tooltip, legend } = config.value
      const [legendTop, legendLeft] = legend.position.split('-')
      return {
        legend: {
          show: legend.show,
          top: legendTop,
          left: legendLeft,
          right: legend.right,
          bottom: legend.bottom,
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
          selectedMode: legend.selectedMode,
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
      }
    })

    const getSeries = () => {
      const { global, label, series, labelLine } = config.value
      const { list } = chartData.value
      // 根据返回数据进行遍历拼接
      return series.map((item, index) => {
        const sData = []
        for (let i = 0; i < list.length; i++) {
          sData.push({
            name: list[i].name,
            value: list[i].value,
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
            },
          })
        }
        return {
          type: 'funnel',
          // name: item.name ?? `系列${index + 1}`,
          label: {
            show: label.show,
            position: label.position,
            ...label.textStyle,
            formatter: label.formatter || '{b}',
          },
          labelLine: labelLine,
          minSize: global.minSize, //数据最小值min映射宽度
          maxSize: global.maxSize, //数据最大值映射宽度
          orient: global.orient, //vertical垂直分布/horizontal纵向分布
          sort: global.sort, //ascending从小到大/descending从大到小/none数组顺序
          gap: global.gap, //数据图形间距
          left: global.margin.left,
          top: global.margin.top,
          right: global.margin.right,
          bottom: global.margin.bottom,
          funnelAlign: global.funnelAlign, //水平方向对齐布局类型，默认居中 left/right/center
          data: sData,
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
      config,
      options,
    }
  },
}
</script>
