<template>
  <div class="setting-panel-gui">
    <g-field label="颜色">
      <g-color-picker v-model="config.color" />
    </g-field>

    <g-field label="转动速度">
      <g-slider v-model="config.rotateSpeed" :min="0" :max="10" :step="1" />
    </g-field>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const config = computed(() => props.data.config)
</script>
