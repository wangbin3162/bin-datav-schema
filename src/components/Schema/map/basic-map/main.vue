<template>
  <div class="dv-wrapper">
    <b-charts v-if="render" :options="options" style="width: 100%; height: 100%" ref="chartRef" />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'
import * as echarts from 'echarts'
import { requireJson } from '@/api/json-loader.api'
import { getPublicPath } from '@/utils/env'
import { useChartMain } from '@/hooks/useCharts'

defineOptions({
  name: 'VBasicMap',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { dvData, apiData } = useDataCenterOther(props.data)

const { config, chartRef, render, refreshChart } = useChartMain(props.data)

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

async function initData() {
  render.value = false
  const jsonName = 'china'
  const china = await requireJson(getPublicPath(`/data/map/${jsonName}.json`))
  if (china) {
    echarts.registerMap('china', china)
    render.value = true
  }
}

onMounted(initData)

// 设置seriesCount
watch(
  () => dvData.value,
  val => {
    apiData.value.config.seriesCount = val.yData ? val.yData.length : 0
    refreshChart()
  },
  { deep: true },
)
</script>
