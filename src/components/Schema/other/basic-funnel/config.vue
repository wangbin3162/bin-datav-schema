<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data">
      <g-field label="标签线" flat>
        <g-switch v-model="config.global.labelLine.show" inline label="展示" />
        <g-input-number
          v-model="config.global.labelLine.length"
          :min="0"
          :step="1"
          inline
          label="线长"
        />
        <g-select
          v-model="config.global.labelLine.lineStyle.type"
          :data="LineStyleOptions"
          inline
          label="线类型"
        />
        <g-input-number
          v-model="config.global.labelLine.lineStyle.width"
          :min="10"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="粗细"
        />
        <g-color-picker v-model="config.global.labelLine.lineStyle.color" label="线颜色" />
      </g-field>
    </ChartGlobalConfig>

    <g-field-collapse label="图形">
      <g-field label="排序">
        <g-select v-model="config.global.sort" :data="SortTypeOptions" />
      </g-field>
      <g-field label="图形间距">
        <g-input-number v-model="config.global.gap" :min="0" :max="30" :step="1" />
      </g-field>

      <g-field
        label="映射宽度"
        flat
        tooltip="数据最小值/最大值映射的宽度。可以是绝对的像素大小，也可以是相对布局宽度的百分比，如果需要最小值的图形并不是尖端三角，可通过设置最小值实现。"
      >
        <g-input v-model="config.global.minSize" inline label="最小宽度"></g-input>
        <g-input v-model="config.global.maxSize" inline label="最大宽度"></g-input>
      </g-field>
    </g-field-collapse>

    <ChartGridConfig :data="data" />

    <ChartLegendConfig :data="data" />

    <ChartTooltipConfig :data="data" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { LineStyleOptions, SortTypeOptions } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)
</script>
