<template>
  <g-field-collapse v-if="hasRespEvent" label="默认动作" default-open>
    <g-field label="是否开启">
      <b-switch v-model="config.defaultAction" size="small" />
    </g-field>
  </g-field-collapse>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  events: {
    type: Object,
    default: () => ({}),
  },
})

const config = computed(() => props.events)
// 判断是否有响应事件
const hasRespEvent = computed(() => Object.keys(config.value).includes('defaultAction'))
</script>
