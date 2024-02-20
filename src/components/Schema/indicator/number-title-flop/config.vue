<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="属性" default-open>
      <g-field
        label="字体"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      >
        <g-select v-model="config.global.fontFamily" :data="FontFamilyOptions" />
      </g-field>
      <g-field label="排列方式">
        <g-select v-model="config.global.arrangement" :data="ArrangementOptions" />
      </g-field>
      <g-field label="间隔">
        <g-input-number
          v-model="config.global.distance"
          :min="-100"
          :max="100"
          :step="1"
          suffix="px"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="标题">
      <g-field label="标题名" tooltip="支持从数据中获取标题内容，详见数据面板">
        <g-input v-model="config.title.content" />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.title.textStyle.fontSize"
          :min="10"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-color-picker v-model="config.title.textStyle.color" inline label="字体颜色" />
        <g-select
          v-model="config.title.textStyle.fontWeight"
          :data="FontWeightOptions"
          inline
          label="字体粗细"
        />
        <g-select
          v-model="config.title.textStyle.textAlign"
          :data="JustifyContentOptions"
          inline
          label="对齐方式"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="指标数字" flat>
      <g-field label="文本样式" flat>
        <g-select
          v-model="config.counter.textStyle.fontFamily"
          :data="FontFamilyOptions"
          inline
          label="字体"
        />
        <g-input-number
          v-model="config.counter.textStyle.fontSize"
          :min="10"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select
          v-model="config.counter.textStyle.fontWeight"
          :data="FontWeightOptions"
          inline
          label="字体粗细"
        />
        <g-select
          v-model="config.counter.textStyle.textAlign"
          :data="HAlignOptions"
          inline
          label="对齐方式"
        />
        <g-color-picker v-model="config.counter.textStyle.color" label="字体颜色" />
      </g-field>
      <g-field label="前缀">
        <g-input v-model="config.counter.prefix" />
      </g-field>
      <g-field label="后缀">
        <g-input v-model="config.counter.suffix" />
      </g-field>
      <g-field label="小数位数">
        <g-input-number v-model="config.counter.decimals" :min="0" :max="8" :step="1" />
      </g-field>
      <g-field label="小数点">
        <g-input v-model="config.counter.decimal" />
      </g-field>
      <g-field label="分隔符">
        <g-input v-model="config.counter.separator" />
      </g-field>
      <g-field label="开启动画">
        <div class="pt-5">
          <b-switch v-model="config.counter.autoplay" size="small" />
        </div>
      </g-field>
      <g-field label="动画时长">
        <g-slider v-model="config.counter.duration" :min="0" :max="2000" :step="1" suffix="ms" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import {
  FontFamilyOptions,
  FontWeightOptions,
  JustifyContentOptions,
  ArrangementOptions,
  HAlignOptions,
} from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const config = toRef(props.data, 'config')
</script>
