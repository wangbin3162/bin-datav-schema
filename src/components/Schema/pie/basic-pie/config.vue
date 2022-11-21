<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局" modal>
      <g-field
        label="字体"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      >
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>

      <g-field label="圆角">
        <g-input-number
          v-model="config.global.borderRadius"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
        />
      </g-field>

      <g-field
        label="中心位置"
        flat
        tooltip="饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标/支持设置成百分比"
      >
        <g-input v-model="config.global.center[0]" inline label="水平位置" />
        <g-input v-model="config.global.center[1]" inline label="垂直位置" />
      </g-field>

      <g-field
        label="饼图半径"
        flat
        tooltip="饼图的半径，值为<number|string>，可设置可视区域百分比"
      >
        <!-- <g-input v-model="config.global.radius[0]" inline label="内半径" /> -->
        <g-input v-model="config.global.radius[1]" inline label="半径" />
      </g-field>

      <g-field label="南丁格尔图">
        <div class="pt-5">
          <b-switch v-model="config.global.roseType" size="small" />
        </div>
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="标注" modal toggle v-model="config.label.show">
      <g-field label="位置">
        <g-select v-model="config.label.position" :data="pieLabelPosition" />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.label.textStyle.fontSize"
          :min="10"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select
          v-model="config.label.textStyle.fontWeight"
          :data="fontWeights"
          inline
          label="字体粗细"
        />
        <g-color-picker v-model="config.label.textStyle.color" label="颜色" />
      </g-field>
      <g-field
        label="内容格式器"
        tooltip="内容格式器，支持用 \n 换行&#10;字符串模板变量&#10;{a}：系列名&#10;{b}：数据名&#10;{c}：数据值&#10;{d}：百分比"
      >
        <g-input v-model="config.label.formatter" />
      </g-field>
      <g-field label="标签对齐">
        <g-select v-model="config.label.alignTo" :data="pieLabelAlign" />
      </g-field>
      <g-field label="出血线大小">
        <g-slider v-model="config.label.bleedMargin" :min="0" :max="100" :step="1" />
      </g-field>
      <g-field label="字线距离" tooltip="文字与 label line 之间的距离">
        <g-slider v-model="config.label.distanceToLabelLine" :min="0" :max="100" :step="1" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="图例" modal toggle v-model="config.legend.show">
      <g-field label="位置">
        <g-select v-model="config.legend.position" :data="legendLocations" />
      </g-field>
      <g-field label="布局方式">
        <b-radio-group v-model="config.legend.orient" type="button" size="mini">
          <b-radio v-for="em in orients" :key="em.value" :label="em.value">{{ em.label }}</b-radio>
        </b-radio-group>
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.legend.textStyle.fontSize"
          :min="0"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select
          v-model="config.legend.textStyle.fontWeight"
          :data="fontWeights"
          inline
          label="字体粗细"
        />
        <g-color-picker v-model="config.legend.textStyle.color" label="颜色" />
      </g-field>
      <g-field-collapse label="图形" v-model="config.legend.symbol.show" toggle>
        <g-field label="图例" flat>
          <g-input-number
            v-model="config.legend.symbol.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="宽度"
          />
          <g-input-number
            v-model="config.legend.symbol.height"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="高度"
          />
          <g-input-number
            v-model="config.legend.symbol.gap"
            :min="-100"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="间隔"
          />
          <g-select v-model="config.legend.symbol.icon" :data="legendIcons" inline label="形状" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>
    <g-field-collapse label="提示框" modal toggle v-model="config.tooltip.show">
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.tooltip.textStyle.fontSize"
          :min="10"
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
      <g-field label="背景样式" flat>
        <g-input-number
          v-model="config.tooltip.background.padding.h"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="水平边距"
        />
        <g-input-number
          v-model="config.tooltip.background.padding.v"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="垂直边距"
        />
        <g-color-picker v-model="config.tooltip.background.color" label="背景颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="色板设置" modal>
      <template v-for="(s, index) in config.color" :key="index">
        <g-field flat :label="`颜色${index + 1}`">
          <template #label>
            <div class="series-title inline">
              <span>颜色{{ index + 1 }}</span>
            </div>
          </template>
          <g-color-picker v-model="config.color[index]" />
        </g-field>
      </template>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  fontFamilys,
  fontWeights,
  pieLabelAlign,
  pieLabelPosition,
  legendLocations,
  orients,
  legendIcons,
} from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
// config 配置项
const config = computed(() => props.data.config)
</script>
