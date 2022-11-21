<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="标注" modal toggle v-model="config.label.show">
      <g-field label="位置">
        <g-select v-model="config.label.position" :data="echartsLabelPositions"></g-select>
      </g-field>
      <g-field label="文字" flat>
        <g-input-number
          v-model="config.label.fontSize"
          :min="10"
          :max="24"
          inline
          :step="1"
          suffix="px"
          label="字体大小"
        ></g-input-number>
        <g-select
          v-model="config.label.fontWeight"
          :data="fontWeights"
          inline
          label="字体粗细"
        ></g-select>
        <g-color-picker v-model="config.label.color" label="颜色"></g-color-picker>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="区域样式" modal>
      <g-field label="填充颜色">
        <g-color-picker v-model="config.itemStyle.areaColor"></g-color-picker>
      </g-field>
      <g-field label="边框样式" flat>
        <g-input-number
          v-model="config.itemStyle.borderWidth"
          :min="0"
          :max="5"
          :step="1"
          label="粗细"
          inline
        ></g-input-number>
        <g-select v-model="config.itemStyle.borderType" :data="lineStyles" inline label="类型" />
        <g-color-picker v-model="config.itemStyle.borderColor" label="颜色"></g-color-picker>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="区域悬浮" modal>
      <g-field label="填充颜色">
        <g-color-picker v-model="config.emphasis.itemStyle.areaColor"></g-color-picker>
      </g-field>
      <g-field label="边框样式" flat>
        <g-input-number
          v-model="config.emphasis.itemStyle.borderWidth"
          :min="0"
          :max="5"
          :step="1"
          label="粗细"
          inline
        ></g-input-number>
        <g-select
          v-model="config.emphasis.itemStyle.borderType"
          :data="lineStyles"
          inline
          label="类型"
        />
        <g-color-picker
          v-model="config.emphasis.itemStyle.borderColor"
          label="颜色"
        ></g-color-picker>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fontWeights, echartsLabelPositions, lineStyles } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
// config 配置项
const config = computed(() => props.data.config)
</script>
