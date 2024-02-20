<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="省份设置" :toggle="false" defaultOpen>
      <g-field label="当前省份">
        <g-select v-model="config.province" :data="provinceList" inline @change="changePro" />
      </g-field>
      <g-field label="当前城市">
        <g-select v-model="config.cityValue" :data="insideList" inline />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="区域样式" modal>
      <g-field label="填充颜色">
        <g-color-picker v-model="config.geo.itemStyle.areaColor"></g-color-picker>
      </g-field>
      <g-field label="边框样式" flat>
        <g-input-number
          v-model="config.geo.itemStyle.borderWidth"
          :min="0"
          :max="5"
          :step="1"
          label="粗细"
          inline
        ></g-input-number>
        <g-select
          v-model="config.geo.itemStyle.borderType"
          :data="LineStyleOptions"
          inline
          label="类型"
        />
        <g-color-picker v-model="config.geo.itemStyle.borderColor" label="颜色"></g-color-picker>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="区域悬浮" modal>
      <g-field label="填充颜色">
        <g-color-picker v-model="config.geo.emphasis.itemStyle.areaColor"></g-color-picker>
      </g-field>
      <g-field label="边框样式" flat>
        <g-input-number
          v-model="config.geo.emphasis.itemStyle.borderWidth"
          :min="0"
          :max="5"
          :step="1"
          label="粗细"
          inline
        ></g-input-number>
        <g-select
          v-model="config.geo.emphasis.itemStyle.borderType"
          :data="LineStyleOptions"
          inline
          label="类型"
        />
        <g-color-picker
          v-model="config.geo.emphasis.itemStyle.borderColor"
          label="颜色"
        ></g-color-picker>
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="文本标签" modal toggle v-model="config.geo.label.show">
      <g-field label="位置">
        <g-select
          v-model="config.geo.label.position"
          :data="EchartsLabelPositionOptions"
        ></g-select>
      </g-field>
      <g-field label="文字" flat>
        <g-input-number
          v-model="config.geo.label.fontSize"
          :min="10"
          :max="24"
          inline
          :step="1"
          suffix="px"
          label="字体大小"
        ></g-input-number>
        <g-select
          v-model="config.geo.label.fontWeight"
          :data="FontWeightOptions"
          inline
          label="字体粗细"
        ></g-select>
        <g-color-picker v-model="config.geo.label.color" label="颜色"></g-color-picker>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  FontWeightOptions,
  EchartsLabelPositionOptions,
  LineStyleOptions,
} from '@/config/select-options'
import { insideList } from './useMap'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
// config 配置项
const config = computed(() => props.data.config)

const provinceList = [
  { label: '河北省', value: '河北省' },
  { label: '山西省', value: '山西省' },
  { label: '黑龙江省', value: '黑龙江省' },
  { label: '吉林省', value: '吉林省' },
  { label: '辽宁省', value: '辽宁省' },
  { label: '江苏省', value: '江苏省' },
  { label: '云南省', value: '云南省' },
  { label: '浙江省', value: '浙江省' },
  { label: '安徽省', value: '安徽省' },
  { label: '福建省', value: '福建省' },
  { label: '江西省', value: '江西省' },
  { label: '山东省', value: '山东省' },
  { label: '河南省', value: '河南省' },
  { label: '湖北省', value: '湖北省' },
  { label: '湖南省', value: '湖南省' },
  { label: '广东省', value: '广东省' },
  { label: '海南省', value: '海南省' },
  { label: '四川省', value: '四川省' },
  { label: '贵州省', value: '贵州省' },
  { label: '陕西省', value: '陕西省' },
  { label: '甘肃省', value: '甘肃省' },
  { label: '青海省', value: '青海省' },
  { label: '台湾省', value: '台湾省' },
  { label: '内蒙古自治区', value: '内蒙古自治区' },
  { label: '广西壮族自治区', value: '广西壮族自治区' },
  { label: '西藏自治区', value: '西藏自治区' },
  { label: '宁夏回族自治区', value: '宁夏回族自治区' },
  { label: '新疆维吾尔族自治区', value: '新疆维吾尔族自治区' },
  { label: '北京市', value: '北京市' },
  { label: '天津市', value: '天津市' },
  { label: '上海市', value: '上海市' },
  { label: '重庆市', value: '重庆市' },
  { label: '香港特别行政区', value: '香港特别行政区' },
  { label: '澳门特别行政区', value: '澳门特别行政区' },
]

function changePro() {
  config.value.cityValue = ''
}
</script>
