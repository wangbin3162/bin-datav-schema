<template>
  <div class="setting-panel-gui">
    <g-field tooltip="支持从数据中获取标题内容，详见数据面板" label="标题名">
      <g-input v-model="config.title" />
    </g-field>
    <g-field tooltip="请选择您系统有的字体,如果您系统无此字体,标题将会显示默认字体" label="字体">
      <g-select v-model="config.textStyle.fontFamily" :data="fontFamilys" />
    </g-field>
    <g-field label="文本样式" flat>
      <g-input-number
        v-model="config.textStyle.fontSize"
        :min="10"
        :max="100"
        :step="1"
        suffix="px"
        inline
        label="字号"
      />
      <g-select v-model="config.textStyle.fontWeight" :data="fontWeights" inline label="字体粗细" />
      <g-color-picker v-model="config.textStyle.color" label="颜色" />
      <g-select v-model="config.textAlign" :data="justifyContents" label="对齐方式" inline />
      <g-select v-model="config.writingMode" :data="writingModes" label="文字排列方式" inline />
    </g-field>
    <g-field-collapse label="背景样式" v-model="config.backgroundStyle.show" toggle>
      <g-field label="背景色">
        <g-color-picker v-model="config.backgroundStyle.bgColor" />
      </g-field>
      <g-field label="圆角">
        <g-input-number
          v-model="config.backgroundStyle.borderRadius"
          :min="0"
          :max="1000"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field label="边框样式" flat>
        <g-input-number
          v-model="config.backgroundStyle.borderWidth"
          :min="0"
          :max="88888"
          :step="1"
          label="边框粗细"
          suffix="px"
          inline
        />
        <g-select
          v-model="config.backgroundStyle.borderStyle"
          :data="lineStyles"
          label="边框线"
          inline
        />
        <g-color-picker v-model="config.backgroundStyle.borderColor" label="颜色" />
      </g-field>
    </g-field-collapse>
    <g-field tooltip="溢出文本加省略号" label="省略号">
      <div class="pt-5">
        <b-switch v-model="config.ellipsis" size="small" />
      </div>
    </g-field>
    <g-field-collapse tooltip="点击标题区域可跳转至设定的超链接" label="超链接配置">
      <g-field label="超链接">
        <g-input v-model="config.urlConfig.url" />
      </g-field>
      <g-field label="新窗口打开">
        <div class="pt-5">
          <b-switch v-model="config.urlConfig.isBlank" size="small" />
        </div>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script>
import { computed, toRef } from 'vue'
import {
  fontFamilys,
  fontWeights,
  justifyContents,
  writingModes,
  lineStyles,
} from '@/config/select-options'

export default {
  name: 'VMainTitleConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const config = computed(() => props.data.config)

    return {
      config,
      fontFamilys,
      fontWeights,
      justifyContents,
      writingModes,
      lineStyles,
    }
  },
}
</script>
