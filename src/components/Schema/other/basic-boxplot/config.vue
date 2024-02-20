<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data">
      <g-field label="盒子宽度" flat>
        <g-input v-model="config.global.boxWidth[0]" inline label="最小值"></g-input>
        <g-input v-model="config.global.boxWidth[1]" inline label="最大值"></g-input>
      </g-field>
      <g-field label="图形" flat>
        <g-input-number
          v-model="config.global.itemStyle.borderWidth"
          :min="0"
          :max="5"
          :step="1"
          inline
          label="描边线宽"
        ></g-input-number>
        <g-select
          v-model="config.global.itemStyle.borderType"
          :data="LineStyleOptions"
          inline
          label="描边类型"
        />
        <g-color-picker v-model="config.global.itemStyle.color" label="填充颜色" />
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
import { LineStyleOptions } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)
</script>
