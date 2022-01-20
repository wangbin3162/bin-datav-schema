<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field
        label="字体"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      >
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>

      <g-field
        label="中心位置"
        flat
        tooltip="中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标/支持设置成百分比"
      >
        <g-input v-model="config.global.center[0]" inline="inline" label="水平位置" />
        <g-input v-model="config.global.center[1]" inline="inline" label="垂直位置" />
      </g-field>

      <g-field label="半径" flat tooltip="半径，值为<number|string>，可设置可视区域百分比">
        <g-input v-model="config.global.radius" inline="inline" label="半径" />
      </g-field>

      <g-field label="开始角度">
        <g-slider v-model="config.global.startAngle" :min="0" :max="360" :step="10" />
      </g-field>
      <g-field label="雷达图类型">
        <g-select
          v-model="config.global.shape"
          :data="[
            { value: 'polygon', label: '多边形' },
            { value: 'circle', label: '圆' },
          ]"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="底纹">
      <g-field-collapse label="轴名称" toggle v-model="config.global.axisName.show">
        <g-field label="颜色">
          <g-color-picker v-model="config.global.axisName.color" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴线" toggle v-model="config.global.axisLine.show">
        <g-field label="颜色">
          <g-color-picker v-model="config.global.axisLine.lineStyle.color" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="分割线" toggle v-model="config.global.splitLine.show">
        <g-field label="段数">
          <g-slider v-model="config.global.splitNumber" :min="3" :max="8" :step="1" />
        </g-field>
        <g-field label="线颜色">
          <g-color-picker v-model="config.global.splitLine.lineStyle.color[0]" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="分割区背景" toggle v-model="config.global.splitArea.show">
        <template #add>
          <b-button type="text" @click="addSeries" title="新增颜色">
            <b-icon name="plus" size="16"></b-icon>
          </b-button>
          <b-button
            type="text"
            :disabled="config.global.splitArea.areaStyle.color.length === 1"
            @click="deleteLast"
            title="移除最后一个颜色"
          >
            <b-icon name="delete" size="16"></b-icon>
          </b-button>
        </template>
        <template v-for="(s, index) in config.global.splitArea.areaStyle.color" :key="index">
          <g-field flat :label="`颜色${index + 1}`">
            <template #label>
              <div class="series-title" style="top: -8px">
                <span>颜色{{ index + 1 }}</span>
              </div>
            </template>
            <g-color-picker
              v-model="config.global.splitArea.areaStyle.color[index]"
              inline="inline-single"
            />
          </g-field>
        </template>
      </g-field-collapse>
    </g-field-collapse>

    <g-field-collapse label="图形">
      <g-field label="标记大小">
        <g-slider v-model="config.global.symbolSize" :min="0" :max="4" :step="1" />
      </g-field>
      <g-field label="填充透明度">
        <g-slider v-model="config.global.areaStyle.opacity" :min="0" :max="1" :step="0.1" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="标注" toggle v-model="config.label.show">
      <g-field label="位置">
        <g-select v-model="config.label.position" :data="echartsLabelPositions" />
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
        <g-color-picker
          v-model="config.label.textStyle.color"
          label="颜色"
          inline="inline-single"
        />
      </g-field>
      <g-field
        label="内容格式器"
        tooltip="内容格式器，支持用 \n 换行&#10;字符串模板变量&#10;{a}：系列名&#10;{b}：数据名&#10;{c}：数据值&#10;{d}：百分比"
      >
        <g-input v-model="config.label.formatter" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="图例" toggle v-model="config.legend.show">
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
        <g-color-picker
          v-model="config.legend.textStyle.color"
          label="颜色"
          inline="inline-single"
        />
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

    <g-field-collapse label="提示框" toggle v-model="config.tooltip.show">
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
        <g-color-picker
          v-model="config.tooltip.textStyle.color"
          label="颜色"
          inline="inline-single"
        />
      </g-field>
      <g-field label="背景样式" flat>
        <g-input-number
          v-model="config.tooltip.background.padding.h"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="水平边距"
        />
        <g-input-number
          v-model="config.tooltip.background.padding.v"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="垂直边距"
        />
        <g-color-picker
          v-model="config.tooltip.background.color"
          label="背景颜色"
          inline="inline-single"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="色板设置">
      <template v-for="(s, index) in config.color" :key="index">
        <g-field flat :label="`颜色${index + 1}`">
          <template #label>
            <div class="series-title" style="top: -8px">
              <span>颜色{{ index + 1 }}</span>
            </div>
          </template>
          <g-color-picker v-model="config.color[index]" inline="inline-single" />
        </g-field>
      </template>
    </g-field-collapse>
  </div>
</template>

<script>
import { computed } from 'vue'
import {
  fontFamilys,
  fontWeights,
  pieLabelAlign,
  echartsLabelPositions,
  legendLocations,
  orients,
  legendIcons,
} from '@/config/select-options'

export default {
  name: 'VBasicRadarConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)

    const addSeries = () => {
      config.value.global.splitArea.areaStyle.color.push('rgba(250,250,250,0.3)')
    }
    const deleteLast = () => {
      config.value.global.splitArea.areaStyle.color.pop()
    }
    return {
      config,
      fontFamilys,
      fontWeights,
      echartsLabelPositions,
      pieLabelAlign,
      legendLocations,
      orients,
      legendIcons,
      addSeries,
      deleteLast,
    }
  },
}
</script>
