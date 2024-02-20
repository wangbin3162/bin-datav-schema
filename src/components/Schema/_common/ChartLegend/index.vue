<template>
  <g-field-collapse label="图例" v-model="config.legend.show" toggle :modal="modal">
    <g-field label="图例文字" flat>
      <g-input-number
        v-model="config.legend.textStyle.fontSize"
        :min="0"
        :max="24"
        :step="1"
        suffix="px"
        inline
        label="字号"
      />
      <g-color-picker v-model="config.legend.textStyle.color" inline label="颜色" />
    </g-field>
    <g-field label="图例位置" flat>
      <g-select v-model="config.legend.left" :data="HAlignOptions" inline label="水平" />
      <g-select v-model="config.legend.top" :data="VAlignOptions" inline label="垂直" />
    </g-field>
    <g-field label="图例信息" flat>
      <g-select v-model="config.legend.orient" :data="OrientsOptions" inline label="方向" />
      <g-select v-model="config.legend.icon" :data="LegendIconOptions" inline label="形状" />
    </g-field>
    <g-field label="图例大小" flat>
      <g-input-number
        v-model="config.legend.itemHeight"
        :min="0"
        :max="100"
        :step="1"
        suffix="px"
        inline
        label="宽度"
      />
      <g-input-number
        v-model="config.legend.itemWidth"
        :min="0"
        :max="100"
        :step="1"
        suffix="px"
        inline
        label="高度"
      />
    </g-field>

    <slot></slot>
  </g-field-collapse>
</template>

<script setup>
import { computed } from 'vue'
import {
  HAlignOptions,
  VAlignOptions,
  LegendIconOptions,
  OrientsOptions,
} from '@/config/select-options'

defineOptions({
  name: 'ChartLegendConfig',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
})

const config = computed(() => props.data.config)
</script>
