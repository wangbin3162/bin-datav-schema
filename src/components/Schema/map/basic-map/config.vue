<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局">
      <g-field flat label="阴影偏移">
        <g-input-number
          v-model="config.global.shadowOffsetX"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="水平偏移"
        />
        <g-input-number
          v-model="config.global.shadowOffsetY"
          :min="0"
          :max="100"
          :step="1"
          suffix="px"
          inline
          label="垂直偏移"
        />
      </g-field>
      <g-field label="阴影颜色">
        <g-color-picker v-model="config.global.shadowColor"></g-color-picker>
      </g-field>
      <g-field-collapse label="区域">
        <g-field label="区域样式" flat>
          <g-input-number
            v-model="config.global.borderWidth"
            :min="0"
            :max="5"
            :step="1"
            label="粗细"
            inline
          ></g-input-number>
          <g-select v-model="config.global.borderType" :data="lineStyles" inline label="类型" />
          <g-color-picker v-model="config.global.borderColor" label="颜色"></g-color-picker>
        </g-field>
        <g-field label="布局方式">
          <b-radio-group v-model="config.global.areaColor.type" type="button" size="mini">
            <b-radio v-for="em in fillTypes" :key="em.value" :label="em.value">
              {{ em.label }}
            </b-radio>
          </b-radio-group>
        </g-field>
        <g-field label="颜色配置" v-if="config.global.areaColor.type === 'solid'">
          <g-color-picker v-model="config.global.areaColor.value"></g-color-picker>
        </g-field>
        <template v-else>
          <g-field label="开始颜色">
            <g-color-picker v-model="config.global.areaColor.from"></g-color-picker>
          </g-field>
          <g-field label="结束颜色">
            <g-color-picker v-model="config.global.areaColor.to"></g-color-picker>
          </g-field>
        </template>
      </g-field-collapse>
      <g-field-collapse label="区域悬浮样式">
        <g-field label="颜色配置">
          <g-color-picker v-model="config.global.itemStyle.areaColor"></g-color-picker>
        </g-field>
        <g-field label="边框样式" flat>
          <g-input-number
            v-model="config.global.itemStyle.borderWidth"
            :min="0"
            :max="5"
            :step="1"
            suffix="px"
            inline
            label="粗细"
          />
          <g-select
            v-model="config.global.itemStyle.borderType"
            :data="lineStyles"
            inline
            label="类型"
          />
          <g-color-picker v-model="config.global.itemStyle.borderColor" label="颜色" />
        </g-field>
      </g-field-collapse>
    </g-field-collapse>

    <g-field-collapse label="标注" toggle v-model="config.label.show">
      <g-field label="位置">
        <g-select v-model="config.label.position" :data="echartsLabelPositions" />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.label.fontSize"
          :min="10"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select v-model="config.label.fontWeight" :data="fontWeights" inline label="字体粗细" />
        <g-color-picker v-model="config.label.color" label="颜色" />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="提示" toggle v-model="config.label.emphasis.show">
      <g-field label="位置">
        <g-select v-model="config.label.emphasis.position" :data="echartsLabelPositions" />
      </g-field>
      <g-field label="文本样式" flat>
        <g-input-number
          v-model="config.label.emphasis.fontSize"
          :min="10"
          :max="24"
          :step="1"
          suffix="px"
          inline
          label="字号"
        />
        <g-select
          v-model="config.label.emphasis.fontWeight"
          :data="fontWeights"
          inline
          label="字体粗细"
        />
        <g-color-picker v-model="config.label.emphasis.color" label="颜色" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { fontWeights, echartsLabelPositions, lineStyles, fillTypes } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
// config 配置项
const config = computed(() => props.data.config)
</script>
