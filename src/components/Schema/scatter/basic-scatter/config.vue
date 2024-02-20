<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data" />

    <g-field-collapse label="图形">
      <g-field label="标记" flat>
        <g-input-number
          v-model="config.global.symbolSize"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="大小"
        />
        <g-select v-model="config.global.symbol" :data="PointerIconsOptions" inline label="形状" />
      </g-field>
      <g-field label="偏移" flat>
        <g-input-number
          v-model="config.global.symbolOffset[0]"
          :min="-100"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="水平偏移"
        />
        <g-input-number
          v-model="config.global.symbolOffset[1]"
          :min="-100"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="垂直偏移"
        />
      </g-field>
      <g-field label="旋转">
        <g-slider
          v-model="config.global.symbolRotate"
          :min="-360"
          :max="360"
          :step="1"
          suffix="px"
          label="旋转弧度"
        />
      </g-field>
    </g-field-collapse>

    <ChartGridConfig :data="data" />

    <ChartLegendConfig :data="data" />

    <ChartTooltipConfig :data="data" />

    <ChartXAxisConfig :data="data" />

    <ChartYAxisConfig :data="data" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { PointerIconsOptions } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
// config 配置项
const config = computed(() => props.data.config)
</script>
