<template>
  <g-field-collapse label="容器" :modal="modal">
    <g-field label="边距" flat>
      <g-input-number
        v-model="config.grid.top"
        :min="0"
        :max="300"
        :step="1"
        suffix="px"
        inline
        label="顶部"
      />
      <g-input-number
        v-model="config.grid.bottom"
        :min="0"
        :max="300"
        :step="1"
        suffix="px"
        inline
        label="底部"
      />
      <g-input-number
        v-model="config.grid.left"
        :min="0"
        :max="300"
        :step="1"
        suffix="px"
        inline
        label="左侧"
      />
      <g-input-number
        v-model="config.grid.right"
        :min="0"
        :max="300"
        :step="1"
        suffix="px"
        inline
        label="右侧"
      />
    </g-field>

    <slot></slot>
  </g-field-collapse>
</template>

<script setup>
import { computed } from 'vue'
defineOptions({
  name: 'ChartGridConfig',
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
</script>
