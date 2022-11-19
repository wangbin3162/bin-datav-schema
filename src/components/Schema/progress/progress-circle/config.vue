<template>
  <div class="setting-panel-gui">
    <g-field label="顶端形状">
      <b-radio-group v-model="config.linecap" type="button" size="mini">
        <b-radio label="round">圆形</b-radio>
        <b-radio label="square">方形</b-radio>
      </b-radio-group>
    </g-field>
    <g-field label="环形样式" flat>
      <g-input-number v-model="config.width" :min="1" :max="20" :step="1" inline label="线宽" />
      <g-color-picker v-model="config.color" inline label="颜色" />
    </g-field>
    <g-field label="背景样式" flat>
      <g-input-number
        v-model="config.trailWidth"
        :min="0"
        :max="20"
        :step="1"
        inline
        label="线宽"
      />
      <g-color-picker v-model="config.trailColor" inline label="颜色" />
    </g-field>
    <g-field label="仪表盘模式">
      <div class="pt-5">
        <b-switch v-model="config.dashboard" size="small" />
      </div>
    </g-field>

    <g-field-collapse label="标题" v-model="config.title.show" toggle>
      <g-field label="标题内容">
        <g-input v-model="config.title.content" />
      </g-field>
      <g-field label="文字大小">
        <g-input-number v-model="config.title.fontSize" :min="12" :max="36" :step="1" suffix="px" />
      </g-field>
      <g-field label="文字颜色">
        <g-color-picker v-model="config.title.color" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="百分比" v-model="config.value.show" toggle>
      <g-field label="文字大小">
        <g-input-number v-model="config.value.fontSize" :min="12" :max="36" :step="1" suffix="px" />
      </g-field>
      <g-field label="文字颜色">
        <g-color-picker v-model="config.value.color" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="数值" v-model="config.num.show" toggle>
      <g-field label="文字大小">
        <g-input-number v-model="config.num.fontSize" :min="12" :max="36" :step="1" suffix="px" />
      </g-field>
      <g-field label="文字颜色">
        <g-color-picker v-model="config.num.color" />
      </g-field>
      <g-field label="数值格式化">
        <g-input v-model="config.numFormat" />
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
// config 配置项
const config = computed(() => props.data.config)
</script>
