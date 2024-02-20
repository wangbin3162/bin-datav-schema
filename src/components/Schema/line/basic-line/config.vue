<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data">
      <g-field label="曲线">
        <g-switch v-model="config.global.smooth" />
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
