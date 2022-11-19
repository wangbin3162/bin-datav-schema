<template>
  <div class="setting-panel-gui">
    <g-field-collapse v-model="config.iconStyle.show" toggle label="图标样式">
      <g-field label="大小">
        <g-slider v-model="config.iconStyle.size" :min="0" :max="100" :step="0.1" />
      </g-field>
      <g-field label="边距">
        <g-slider v-model="config.iconStyle.marginRight" :min="-100" :max="100" :step="1" />
      </g-field>
      <g-field label="颜色">
        <g-color-picker v-model="config.iconStyle.color" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="时间器">
      <g-field
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
        label="字体"
      >
        <g-select v-model="config.time.textStyle.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.time.textStyle.fontSize"
          :min="10"
          :max="100"
          :step="1"
          suffix="px"
          label="字号"
          inline
        />
        <g-select
          v-model="config.time.textStyle.fontWeight"
          :data="fontWeights"
          label="字体粗细"
          inline
        />
        <g-color-picker v-model="config.time.textStyle.color" label="字体颜色" />
      </g-field>
      <g-field tooltip="如：hh:mm:ss为12小时制的格式" label="格式化">
        <g-input v-model="config.time.format" />
      </g-field>
      <g-field label="间隔时间">
        <g-input-number v-model="config.time.duration" :min="0" :step="100" suffix="ms" />
      </g-field>
      <g-field label="水平对齐">
        <b-radio-group v-model="config.time.horizontal" type="button" size="mini">
          <b-radio v-for="em in justifyContents" :key="em.value" :label="em.value">
            {{ em.label }}
          </b-radio>
        </b-radio-group>
      </g-field>
      <g-field label="垂直对齐">
        <b-radio-group v-model="config.time.vertical" type="button" size="mini">
          <b-radio v-for="em in aligns" :key="em.value" :label="em.value">{{ em.label }}</b-radio>
        </b-radio-group>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script>
import { toRef } from 'vue'
import { fontFamilys, fontWeights, justifyContents, aligns } from '@/config/select-options'

export default {
  name: 'VTimerConfig',
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
      aligns,
    }
  },
}
</script>
