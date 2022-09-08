<template>
  <div class="dv-wrapper">
    <b-charts :options="options" style="width: 100%; height: 100%" ref="chartRef"></b-charts>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'

export default {
  name: 'VBasicGauge',
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
      const {
        global,
        detail,
        axisLine,
        progress,
        splitLine,
        axisTick,
        axisLabel,
        pointer,
        anchor,
        itemStyle,
        title,
        tooltip,
      } = config.value
      return {
        tooltip: tooltip,
        series: [
          {
            name: 'Indicator',
            type: 'gauge',
            ...global,
            data: getSeries(),
            detail: detail,
            axisLine: axisLine,
            progress: progress,
            splitLine: splitLine,
            axisTick: axisTick,
            axisLabel: axisLabel,
            pointer: pointer,
            anchor: anchor,
            itemStyle: itemStyle,
            title: title,
          },
        ],
      }
    })

    const getSeries = () => {
      const { series, title, detail } = config.value
      return [
        {
          ...chartData.value.list[0],
          title: {
            offsetCenter: [title.offsetCenter[0], title.offsetCenter[1]],
          },
          detail: {
            offsetCenter: [title.offsetCenter[0], detail.offsetCenter[1]],
            formatter: function (value) {
              return value + detail.unit
            },
          },
          itemStyle: {
            color:
              series[0].color.type === 'gradient'
                ? {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 0,
                    colorStops: [
                      { offset: 0, color: series[0].color.from },
                      { offset: 1, color: series[0].color.to },
                    ],
                  }
                : series[0].color.value,
          },
        },
      ]

      // return list.value.map((item, index) => {
      //   return {
      //     value: item.value,
      //     name: item.name,
      //     title: {
      //       offsetCenter: [
      //         `${(360 / length) * (index - (length - 1) * 0.5)}+'%'`,
      //         title.offsetCenter[1],
      //       ],
      //     },
      //     detail: {
      //       offsetCenter: [
      //         `${(360 / length) * (index - (length - 1) * 0.5)}+'%'`,
      //         detail.offsetCenter[1],
      //       ],
      //       formatter: function (value) {
      //         return value + detail.unit
      //       },
      //     },
      //     itemStyle: {
      //       color:
      //         series[index].color.type === 'gradient'
      //           ? {
      //               type: 'linear',
      //               x: 0,
      //               y: 0,
      //               x2: 1,
      //               y2: 0,
      //               colorStops: [
      //                 { offset: 0, color: series[index].color.from },
      //                 { offset: 1, color: series[index].color.to },
      //               ],
      //             }
      //           : series[index].color.value,
      //     },
      //   }
      // })
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
