<template>
  <div class="setting-panel-gui">
    <g-field-collapse label=" 属性" default-open>
      <g-field label="图片位置" :tooltip="positionTip">
        <g-input v-model="config.position" placeholder="图片position，默认0 0" />
      </g-field>
      <g-field label="图片大小" :tooltip="sizeTip" flat>
        <g-select v-model="config.size" :data="ImageSizeOptions" label="适配" />
        <g-input v-model="config.size" placeholder="图片size，默认100% 100%" label="自定义" />
      </g-field>
      <g-field label="图片重复">
        <g-select v-model="config.repeat" :data="RepeatTypeOptions" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RepeatTypeOptions, ImageSizeOptions } from '../../basic/image/config'
import { positionTip, sizeTip } from '../../basic/image/tip'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const config = computed(() => props.data.config)
</script>
