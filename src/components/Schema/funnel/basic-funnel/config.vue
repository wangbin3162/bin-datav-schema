<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field
        label="位置"
        flat
        tooltip="数值可以是绝对的像素大小，也可以是相对布局宽度的百分比，顶部和左侧也可以是'left','center','right'"
      >
        <g-input v-model="config.global.margin.top" inline label="顶部" />
        <g-input v-model="config.global.margin.bottom" inline label="底部" />
        <g-input v-model="config.global.margin.left" inline label="左侧" />
        <g-input v-model="config.global.margin.right" inline label="右侧" />
      </g-field>
      <g-field
        label="映射宽度"
        inline
        tooltip="数据最小值/最大值映射的宽度。可以是绝对的像素大小，也可以是相对布局宽度的百分比，如果需要最小值的图形并不是尖端三角，可通过设置最小值实现。"
      >
        <g-input v-model="config.global.minSize" inline label="最小宽度"></g-input>
        <g-input v-model="config.global.maxSize" inline label="最大宽度"></g-input>
      </g-field>
      <g-field label="朝向" tooltip="朝向为水平方向时，水平布局为居中对齐时生效">
        <g-select v-model="config.global.orient" :data="orients" />
      </g-field>
      <g-field label="水平布局">
        <g-select v-model="config.global.funnelAlign" :data="alignType" />
      </g-field>
      <g-field label="数据排序">
        <g-select v-model="config.global.sort" :data="sortTypes" />
      </g-field>
      <g-field label="图形间距">
        <g-slider v-model="config.global.gap" :min="-100" :max="100" :step="1" suffix="%" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="标注" toggle v-model="config.label.show">
      <g-field label="位置">
        <g-select v-model="config.label.position" :data="funnelLabelPosition" />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.label.textStyle.fontSize"
          :min="0"
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
        <g-input v-model="config.label.formatter"></g-input>
      </g-field>
      <g-field-collapse label="视觉引导线" toggle v-model="config.labelLine.show">
        <g-field label="线长度" flat>
          <g-input-number
            v-model="config.labelLine.lineStyle.width"
            :min="0"
            :max="24"
            :step="1"
            suffix="px"
            inline
            label="线宽"
          />
          <g-select
            v-model="config.labelLine.lineStyle.type"
            :data="lineStyles"
            inline
            label="类型"
          />
          <g-color-picker v-model="config.labelLine.lineStyle.color" label="颜色" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>

    <g-field-collapse label="图例" toggle v-model="config.legend.show">
      <g-field label="位置" flat>
        <g-select v-model="config.legend.position" :data="legendLocationsPie" />
        <g-input v-model="config.legend.right" inline label="距右侧" />
        <g-input v-model="config.legend.bottom" inline label="距下侧" />
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
      <g-field label="图例选择">
        <div class="pt-5">
          <b-switch v-model="config.legend.selectedMode" size="small" />
        </div>
      </g-field>
      <g-field-collapse label="图形" toggle v-model="config.legend.symbol.show">
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

    <g-field-collapse label="提示框" toggle v-model="config.tooltip.show">
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
        <g-color-picker v-model="config.tooltip.background.color" label="颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="系列">
      <template v-for="(s, index) in config.series" :key="index">
        <div v-if="index < seriesCount">
          <div class="series-title">
            <span>系列{{ index + 1 }}</span>
          </div>
          <g-field label="填充类型">
            <b-radio-group v-model="config.series[index].color.type" type="button" size="mini">
              <b-radio v-for="em in fillTypes" :key="em.value" :label="em.value">
                {{ em.label }}
              </b-radio>
            </b-radio-group>
          </g-field>
          <g-field label="颜色配置" v-if="config.series[index].color.type === 'solid'">
            <g-color-picker v-model="config.series[index].color.value" />
          </g-field>
          <template v-else>
            <g-field label="开始颜色">
              <g-color-picker v-model="config.series[index].color.from" />
            </g-field>
            <g-field label="结束颜色">
              <g-color-picker v-model="config.series[index].color.to" />
            </g-field>
          </template>
        </div>
      </template>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  fontWeights,
  orients,
  legendIcons,
  lineStyles,
  fillTypes,
  alignType,
  sortTypes,
  funnelLabelPosition,
  legendLocationsPie,
} from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)
const seriesCount = computed(() => props.data.apiData.config.seriesCount)
</script>
