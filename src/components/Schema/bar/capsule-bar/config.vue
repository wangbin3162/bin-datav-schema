<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field
        label="字体"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      >
        <g-select v-model="config.global.fontFamily" :data="FontFamilyOptions" />
      </g-field>
      <g-field label="圆角大小" flat>
        <g-input-number
          v-model="config.global.borderRadius[0]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左上"
        />
        <g-input-number
          v-model="config.global.borderRadius[1]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右上"
        />
        <g-input-number
          v-model="config.global.borderRadius[2]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右下"
        />
        <g-input-number
          v-model="config.global.borderRadius[3]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左下"
        />
      </g-field>
      <g-field label="柱子高度">
        <g-input-number
          v-model="config.global.barHeight"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field label="柱间距">
        <g-input-number
          v-model="config.global.barMargin"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field label="标注" flat>
        <g-switch v-model="config.global.label.show" inline label="展示" />
        <g-select
          v-model="config.global.label.position"
          :data="[
            { value: 'default', label: '默认' },
            { value: 'right', label: '右侧' },
            { value: 'inner', label: '内部' },
          ]"
          inline
          label="标签位置"
        />
        <g-input-number
          v-model="config.global.label.fontSize"
          :min="10"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-color-picker v-model="config.global.label.color" inline label="文本颜色" />
      </g-field>
      <g-field label="背景颜色">
        <g-color-picker v-model="config.global.barBg" />
      </g-field>
      <g-field label="柱子阴影" flat>
        <g-input v-model="config.global.shadow" inline label="阴影偏移" />
        <g-color-picker v-model="config.global.shadowColor" inline label="阴影颜色" />
      </g-field>
    </g-field-collapse>

    <ChartGridConfig :data="data" />

    <g-field-collapse label="X轴" toggle v-model="config.xAxis.show">
      <g-field label="标题单位">
        <g-input v-model="config.global.unit" />
      </g-field>
      <g-field label="文本颜色">
        <g-color-picker v-model="config.xAxis.color" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="Y轴" toggle v-model="config.yAxis.show">
      <g-field label="文本颜色">
        <g-color-picker v-model="config.yAxis.color" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FontFamilyOptions } from '@/config/select-options'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)
</script>
