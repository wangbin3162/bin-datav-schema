<template>
  <g-field-collapse label="提示框" v-model="config.tooltip.show" toggle :modal="modal">
    <g-field label="提示框" flat>
      <g-input-number
        v-model="config.tooltip.textStyle.fontSize"
        :min="10"
        :max="24"
        :step="1"
        suffix="px"
        inline
        label="字号"
      />
      <g-color-picker v-model="config.tooltip.textStyle.color" inline label="颜色" />
      <g-color-picker v-model="config.tooltip.backgroundColor" inline label="背景颜色" />
      <g-color-picker v-model="config.tooltip.borderColor" inline label="边框颜色" />
    </g-field>

    <g-field label="指示器" flat>
      <g-select
        v-model="config.tooltip.axisPointer.type"
        :data="AxisPointerOptions"
        label="指示器类型"
      />
      <g-color-picker
        v-if="config.tooltip.axisPointer.type === 'shadow'"
        v-model="config.tooltip.axisPointer.shadowStyle.color"
        label="阴影颜色"
      />

      <template
        v-if="
          config.tooltip.axisPointer.type === 'line' || config.tooltip.axisPointer.type === 'cross'
        "
      >
        <g-select
          v-model="config.tooltip.axisPointer.lineStyle.type"
          :data="LineStyleOptions"
          inline
          label="直线类型"
        />
        <g-input-number
          v-model="config.tooltip.axisPointer.lineStyle.width"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="直线粗细"
        />
        <g-color-picker v-model="config.tooltip.axisPointer.lineStyle.color" label="颜色" />
      </template>

      <template v-if="config.tooltip.axisPointer.type === 'cross'">
        <g-switch v-model="config.tooltip.axisPointer.label.show" label="文本标签" />
        <g-select
          v-model="config.tooltip.axisPointer.crossStyle.type"
          :data="LineStyleOptions"
          inline
          label="交叉线类型"
        />
        <g-input-number
          v-model="config.tooltip.axisPointer.crossStyle.width"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="交叉线粗细"
        />
        <g-color-picker v-model="config.tooltip.axisPointer.crossStyle.color" label="交叉线颜色" />
      </template>
    </g-field>

    <slot></slot>
  </g-field-collapse>
</template>

<script setup>
import { computed } from 'vue'
import { LineStyleOptions, AxisPointerOptions } from '@/config/select-options'

defineOptions({
  name: 'ChartTooltipConfig',
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
