<template>
  <g-field-collapse label="X轴" v-model="config.xAxis.show" toggle modal>
    <g-field label="单位" flat>
      <g-input v-model="config.xAxis.name" label="名称" inline />
      <g-select
        v-model="config.xAxis.nameLocation"
        :data="TitleLocationOptions"
        inline
        label="位置"
      />
      <g-input-number
        v-model="config.xAxis.nameGap"
        :min="-100"
        :max="100"
        :step="1"
        suffix="px"
        inline
        label="偏移"
      />
      <g-input-number
        v-model="config.xAxis.nameRotate"
        :min="-360"
        :max="360"
        :step="1"
        suffix="°"
        inline
        label="旋转"
      />
      <g-input-number
        v-model="config.xAxis.nameTextStyle.fontSize"
        :min="10"
        :max="24"
        :step="1"
        suffix="px"
        inline
        label="字号"
      />
      <g-color-picker v-model="config.xAxis.nameTextStyle.color" label="颜色" inline />
    </g-field>
    <g-field
      label="坐标轴"
      v-if="hasProperty(config.xAxis, 'boundaryGap')"
      flat
      tooltip="类目轴中 boundaryGap 可以配置为 true 和 false,这时候刻度只是作为分隔线,非类目轴boundaryGap是一个两个值的数组."
    >
      <g-input
        v-if="hasProperty(config.xAxis, 'min')"
        v-model="config.xAxis.min"
        label="最小值"
        inline
        tooltip="可以设置成特殊值 'dataMin'"
      ></g-input>
      <g-input
        v-if="hasProperty(config.xAxis, 'max')"
        v-model="config.xAxis.max"
        label="最大值"
        inline
        tooltip="可以设置成特殊值 'dataMax'"
      ></g-input>

      <g-switch
        v-if="typeOf(config.xAxis.boundaryGap) === 'boolean'"
        v-model="config.xAxis.boundaryGap"
        inline
        label="两边留白"
      />
      <template v-if="typeOf(config.xAxis.boundaryGap) === 'array'">
        <g-input
          v-model="config.xAxis.boundaryGap[0]"
          inline
          label="最小延伸"
          tooltip="最小值和最大值的延伸范围"
        />
        <g-input
          v-model="config.xAxis.boundaryGap[1]"
          inline
          label="最大延伸"
          tooltip="最小值和最大值的延伸范围"
        />
      </template>
      <g-switch
        v-if="hasProperty(config.xAxis, 'inverse')"
        v-model="config.xAxis.inverse"
        inline
        label="反向坐标轴"
      />
    </g-field>

    <g-field label="轴线" flat>
      <g-switch v-model="config.xAxis.axisLine.show" inline label="展示" />
      <g-select
        v-model="config.xAxis.axisLine.lineStyle.type"
        :data="LineStyleOptions"
        inline
        label="类型"
      />
      <g-input-number
        v-model="config.xAxis.axisLine.lineStyle.width"
        :min="0"
        :max="5"
        :step="1"
        suffix="px"
        inline
        label="粗细"
      />
      <g-color-picker v-model="config.xAxis.axisLine.lineStyle.color" label="颜色" inline />
    </g-field>

    <g-field label="标签" flat>
      <g-switch v-model="config.xAxis.axisLabel.show" inline label="展示" />
      <g-input-number
        v-model="config.xAxis.axisLabel.rotate"
        :min="-360"
        :max="360"
        :step="1"
        suffix="°"
        inline
        label="旋转"
      />
      <g-input-number
        v-model="config.xAxis.axisLabel.fontSize"
        :min="10"
        :max="24"
        :step="1"
        suffix="px"
        inline
        label="字号"
      />
      <g-color-picker v-model="config.xAxis.axisLabel.color" label="颜色" inline />
    </g-field>

    <g-field label="刻度" flat>
      <g-switch v-model="config.xAxis.axisTick.show" inline label="展示" />
      <g-switch
        v-if="hasProperty(config.xAxis.axisTick, 'alignWithLabel')"
        v-model="config.xAxis.axisTick.alignWithLabel"
        inline
        label="标签对齐"
      />
      <g-input-number
        v-model="config.xAxis.axisTick.lineStyle.width"
        :min="0"
        :max="5"
        :step="1"
        suffix="px"
        inline
        label="粗细"
      />
      <g-color-picker v-model="config.xAxis.axisTick.lineStyle.color" label="颜色" inline />
    </g-field>

    <g-field label="分割线" flat>
      <g-switch v-model="config.xAxis.splitLine.show" inline label="展示" />
      <g-select
        v-model="config.xAxis.splitLine.lineStyle.type"
        :data="LineStyleOptions"
        inline
        label="类型"
      />
      <g-input-number
        v-model="config.xAxis.splitLine.lineStyle.width"
        :min="0"
        :max="5"
        :step="1"
        suffix="px"
        inline
        label="粗细"
      />
      <g-color-picker v-model="config.xAxis.splitLine.lineStyle.color" label="颜色" inline />
    </g-field>
    <slot></slot>
  </g-field-collapse>
</template>

<script setup>
import { computed } from 'vue'
import { hasProperty, typeOf } from '@/utils/util'
import { LineStyleOptions, TitleLocationOptions } from '@/config/select-options'

defineOptions({
  name: 'ChartXAxisConfig',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  modal: {
    type: Boolean,
    default: true,
  },
})

const config = computed(() => props.data.config)
</script>
