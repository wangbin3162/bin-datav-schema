<template>
  <div class="setting-panel-gui">
    <g-field label="默认值">
      <g-select v-model="config.default" :data="options" />
    </g-field>
    <g-field label="字体颜色">
      <g-color-picker v-model="config.color" />
    </g-field>
    <g-field label="字体大小">
      <g-input-number v-model="config.fontSize" :min="12" :max="50" :step="1" suffix="px" />
    </g-field>
    <g-field label="背景颜色">
      <g-color-picker v-model="config.background" />
    </g-field>
    <g-field label="边框颜色">
      <g-color-picker v-model="config.borderColor" />
    </g-field>
    <g-field label="箭头颜色">
      <g-color-picker v-model="config.arrowColor" />
    </g-field>
    <g-field label="圆角大小">
      <g-input-number v-model="config.borderRadius" :min="0" :max="50" :step="1" suffix="px" />
    </g-field>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const { dvData } = useDataCenter(props.data)
const config = computed(() => props.data.config)
const options = computed(() => dvData.value ?? config.value.options)
</script>
