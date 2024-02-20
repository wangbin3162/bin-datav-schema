<template>
  <div class="setting-panel-gui">
    <ChartGlobalConfig :data="data">
      <g-field label="柱子宽度" tooltip="不设时自适应，可以是绝对值像素或百分比。">
        <g-input v-model="config.global.barWidth" />
      </g-field>
      <g-field label="圆角大小" flat>
        <g-input-number
          v-model="config.global.itemStyle.borderRadius[0]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左上"
        />
        <g-input-number
          v-model="config.global.itemStyle.borderRadius[1]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右上"
        />
        <g-input-number
          v-model="config.global.itemStyle.borderRadius[3]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="左下"
        />
        <g-input-number
          v-model="config.global.itemStyle.borderRadius[2]"
          :min="0"
          :max="300"
          :step="1"
          suffix="px"
          inline
          label="右下"
        />
      </g-field>
      <g-field label="柱间距" flat>
        <g-input-number
          v-model="config.global.barGap"
          :min="-100"
          :max="100"
          :step="1"
          suffix="%"
          inline
          label="不同系列"
        />
        <g-input-number
          v-model="config.global.barCategoryGap"
          :min="-100"
          :max="100"
          :step="1"
          suffix="%"
          inline
          label="同一系列"
        />
      </g-field>
      <g-field label="背景" flat>
        <g-switch v-model="config.global.showBackground" inline label="展示" />
        <g-color-picker v-model="config.global.backgroundStyle.color" inline label="背景颜色" />
      </g-field>
      <g-field label="填充类型">
        <b-radio-group v-model="config.global.itemStyle.type" type="button" size="small">
          <b-radio v-for="em in FillTypeOptions" :key="em.value" :label="em.value">
            {{ em.label }}
          </b-radio>
        </b-radio-group>
      </g-field>
      <g-field label="渐变透明" flat v-if="config.global.itemStyle.type === 'gradient'">
        <g-input-number
          v-model="config.global.itemStyle.from"
          :min="0"
          :max="100"
          :step="1"
          suffix="%"
          inline
          label="开始"
        />
        <g-input-number
          v-model="config.global.itemStyle.to"
          :min="0"
          :max="100"
          :step="1"
          suffix="%"
          inline
          label="结束"
        />
      </g-field>
    </ChartGlobalConfig>

    <ChartGridConfig :data="data" />

    <ChartLegendConfig :data="data" />

    <ChartTooltipConfig :data="data" />

    <ChartXAxisConfig :data="data" />

    <ChartYAxisConfig :data="data" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { FillTypeOptions } from '@/config/select-options'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const config = computed(() => props.data.config)
</script>
