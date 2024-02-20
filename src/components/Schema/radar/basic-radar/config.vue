<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data" />

    <g-field-collapse label="图形">
      <g-field
        label="中心位置"
        flat
        tooltip="环图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标/支持设置成百分比"
      >
        <g-input v-model="config.global.center[0]" inline label="水平位置" />
        <g-input v-model="config.global.center[1]" inline label="垂直位置" />
      </g-field>

      <g-field label="半径" flat tooltip="环图的半径，值为<number|string>，可设置可视区域百分比">
        <g-input v-model="config.global.radius" inline label="半径" />
        <g-input-number
          v-model="config.global.startAngle"
          :min="0"
          :max="360"
          :step="10"
          inline
          suffix="°"
          label="开始角度"
        />
      </g-field>
      <g-field label="类型">
        <g-select
          v-model="config.global.shape"
          :data="[
            { value: 'polygon', label: '多边形' },
            { value: 'circle', label: '圆' },
          ]"
        />
      </g-field>
      <g-field label="标记大小" flat>
        <g-slider
          v-model="config.global.symbolSize"
          :min="0"
          :max="4"
          :step="1"
          inline
          label="标记大小"
        />
        <g-slider
          v-model="config.global.areaStyle.opacity"
          :min="0"
          :max="1"
          :step="0.1"
          inline
          label="填充透明度"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="雷达图" modal>
      <g-field label="名称" flat>
        <g-switch v-model="config.global.axisName.show" inline label="展示" />
        <g-color-picker v-model="config.global.axisName.color" label="颜色" />
      </g-field>
      <g-field label="轴线" flat>
        <g-switch v-model="config.global.axisLine.show" inline label="展示" />
        <g-color-picker v-model="config.global.axisLine.lineStyle.color" label="颜色" />
      </g-field>
      <g-field label="分割线" flat>
        <g-switch v-model="config.global.splitLine.show" inline label="展示" />

        <g-input-number
          v-model="config.global.splitNumber"
          :min="3"
          :max="8"
          :step="1"
          inline
          label="段数"
        />

        <g-color-picker v-model="config.global.axisLine.lineStyle.color" label="颜色" />
      </g-field>
      <g-field label="分割背景" flat>
        <g-switch v-model="config.global.splitArea.show" inline label="展示" />

        <g-color-picker v-model="config.global.splitArea.areaStyle.color[0]" label="单数颜色" />
        <g-color-picker v-model="config.global.splitArea.areaStyle.color[1]" label="双数颜色" />
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
