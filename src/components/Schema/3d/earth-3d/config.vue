<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="属性" default-open>
      <g-field label="点阵颜色">
        <g-color-picker v-model="config.dotColor" />
      </g-field>
      <g-field label="地球半径">
        <g-slider v-model="config.radius" :min="50" :max="120" :step="1" />
      </g-field>
      <g-field label="闪动频率">
        <g-slider v-model="config.blintSpeed" :min="0" :max="10" :step="1" />
      </g-field>
      <g-field label="转动速度">
        <g-slider v-model="config.rotateSpeed" :min="0" :max="5" :step="0.1" />
      </g-field>
    </g-field-collapse>
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
