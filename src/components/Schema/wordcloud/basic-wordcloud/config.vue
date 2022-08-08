<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field label="超出绘制" tooltip="是否允许词云图在外界渲染">
        <div class="pt-5">
          <b-switch v-model="global.drawOutOfBound" size="small" />
        </div>
      </g-field>
      <g-field label="绘制形状">
        <g-select v-model="global.shape" :data="cloudShape" inline label="字体粗细" />
      </g-field>
      <g-field-collapse label="文字" flat>
        <g-field label="大小范围">
          <g-input-number v-model="global.sizeRange[0]" :min="12" :max="60" :step="1" inline label="最小" />
          <g-input-number v-model="global.sizeRange[1]" :min="12" :max="60" :step="1" inline label="最大" />
        </g-field>
        <g-field label="旋转范围" flat>
          <g-input-number v-model="global.rotationRange[0]" :min="0" :max="180" :step="1" inline label="最小" />
          <g-input-number v-model="global.rotationRange[1]" :min="0" :max="180" :step="1" inline label="最大" />
          <g-input-number v-model="global.rotationStep" :min="0" :max="180" :step="1" inline label="旋转步长" />
          <g-input-number v-model="global.gridSize" :min="0" :max="50" :step="1" inline label="文本间距" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>

    <g-field-collapse label="提示框" toggle v-model="config.tooltip.show">
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.tooltip.textStyle.fontSize"
          :min="0"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select v-model="config.tooltip.textStyle.fontWeight" :data="fontWeights" inline label="字体粗细" />
        <g-color-picker v-model="config.tooltip.textStyle.color" label="颜色" inline="inline-single" />
      </g-field>
    </g-field-collapse>
  </div>
</template>
<script>
import { computed } from 'vue'
import {
  fontFamilys,
  fontWeights,
  echartsLabelPositions,
  legendLocations,
  orients,
  legendIcons,
  axisTypes,
  titleLocations,
  lineStyles,
  hAligns,
  timeFormats,
  valueFormats,
  fillTypes,
  alignType,
  sortTypes,
  funnelLabelPosition,
  legendLocationsPie,
  cloudShape,
} from '@/config/select-options'

export default {
  name: 'VBasicWordCloudConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)
    const global = computed(() => props.data.config.series[0])
    const seriesCount = computed(() => props.data.apiData.config.seriesCount)
    const xAxisTypes = computed(() => axisTypes.filter(m => m.value !== 'value'))

    return {
      config,
      seriesCount,
      fontFamilys,
      fontWeights,
      echartsLabelPositions,
      legendLocations,
      orients,
      legendIcons,
      xAxisTypes,
      titleLocations,
      lineStyles,
      hAligns,
      timeFormats,
      valueFormats,
      fillTypes,
      alignType,
      sortTypes,
      funnelLabelPosition,
      legendLocationsPie,
      global,
      cloudShape,
    }
  },
}
</script>
