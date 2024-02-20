<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="属性" default-open>
      <g-field label="占位文字">
        <g-input v-model="config.prop.placeholder" />
      </g-field>
      <g-field label="日期类型">
        <g-select
          v-model="config.prop.type"
          :data="DateTypeOptions"
          inline
        />
      </g-field>
      <g-field label="默认值">
        <div flex="cross:center">
          <g-switch v-model="config.prop.defaultValueByCurrent" label="当前日期" inline />
          <g-date-picker
            v-model="config.prop.defaultValue"
            :type="config.prop.type"
            placeholder="可选择默认值"
            size="mini"
            style="width: 180%"
            :disabled="config.prop.defaultValueByCurrent"
            label="选择默认"
          ></g-date-picker>
        </div>
      </g-field>
      <g-field
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
        label="字体"
      >
        <g-select v-model="config.style.fontFamily" :data="FontFamilyOptions" />
      </g-field>
      <g-field label="字体颜色">
        <g-color-picker v-model="config.style.color" />
      </g-field>
      <g-field label="字体大小">
        <g-input-number v-model="config.style.fontSize" :min="12" :max="50" :step="1" suffix="px" />
      </g-field>
      <g-field label="背景颜色">
        <g-color-picker v-model="config.style.background" />
      </g-field>
      <g-field label="边框颜色">
        <g-color-picker v-model="config.style.borderColor" />
      </g-field>
      <g-field label="图标颜色">
        <g-color-picker v-model="config.style.iconColor" />
      </g-field>
      <g-field label="圆角大小">
        <g-input-number v-model="config.style.borderRadius" :min="0" :max="50" :step="1" suffix="px" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import {
  DateTypeOptions,
  FontFamilyOptions,
} from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const config = toRef(props.data, 'config')
</script>
