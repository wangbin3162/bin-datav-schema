<template>
  <div class="setting-panel-gui">
    <g-field-collapse label="全局" modal>
      <g-field
        label="字体"
        tooltip="请选择您系统有的字体，如果您系统无此字体，标题将会显示默认字体"
      >
        <g-select v-model="config.global.fontFamily" :data="fontFamilys" />
      </g-field>
      <g-field label="文字颜色">
        <g-color-picker v-model="config.global.fontColor" />
      </g-field>

      <g-field label="边距" flat>
        <g-input-number
          v-model="config.global.margin.top"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="顶部"
        />
        <g-input-number
          v-model="config.global.margin.bottom"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="底部"
        />
        <g-input-number
          v-model="config.global.margin.left"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左侧"
        />
        <g-input-number
          v-model="config.global.margin.right"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右侧"
        />
      </g-field>
    </g-field-collapse>

    <g-field-collapse label="柱形设置" modal>
      <g-field label="圆角大小" flat>
        <g-input-number
          v-model="config.global.borderRadius[0]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左上"
        />
        <g-input-number
          v-model="config.global.borderRadius[1]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右上"
        />
        <g-input-number
          v-model="config.global.borderRadius[2]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右下"
        />
        <g-input-number
          v-model="config.global.borderRadius[3]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左下"
        />
      </g-field>
      <g-field label="柱子高度">
        <g-input-number
          v-model="config.global.barHeight"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field label="柱子间距">
        <g-input-number
          v-model="config.global.barMargin"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
        />
      </g-field>
      <g-field label="背景颜色">
        <g-color-picker v-model="config.global.barBg" />
      </g-field>
      <g-field label="柱子阴影" flat>
        <g-input v-model="config.global.shadow" inline label="阴影偏移" />
        <g-color-picker v-model="config.global.shadowColor" inline label="阴影颜色" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="标签" modal toggle v-model="config.label.show">
      <g-field label="显示位置">
        <b-radio-group v-model="config.label.position" type="button" size="mini">
          <b-radio label="default">默认</b-radio>
          <b-radio label="right">右侧</b-radio>
          <b-radio label="inner">内部</b-radio>
        </b-radio-group>
      </g-field>
      <g-field label="文本颜色">
        <g-color-picker v-model="config.label.color" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="X轴" modal toggle v-model="config.xAxis.show">
      <g-field label="标题单位">
        <g-input v-model="config.global.unit" />
      </g-field>
      <g-field label="文本颜色">
        <g-color-picker v-model="config.xAxis.color" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="Y轴" modal toggle v-model="config.yAxis.show">
      <g-field label="文本颜色">
        <g-color-picker v-model="config.yAxis.color" />
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
import { fontFamilys } from '@/config/select-options'
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)
</script>
