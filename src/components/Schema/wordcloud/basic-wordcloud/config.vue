<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局" modal>
      <g-field label="超出绘制" tooltip="是否允许词云图在外界渲染">
        <b-switch v-model="global.drawOutOfBound" size="small" />
      </g-field>
      <g-field label="绘制形状">
        <g-select v-model="global.shape" :data="cloudShape" />
      </g-field>
      <g-field label="字号范围" flat>
        <g-input-number
          v-model="global.sizeRange[0]"
          :min="12"
          :max="60"
          :step="1"
          inline
          label="最小"
        />
        <g-input-number
          v-model="global.sizeRange[1]"
          :min="12"
          :max="60"
          :step="1"
          inline
          label="最大"
        />
      </g-field>
      <g-field label="旋转范围" flat>
        <g-input-number
          v-model="global.rotationRange[0]"
          :min="0"
          :max="180"
          :step="1"
          inline
          label="最小"
        />
        <g-input-number
          v-model="global.rotationRange[1]"
          :min="0"
          :max="180"
          :step="1"
          inline
          label="最大"
        />
        <g-input-number
          v-model="global.rotationStep"
          :min="0"
          :max="180"
          :step="1"
          inline
          label="旋转步长"
        />
        <g-input-number
          v-model="global.gridSize"
          :min="0"
          :max="50"
          :step="1"
          inline
          label="文本间距"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="提示框" modal toggle v-model="config.tooltip.show">
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
        <g-select
          v-model="config.tooltip.textStyle.fontWeight"
          :data="fontWeights"
          inline
          label="字体粗细"
        />
        <g-color-picker v-model="config.tooltip.textStyle.color" label="颜色" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'

import { fontWeights, cloudShape } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)
const global = computed(() => props.data.config.series[0])
</script>
