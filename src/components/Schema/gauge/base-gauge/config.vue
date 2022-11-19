<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field label="圆心坐标" inline tooltip="仪表盘圆心（中心）坐标,支持设置成百分比">
        <g-input v-model="config.global.center[0]" inline label="水平位置"></g-input>
        <g-input v-model="config.global.center[1]" inline label="垂直位置"></g-input>
      </g-field>
      <g-field label="半径">
        <g-input v-model="config.global.radius"></g-input>
      </g-field>
      <g-field label="角度范围" inline>
        <g-input-number
          v-model="config.global.startAngle"
          :min="360"
          :max="360"
          inline
          label="起始角度"
        ></g-input-number>
        <g-input-number
          v-model="config.global.endAngle"
          :min="360"
          :max="360"
          inline
          label="结束角度"
        ></g-input-number>
      </g-field>
      <g-field label="顺时针" tooltip="仪表盘刻度是否顺时针增长">
        <div class="pt-5">
          <b-switch v-model="config.global.clockwise" size="small" />
        </div>
      </g-field>
      <g-field label="刻度分割数">
        <g-input-number v-model="config.global.splitNumber" :min="1"></g-input-number>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="标题" toggle v-model="config.title.show">
      <g-field label="位置" inline>
        <g-input v-model="config.title.offsetCenter[0]" inline label="水平位置"></g-input>
        <g-input v-model="config.title.offsetCenter[1]" inline label="垂直位置"></g-input>
      </g-field>
      <g-field label="文本" inline>
        <g-input-number
          v-model="config.title.width"
          inline
          label="宽度"
          :min="0"
          :max="1000"
        ></g-input-number>
        <g-select
          v-model="config.title.overflow"
          :data="overflowTypes"
          label="超出换行/截断"
          inline
        />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.title.fontSize"
          :min="0"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select v-model="config.title.fontWeight" :data="fontWeights" inline label="字体粗细" />
        <g-color-picker v-model="config.title.color" label="颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="详情" toggle v-model="config.detail.show">
      <g-field label="单位">
        <g-input v-model="config.detail.unit"></g-input>
      </g-field>
      <g-field label="位置" inline>
        <g-input v-model="config.detail.offsetCenter[0]" inline label="水平位置"></g-input>
        <g-input v-model="config.detail.offsetCenter[1]" inline label="垂直位置"></g-input>
      </g-field>
      <g-field label="文本" inline>
        <g-input-number
          v-model="config.detail.width"
          inline
          label="宽度"
          :min="0"
          :max="1000"
        ></g-input-number>
        <g-select
          v-model="config.detail.overflow"
          :data="overflowTypes"
          label="超出换行/截断"
          inline
        />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.detail.fontSize"
          :min="0"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select v-model="config.detail.fontWeight" :data="fontWeights" inline label="字体粗细" />
        <g-color-picker v-model="config.detail.color" label="颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="轴线" toggle v-model="config.axisLine.show">
      <g-field label="两端圆形">
        <div class="pt-5">
          <b-switch v-model="config.axisLine.roundCap" size="small" />
        </div>
      </g-field>
      <g-field-collapse label="轴线样式">
        <template #add>
          <b-button type="text" @click="addSeries" title="新增一个轴线区域">
            <b-icon name="plus" size="16"></b-icon>
          </b-button>
          <b-button
            type="text"
            :disabled="config.axisLine.lineStyle.color.length === 1"
            @click="deleteLast"
            title="移除最后一个轴线区域"
          >
            <b-icon name="delete" size="16"></b-icon>
          </b-button>
        </template>
        <template v-for="(item, index) in config.axisLine.lineStyle.color" :key="index">
          <g-field flat :label="`区域${index + 1}`">
            <template #label>
              <div class="series-title" style="top: -8px">
                <span>区域{{ index + 1 }}</span>
              </div>
            </template>
            <g-input-number
              v-model="config.axisLine.lineStyle.color[index][0]"
              inline
              label="宽度"
              :min="0"
              :max="1"
              :step="0.1"
              :precision="1"
            ></g-input-number>
            <g-color-picker
              v-model="config.axisLine.lineStyle.color[index][1]"
              label="颜色"
              inline
            />
          </g-field>
        </template>
      </g-field-collapse>
      <g-field label="宽度">
        <g-input-number
          v-model="config.axisLine.lineStyle.width"
          :min="0"
          :max="100"
          :step="1"
        ></g-input-number>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="进度条" toggle v-model="config.progress.show">
      <g-field label="是否重叠" tooltip="多组数据时进度条是否重叠">
        <div class="pt-5">
          <b-switch v-model="config.progress.overlap" size="small" />
        </div>
      </g-field>
      <g-field label="宽度">
        <g-input-number
          v-model="config.progress.width"
          :min="0"
          :max="100"
          :step="1"
        ></g-input-number>
      </g-field>
      <g-field label="两端圆角">
        <div class="pt-5">
          <b-switch v-model="config.progress.roundCap" size="small" />
        </div>
      </g-field>
      <g-field label="裁剪" tooltip="是否裁掉超出部分">
        <div class="pt-5">
          <b-switch v-model="config.progress.clip" size="small" />
        </div>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="分隔线" toggle v-model="config.splitLine.show">
      <g-field flat label="分隔线样式">
        <g-input v-model="config.splitLine.length" inline label="线长"></g-input>
        <g-input-number
          v-model="config.splitLine.lineStyle.width"
          inline
          :min="1"
          :max="10"
          :step="1"
          label="线宽"
        />
        <g-select
          v-model="config.splitLine.lineStyle.type"
          inline
          :data="lineStyles"
          label="线型"
        />
        <g-input-number
          v-model="config.splitLine.distance"
          inline
          :min="-100"
          :max="100"
          :step="1"
          label="与轴线的距离"
        />
        <g-color-picker v-model="config.splitLine.lineStyle.color" label="颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="刻度" toggle v-model="config.axisTick.show">
      <g-field label="刻度数" tooltip="分隔线之间分隔的刻度数">
        <g-input-number v-model="config.axisTick.splitNumber" :min="0" :max="100" :step="1" />
      </g-field>
      <g-field label="刻度线样式" flat>
        <g-input v-model="config.axisTick.length" inline label="线长"></g-input>
        <g-input-number
          v-model="config.axisTick.lineStyle.width"
          inline
          :min="1"
          :max="10"
          :step="1"
          label="线宽"
        />
        <g-select v-model="config.axisTick.lineStyle.type" inline :data="lineStyles" label="线型" />
        <g-input-number
          v-model="config.axisTick.distance"
          inline
          :min="-100"
          :max="100"
          :step="1"
          label="与轴线的距离"
        />
        <g-color-picker v-model="config.axisTick.lineStyle.color" label="颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="刻度标签" toggle v-model="config.axisLabel.show">
      <g-field label="文字样式" flat>
        <g-input-number
          v-model="config.axisLabel.fontSize"
          :min="0"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select
          v-model="config.axisLabel.fontWeight"
          :data="fontWeights"
          inline
          label="字体粗细"
        />
        <g-color-picker v-model="config.axisLabel.color" label="颜色" />
        <g-input-number
          v-model="config.axisLabel.distance"
          :min="-100"
          :max="100"
          :step="1"
          label="与轴线的距离"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="指针" toggle v-model="config.pointer.show">
      <g-field label="位置" flat>
        <g-input v-model="config.pointer.offsetCenter[0]" inline label="水平位置"></g-input>
        <g-input v-model="config.pointer.offsetCenter[1]" inline label="垂直位置"></g-input>
      </g-field>
      <g-field label="指针样式" flat>
        <g-input v-model="config.pointer.length" inline label="长度"></g-input>
        <g-input-number
          v-model="config.pointer.width"
          :min="0"
          :max="10"
          :step="1"
          inline
          label="宽度"
        ></g-input-number>
        <g-select v-model="config.pointer.icon" :data="pointerIcons" label="指针类型" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="固定点" toggle v-model="config.anchor.show">
      <g-field label="位置" flat>
        <g-input v-model="config.anchor.offsetCenter[0]" inline label="水平位置"></g-input>
        <g-input v-model="config.anchor.offsetCenter[1]" inline label="垂直位置"></g-input>
      </g-field>
      <g-field label="固定点样式" flat>
        <g-input-number
          v-model="config.anchor.size"
          :min="0"
          :max="20"
          :step="1"
          inline
          label="大小"
        ></g-input-number>
        <g-select v-model="config.anchor.icon" :data="pointerIcons" label="类型" inline />
        <g-input-number
          v-model="config.anchor.itemStyle.opacity"
          :min="0"
          :max="1"
          :step="0.1"
          :precision="1"
          inline
          label="透明度"
        ></g-input-number>
        <g-color-picker v-model="config.anchor.itemStyle.color" label="颜色" inline />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="系列">
      <template v-for="(s, index) in config.series" :key="index">
        <div v-if="index < 1">
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
<script>
import { computed } from 'vue'
import {
  fontFamilys,
  fontWeights,
  echartsLabelPositions,
  legendLocations,
  orients,
  legendIcons,
  axisTypes,
  titleLocations,
  lineStyles,
  hAligns,
  timeFormats,
  valueFormats,
  fillTypes,
  alignType,
  sortTypes,
  funnelLabelPosition,
  legendLocationsPie,
  overflowTypes,
  pointerIcons,
} from '@/config/select-options'

export default {
  name: 'VBasicGaugeConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)
    const seriesCount = computed(() => props.data.apiData.config.seriesCount)
    const xAxisTypes = computed(() => axisTypes.filter(m => m.value !== 'value'))

    function addSeries() {
      config.value.axisLine.lineStyle.color.push([1, ''])
    }

    function deleteLast() {
      config.value.axisLine.lineStyle.color.pop()
    }

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
      alignType,
      sortTypes,
      funnelLabelPosition,
      legendLocationsPie,
      overflowTypes,
      pointerIcons,
      addSeries,
      deleteLast,
    }
  },
}
</script>
