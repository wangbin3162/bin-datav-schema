<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data" />

    <g-field-collapse label="图形">
      <g-field label="玫瑰图">
        <g-switch v-model="config.global.roseType" />
      </g-field>
      <g-field label="圆角">
        <g-input-number
          v-model="config.global.itemStyle.borderRadius"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
        />
      </g-field>

      <g-field
        label="中心位置"
        flat
        tooltip="环图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标/支持设置成百分比"
      >
        <g-input v-model="config.global.center[0]" inline label="水平位置" />
        <g-input v-model="config.global.center[1]" inline label="垂直位置" />
      </g-field>

      <g-field
        label="环图半径"
        flat
        tooltip="环图的半径，值为<number|string>，可设置可视区域百分比"
      >
        <g-input v-model="config.global.radius[0]" inline label="内半径" />
        <g-input v-model="config.global.radius[1]" inline label="外半径" />
      </g-field>
    </g-field-collapse>

    <ChartLegendConfig :data="data" />

    <ChartTooltipConfig :data="data" />
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
// config 配置项
const config = computed(() => props.data.config)
</script>
