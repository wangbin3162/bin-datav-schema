<template>
  <div class="setting-panel-gui">
    <g-field label="控制器">
      <b-switch v-model="config.control" size="small" />
    </g-field>
    <g-field label="转动速度">
      <g-slider v-model="config.rotateSpeed" :min="0" :max="10" :step="1" />
    </g-field>
    <g-field label="地球半径">
      <g-slider v-model="config.radius" :min="50" :max="120" :step="1" />
    </g-field>
    <g-field-collapse label="开启发光轮廓" toggle v-model="config.showLightEarth">
      <g-field label="发光轮廓偏移">
        <g-input-number v-model="config.lightOffset" :min="0" :max="3" :step="0.01" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="开启内发光" toggle v-model="config.showGlow">
      <g-field label="内发光缩放">
        <g-input-number v-model="config.innerGlowRatio" :min="0" :max="3" :step="0.01" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="光柱效果" toggle v-model="config.lightLine">
      <g-field label="光柱个数">
        <g-input-number v-model="config.lightSize" :min="0" :max="60" :step="1" />
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
