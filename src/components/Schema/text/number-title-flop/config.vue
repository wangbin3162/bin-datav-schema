<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field label="字体" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体">
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field label="排列方式">
        <g-select v-model="config.global.arrangement" :data="arrangements" />
      </g-field>
      <g-field label="间隔">
        <g-slider
          v-model="config.global.distance"
          :min="-100"
          :max="500"
          :step="0.5"
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
          :min="12"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="字号"
        />
        <g-color-picker
          v-model="config.title.textStyle.color"
          inline="inline"
          label="字体颜色"
        />
        <g-select
          v-model="config.title.textStyle.fontWeight"
          :data="fontWeights"
          inline="inline"
          label="字体粗细"
        />
        <g-select
          v-model="config.title.textStyle.textAlign"
          :data="justifyContents"
          inline="inline"
          label="对齐方式"
        />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="指标数字" flat>
      <g-field label="文本样式" flat>
        <g-select
          v-model="config.counter.textStyle.fontFamily"
          :data="fontFamilys"
          inline="inline"
          label="字体"
        />
        <g-input-number
          v-model="config.counter.textStyle.fontSize"
          :min="12"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="字号"
        />
        <g-select
          v-model="config.counter.textStyle.fontWeight"
          :data="fontWeights"
          inline="inline"
          label="字体粗细"
        />
        <g-select
          v-model="config.counter.textStyle.textAlign"
          :data="justifyContents"
          inline="inline"
          label="对齐方式"
        />
        <g-color-picker
          v-model="config.counter.textStyle.color"
          inline="inline-single"
          label="字体颜色"
        />
      </g-field>
      <g-field label="前缀">
        <g-input v-model="config.counter.prefix" />
      </g-field>
      <g-field label="后缀">
        <g-input v-model="config.counter.suffix" />
      </g-field>
      <g-field label="小数位数">
        <g-slider
          v-model="config.counter.decimals"
          :min="0"
          :max="8"
          :step="1"
        />
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
        <g-slider
          v-model="config.counter.duration"
          :min="0"
          :max="2000"
          :step="1"
          suffix="ms"
        />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script>
import { toRef } from 'vue'
import { fontFamilys, fontWeights, justifyContents, arrangements } from '@/config/select-options'

export default {
  name: 'VNumberTitleFlopConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.data, 'config')
    return {
      config,
      fontFamilys,
      fontWeights,
      justifyContents,
      arrangements,
    }
  },
}
</script>
