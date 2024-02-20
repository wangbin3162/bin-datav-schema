<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data">
      <g-field label="曲线">
        <g-switch v-model="config.global.smooth" />
      </g-field>

      <g-field label="区域渐变" flat>
        <g-input-number
          v-model="config.global.areaStyle.from"
          :min="0"
          :max="100"
          :step="1"
          suffix="%"
          inline
          label="开始"
        />
        <g-input-number
          v-model="config.global.areaStyle.to"
          :min="0"
          :max="100"
          :step="1"
          suffix="%"
          inline
          label="结束"
        />
        <g-slider
          v-model="config.global.areaStyle.opacity"
          :min="0"
          :max="100"
          :step="1"
          suffix="%"
          label="透明度"
        />
      </g-field>
    </ChartGlobalConfig>

    <ChartGridConfig :data="data" />

    <ChartLegendConfig :data="data" />

    <ChartTooltipConfig :data="data" />

    <ChartXAxisConfig :data="data" />

    <ChartYAxisConfig :data="data" />
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
