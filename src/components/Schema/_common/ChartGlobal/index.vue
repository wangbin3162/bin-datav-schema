<template>
  <g-field-collapse label="全局" :modal="modal">
    <g-field
      label="全局字体"
      tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
    >
      <g-select v-model="config.textStyle.fontFamily" :data="FontFamilyOptions" />
    </g-field>
    <g-field label="文本标签" flat v-if="hasProperty(config.global, 'label')">
      <g-switch v-model="config.global.label.show" inline label="展示" />
      <g-select v-model="config.global.label.position" :data="labelPos" inline label="标签位置" />
      <g-input-number
        v-model="config.global.label.fontSize"
        :min="10"
        :max="24"
        :step="1"
        suffix="px"
        inline
        label="字号"
      />
      <g-color-picker v-model="config.global.label.color" inline label="文本颜色" />

      <g-select
        v-if="hasProperty(config.global.label, 'formatter')"
        v-model="config.global.label.formatter"
        :data="FormatterOptions"
        inline
        label="内容格式器"
      />
      <g-input
        v-if="hasProperty(config.global.label, 'formatter')"
        v-model="config.global.label.formatter"
        placeholder="{b}：数据名 {c}：数据值 {d}：百分比"
        inline
        label="自定义内容"
      />
    </g-field>
    <slot></slot>
  </g-field-collapse>
</template>

<script setup>
import { computed } from 'vue'
import {
  FontFamilyOptions,
  EchartsLabelPositionOptions,
  PieLabelPositionOptions,
  FormatterOptions,
} from '@/config/select-options'
import { hasProperty } from '@/utils/util'

defineOptions({
  name: 'ChartGlobalConfig',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  modal: {
    type: Boolean,
    default: false,
  },
})

const config = computed(() => props.data.config)

const labelPos = computed(() =>
  props.data.componentType === 'pie' ? PieLabelPositionOptions : EchartsLabelPositionOptions,
)
</script>
