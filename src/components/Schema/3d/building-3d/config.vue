<template>
  <div class="setting-panel-gui">
    <g-field label="控制器">
      <b-switch v-model="config.control" size="small" />
    </g-field>
    <g-field label="颜色">
      <g-color-picker v-model="config.color" />
    </g-field>

    <g-field label="转动速度">
      <g-slider v-model="config.rotateSpeed" :min="0" :max="10" :step="1" />
    </g-field>
    <g-field label="模型缩放">
      <g-input-number v-model="config.scale" :min="0.001" :max="0.1" :step="0.001" />
    </g-field>
    <g-field label="摄像机位置" tooltip="摄像机位置为vec3(x,y,z)，填写xyz，逗号隔开">
      <g-input v-model="config.cameraPos" placeholder="x,y,z" />
    </g-field>

    <g-field label="发光阈值">
      <g-slider v-model="config.threshold" :min="0" :max="1" :step="0.05" />
    </g-field>
    <g-field label="发光强度">
      <g-slider v-model="config.strength" :min="0" :max="1" :step="0.05" />
    </g-field>
    <g-field label="发光半径">
      <g-slider v-model="config.radius" :min="0" :max="1" :step="0.05" />
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
