<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field label="字体" tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体">
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field label="边距" flat>
        <g-input-number
          v-model="config.global.margin.top"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline="inline"
          label="顶部"
        />
        <g-input-number
          v-model="config.global.margin.bottom"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline="inline"
          label="底部"
        />
        <g-input-number
          v-model="config.global.margin.left"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline="inline"
          label="左侧"
        />
        <g-input-number
          v-model="config.global.margin.right"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline="inline"
          label="右侧"
        />
      </g-field>
      <g-field label="平滑曲线">
        <div class="pt-5">
          <b-switch v-model="config.global.smooth" size="small" />
        </div>
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
        <g-color-picker v-model="config.label.textStyle.color" label="颜色" inline="inline-single" />
      </g-field>
      <g-field label="水平偏移">
        <g-slider
          v-model="config.label.offsetX"
          :min="-100"
          :max="100"
          :step="1"
        />
      </g-field>
      <g-field label="垂直偏移">
        <g-slider
          v-model="config.label.offsetY"
          :min="-100"
          :max="100"
          :step="1"
        />
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
        <g-color-picker v-model="config.legend.textStyle.color" label="颜色" inline="inline-single" />
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
          <g-select
            v-model="config.legend.symbol.icon"
            :data="legendIcons"
            inline
            label="形状"
          />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>

    <g-field-collapse label="X轴" toggle v-model="config.xAxis.show">
      <g-field label="类型">
        <b-radio-group v-model="config.xAxis.type" type="button" size="mini">
          <b-radio v-for="em in xAxisTypes" :key="em.value" :label="em.value">{{ em.label }}</b-radio>
        </b-radio-group>
      </g-field>

      <g-field-collapse label="轴标题" v-model="config.xAxis.title.show" toggle>
        <g-field label="标题显示">
          <g-input v-model="config.xAxis.title.name" />
        </g-field>
        <g-field label="位置">
          <g-select v-model="config.xAxis.title.location" :data="titleLocations" />
        </g-field>
        <g-field label="展示方式" flat>
          <g-input-number
            v-model="config.xAxis.title.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline
            label="旋转"
          />
          <g-input-number
            v-model="config.xAxis.title.display.offset"
            :min="-100"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="偏移"
          />
        </g-field>
        <g-field label="文本样式" flat>
          <g-input-number
            v-model="config.xAxis.title.textStyle.fontSize"
            :min="10"
            :max="24"
            :step="1"
            suffix="px"
            inline
            label="字号"
          />
          <g-select
            v-model="config.xAxis.title.textStyle.fontWeight"
            :data="fontWeights"
            inline
            label="字体粗细"
          />
          <g-color-picker v-model="config.xAxis.title.textStyle.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴线" v-model="config.xAxis.axisLine.show" toggle>
        <g-field label="轴线样式" flat>
          <g-input-number
            v-model="config.xAxis.axisLine.width"
            :min="0"
            :max="5"
            :step="1"
            suffix="px"
            inline
            label="粗细"
          />
          <g-select v-model="config.xAxis.axisLine.type" :data="lineStyles" inline label="类型" />
          <g-color-picker v-model="config.xAxis.axisLine.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴刻度" v-model="config.xAxis.axisTick.show" toggle>
        <g-field label="刻度样式" flat>
          <g-input-number
            v-model="config.xAxis.axisTick.width"
            :min="0"
            :max="5"
            :step="1"
            suffix="px"
            inline
            label="粗细"
          />
          <g-select v-model="config.xAxis.axisTick.type" :data="lineStyles" inline label="类型" />
          <g-color-picker v-model="config.xAxis.axisTick.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴标签" v-model="config.xAxis.axisLabel.show" toggle>
        <g-field label="显示格式" v-if="config.xAxis.type === 'time'" tooltip="时间请参照 YYYY/MM/DD HH:mm:ss">
          <g-select
            v-model="config.xAxis.axisLabel.timeFormat"
            :data="timeFormats"
          />
        </g-field>
        <g-field label="两端留白">
          <div class="pt-5">
            <b-switch v-model="config.xAxis.boundaryGap" size="small" />
          </div>
        </g-field>
        <g-field label="间隔" tooltip="默认会采用标签不重叠的策略间隔显示标签，可以设置成 0 强制显示所有标签。">
          <g-input v-model="config.xAxis.axisLabel.interval" />
        </g-field>
        <g-field label="展示方式" flat>
          <g-input-number
            v-model="config.xAxis.axisLabel.display.rotate"
            :min="0"
            :max="100"
            :step="1"
            suffix="度"
            inline
            label="旋转"
          />
          <g-input-number
            v-model="config.xAxis.axisLabel.display.margin"
            :min="-100"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="偏移"
          />
        </g-field>
        <g-field label="对齐方式">
          <g-select v-model="config.xAxis.axisLabel.align" :data="hAligns" />
        </g-field>
        <g-field label="文本样式" flat>
          <g-input-number
            v-model="config.xAxis.axisLabel.textStyle.fontSize"
            :min="10"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="字号"
          />
          <g-select
            v-model="config.xAxis.axisLabel.textStyle.fontWeight"
            :data="fontWeights"
            inline
            label="字体粗细"
          />
          <g-color-picker v-model="config.xAxis.axisLabel.textStyle.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="网格线" v-model="config.xAxis.grid.show" toggle>
        <g-field label="线型样式" flat>
          <g-select
            v-model="config.xAxis.grid.line.type"
            :data="lineStyles"
            inline="inline"
            label="类型"
          />
          <g-input-number
            v-model="config.xAxis.grid.line.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="粗细"
          />
          <g-color-picker
            v-model="config.xAxis.grid.line.color"
            inline="inline-single"
            label="颜色"
          />
          <g-input-number
            v-if="config.xAxis.grid.line.type === 'dashed'"
            v-model="config.xAxis.grid.line.dashedLength"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="长度"
          />
          <g-input-number
            v-if="config.xAxis.grid.line.type === 'dashed'"
            v-model="config.xAxis.grid.line.dashedSpace"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="间距"
          />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>

    <g-field-collapse label="Y轴" toggle v-model="config.yAxis.show">
      <g-field label="显示范围" flat tooltip="默认可以填写auto，或者自行输入数值">
        <g-input
          v-model="config.yAxis.extent.min"
          inline="inline"
          label="最小值"
        />
        <g-input
          v-model="config.yAxis.extent.max"
          inline="inline"
          label="最大值"
        />
      </g-field>

      <g-field label="标签数量" tooltip="这是个预估值，实际显示会做调整，可以设置成 0 强制显示所有标签。">
        <g-input-number
          v-model="config.yAxis.splitNumber"
          :min="0"
          :max="100"
          :step="1"
        />
      </g-field>

      <g-field-collapse label="轴标题" v-model="config.yAxis.title.show" toggle>
        <g-field label="标题显示">
          <g-input v-model="config.yAxis.title.name" />
        </g-field>
        <g-field label="位置">
          <g-select v-model="config.yAxis.title.location" :data="titleLocations" />
        </g-field>
        <g-field label="展示方式" flat>
          <g-input-number
            v-model="config.yAxis.title.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline
            label="旋转"
          />
          <g-input-number
            v-model="config.yAxis.title.display.offset"
            :min="-100"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="偏移"
          />
        </g-field>
        <g-field label="文本样式" flat>
          <g-input-number
            v-model="config.yAxis.title.textStyle.fontSize"
            :min="10"
            :max="24"
            :step="1"
            suffix="px"
            inline
            label="字号"
          />
          <g-select
            v-model="config.yAxis.title.textStyle.fontWeight"
            :data="fontWeights"
            inline
            label="字体粗细"
          />
          <g-color-picker v-model="config.yAxis.title.textStyle.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴线" v-model="config.yAxis.axisLine.show" toggle>
        <g-field label="轴线样式" flat>
          <g-input-number
            v-model="config.yAxis.axisLine.width"
            :min="0"
            :max="5"
            :step="1"
            suffix="px"
            inline
            label="粗细"
          />
          <g-select v-model="config.yAxis.axisLine.type" :data="lineStyles" inline label="类型" />
          <g-color-picker v-model="config.yAxis.axisLine.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴刻度" v-model="config.yAxis.axisTick.show" toggle>
        <g-field label="刻度样式" flat>
          <g-input-number
            v-model="config.yAxis.axisTick.width"
            :min="0"
            :max="5"
            :step="1"
            suffix="px"
            inline
            label="粗细"
          />
          <g-select v-model="config.yAxis.axisTick.type" :data="lineStyles" inline label="类型" />
          <g-color-picker v-model="config.yAxis.axisTick.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="轴标签" v-model="config.yAxis.axisLabel.show" toggle>
        <g-field label="显示格式" tooltip="整数参照 d, 浮点参照 .1f">
          <g-select v-model="config.yAxis.axisLabel.valueFormat" :data="valueFormats" />
        </g-field>
        <g-field label="两端间距">
          <g-input-number
            v-model="config.yAxis.axisLabel.boundaryGap"
            :min="0"
            :max="100"
            :step="1"
            suffix="%"
          />
        </g-field>
        <g-field label="展示方式" flat>
          <g-input-number
            v-model="config.yAxis.axisLabel.display.rotate"
            :min="0"
            :max="360"
            :step="1"
            suffix="度"
            inline="inline"
            label="旋转"
          />
          <g-input-number
            v-model="config.yAxis.axisLabel.display.margin"
            :min="-100"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="偏移"
          />
        </g-field>
        <g-field label="对齐方式">
          <g-select v-model="config.yAxis.axisLabel.align" :data="hAligns" />
        </g-field>
        <g-field label="文本样式" flat>
          <g-input-number
            v-model="config.yAxis.axisLabel.textStyle.fontSize"
            :min="10"
            :max="100"
            :step="1"
            suffix="px"
            inline
            label="字号"
          />
          <g-select
            v-model="config.yAxis.axisLabel.textStyle.fontWeight"
            :data="fontWeights"
            inline
            label="字体粗细"
          />
          <g-color-picker v-model="config.yAxis.axisLabel.textStyle.color" label="颜色" inline="inline-single" />
        </g-field>
      </g-field-collapse>

      <g-field-collapse label="网格线" v-model="config.yAxis.grid.show" toggle>
        <g-field label="线型样式" flat>
          <g-select
            v-model="config.yAxis.grid.line.type"
            :data="lineStyles"
            inline="inline"
            label="类型"
          />
          <g-input-number
            v-model="config.yAxis.grid.line.width"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="粗细"
          />
          <g-color-picker
            v-model="config.yAxis.grid.line.color"
            inline="inline-single"
            label="颜色"
          />
          <g-input-number
            v-if="config.yAxis.grid.line.type === 'dashed'"
            v-model="config.yAxis.grid.line.dashedLength"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="长度"
          />
          <g-input-number
            v-if="config.yAxis.grid.line.type === 'dashed'"
            v-model="config.yAxis.grid.line.dashedSpace"
            :min="0"
            :max="100"
            :step="1"
            suffix="px"
            inline="inline"
            label="间距"
          />
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
        <g-color-picker v-model="config.tooltip.textStyle.color" label="颜色" inline="inline-single" />
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
        <g-color-picker v-model="config.tooltip.background.color" label="背景颜色" inline="inline-single" />
      </g-field>
      <g-field label="轴指示器" flat>
        <g-select
          v-model="config.tooltip.pointer.line.type"
          :data="lineStyles"
          inline="inline"
          label="类型"
        />
        <g-input-number
          v-model="config.tooltip.pointer.line.width"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="粗细"
        />
        <g-input-number
          v-if="config.tooltip.pointer.line.type === 'dashed'"
          v-model="config.tooltip.pointer.line.dashedLength"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="长度"
        />
        <g-input-number
          v-if="config.tooltip.pointer.line.type === 'dashed'"
          v-model="config.tooltip.pointer.line.dashedSpace"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline="inline"
          label="间距"
        />
        <g-color-picker
          v-model="config.tooltip.pointer.line.color"
          inline="inline-single"
          label="颜色"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="系列">
      <template v-for="(s,index) in config.series" :key="index">
        <div v-if="index<seriesCount">
          <div class="series-title">
            <span>系列{{ index + 1 }}</span>
          </div>
          <g-field label="线条样式" flat>
            <g-input-number
              v-model="config.series[index].lineStyle.width"
              :min="1"
              :max="5"
              :step="1"
              inline
              label="线条粗细"
            />
            <g-select
              v-model="config.series[index].lineStyle.type"
              :data="lineStyles"
              inline
              label="线条类型"
            />
            <g-color-picker v-model="config.series[index].lineStyle.color" label="颜色" inline="inline-single" />
          </g-field>
          <g-field label="透明度">
            <g-input-number
              v-model="config.series[index].areaStyle.opacity"
              :min="0"
              :max="1"
              :step="0.1"
            />
          </g-field>
          <g-field label="开始颜色">
            <g-color-picker v-model="config.series[index].areaStyle.from" />
          </g-field>
          <g-field label="结束颜色">
            <g-color-picker v-model="config.series[index].areaStyle.to" />
          </g-field>
        </div>
      </template>
    </g-field-collapse>
  </div>
</template>

<script>
import { computed, toRef } from 'vue'
import {
  axisTypes,
  echartsLabelPositions, fillTypes,
  fontFamilys,
  fontWeights, hAligns, legendIcons,
  legendLocations, lineStyles,
  orients, timeFormats, titleLocations, valueFormats,
} from '@/config/select-options'
import { BasicLineSeries } from '@/components/Schema/line/basic-line/config'

export default {
  name: 'VBasicAreaConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const config = computed(() => props.data.config)
    const seriesCount = computed(() => props.data.apiData.config.seriesCount)
    const xAxisTypes = computed(() => axisTypes.filter(m => m.value !== 'value'))

    return {
      config,
      seriesCount,
      fontFamilys,
      fontWeights,
      echartsLabelPositions,
      legendLocations,
      orients,
      legendIcons,
      xAxisTypes,
      titleLocations,
      lineStyles,
      hAligns,
      timeFormats,
      valueFormats,
      fillTypes,
    }
  },
}
</script>
