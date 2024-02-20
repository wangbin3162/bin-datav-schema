<template>
  <div>
    <div class="title" flex="main:justify cross:center">
      <div title="预览图表最多显示7条">预览图表</div>
      <div class="tab-box">
        <b-radio-group v-model="type" type="capsule" size="small">
          <b-radio label="bar">柱状图</b-radio>
          <b-radio label="line">折线图</b-radio>
        </b-radio-group>
      </div>
    </div>
    <div class="chart-box" v-if="render">
      <b-charts :options="options" height="150px" ref="chartRef"></b-charts>
    </div>
  </div>
</template>

<script setup>
import { globalThemeJson } from '@/theme'
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { deepCopy, deepMerge, getRandomInt } from '@/utils/util'

const props = defineProps({
  colors: {
    type: Array,
    default: () => [],
  },
  id: {
    type: String,
    default: '',
  },
})

const render = ref(false)
const chartRef = ref(null)
const type = ref('bar') // bar line

const options = ref(globalThemeJson)
const chartLength = computed(() => (props.colors.length >= 7 ? 7 : 6))

// 获取随机数组
function getRandomData() {
  const value = []
  for (let index = 0; index < chartLength.value; index++) {
    value.push(getRandomInt(0, 800))
  }
  return value
}

function initCharts() {
  render.value = false
  const opts = deepMerge(deepCopy(globalThemeJson), {
    grid: {
      top: 35,
      bottom: 20,
    },
    legend: {
      data: [],
    },
    tooltip: {
      show: true,
      trigger: 'item',
    },
    xAxis: {
      axisPointer: {
        show: true,
        type: 'shadow',
        label: { show: false },
        triggerTooltip: false,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
      },
      data: [],
    },
    series: [],
    color: props.colors,
  })
  for (let index = 0; index < chartLength.value; index++) {
    const xData = `data${index + 1}`
    // x轴的数据
    opts.legend.data.push(xData)
    opts.xAxis.data.push(xData)
    const data = {
      type: type.value,
      name: xData,
      data: getRandomData(),
    }
    if (type.value === 'line') {
      data.smooth = true
      data.areaStyle = {}
    }
    // 拼接y轴数据值
    opts.series.push(data)
  }

  options.value = opts

  render.value = true
  nextTick(() => {
    chartRef.value && chartRef.value.refresh()
  })
}

watch(
  [() => props.id, () => type.value, () => props.colors],
  () => {
    nextTick(() => {
      initCharts()
    })
  },
  {
    deep: true,
  },
)

onMounted(() => {
  initCharts()
})
</script>

<style scoped>
.title {
  padding-bottom: 8px;
  border-bottom: 1px solid var(--s-color-1);
  margin-bottom: 5px;
}
</style>
