<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <div :id="idname" style="width: 100%; height: 100%" />
  </div>
</template>

<script>
import { computed, nextTick, ref, watch, onMounted } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'
import * as echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud'
import { uuid } from '@/utils/util'
import { defaultColors } from '@/config/colors'

export default {
  name: 'VBasicWordCloud',
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

    const chartData = computed(() => ({
      list: dvData.value.list ?? [],
    }))

    const idname = ref('cloud_' + uuid())

    const chartRef = ref(null)

    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))

    const options = computed(() => {
      const { tooltip } = config.value
      return {
        tooltip,
        series: getSeries(),
      }
    })

    // 词云图实现
    const draw_word_cloud_view = () => {
      if (chartRef.value) {
        chartRef.value.dispose()
      }
      chartRef.value = document.getElementById(idname.value) && echarts.init(document.getElementById(idname.value))
    }
    const init_view_data = () => {
      // prop.value.series[0].data = filterList(list.value)
      chartRef.value.setOption(options.value)
      chartRef.value.resize()
    }

    const getSeries = () => {
      const { series } = config.value
      return {
        type: 'wordCloud',
        sizeRange: series[0].sizeRange, //字体大小范围
        rotationRange: series[0].rotationRange, //文字旋转范围
        rotationStep: series[0].rotationStep, //随机旋转步长
        gridSize: series[0].gridSize, //文本之间的距离
        shape: series[0].shape, //绘制词云的形状  circle  圆形 cardioid 心形 diamond  菱形 正方形 triangle-forward, triangle  三角形  pentagon 五边形 star 星形
        drawOutOfBound: series[0].drawOutOfBound, //是否允许词云图在外界渲染
        grid: {
          left: series[0].grid.left,
          top: series[0].grid.top,
        },
        width: series[0].width,
        height: series[0].height,
        textStyle: {
          color: series[0].textStyle.color,
          emphasis: {
            // 字高亮时显示的效果
            textStyle: {
              shadowBlur: series[0].textStyle.emphasis.textStyle.shadowBlur, // 阴影距离
              shadowColor: series[0].textStyle.emphasis.textStyle.shadowColor, // 阴影颜色
            },
          },
        },
        data: filterList(chartData.value.list),
      }
    }

    function filterList(list) {
      return list.map((item, index) => {
        return {
          textStyle: {
            color: index < defaultColors.length ? defaultColors[index] : getColor(),
          },
          name: item.name,
          value: item.value,
        }
      })
    }

    function getColor() {
      return (
        'rgb(' +
        [Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255)].join(',') +
        ')'
      )
    }

    function initData() {
      document.getElementById(idname.value)
      draw_word_cloud_view()
      init_view_data()
    }

    // 设置seriesCount
    watch([() => dvData.value, () => attr.value.w, () => attr.value.h], val => {
      apiData.value.config.seriesCount = val.list ? val.list.length : 0
      nextTick(() => {
        initData()
      })
    })

    // 设置项改变后重新加载词云图
    watch(
      () => props.data.config,
      newVal => {
        chartRef.value.resize()
        chartRef.value.setOption({
          tooltip: newVal.tooltip,
          series: getSeries(),
        })
      },
      { deep: true },
    )

    onMounted(() => {
      initData()
    })

    return {
      attr,
      config,
      wrapperStyle,
      idname,
      options,
      chartRef,
    }
  },
}
</script>
