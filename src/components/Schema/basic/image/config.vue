<template>
  <div class="setting-panel-gui">
    <g-field label="图片类型">
      <b-radio-group v-model="config.imageType" type="button" size="mini">
        <b-radio v-for="item in imageTypes" :key="item.value" :label="item.value">
          {{ item.label }}
        </b-radio>
      </b-radio-group>
    </g-field>
    <g-field label="原图">
      <g-image v-model="config.src" />
      <b-icon name="undo" type="button" title="恢复默认图片尺寸" @click="resetSize"></b-icon>
    </g-field>

    <template v-if="config.imageType === 'image'">
      <g-field label="圆角">
        <g-input-number v-model="config.radius" :min="0" :step="1" suffix="px" />
      </g-field>
      <g-field label="图片位置" :tooltip="positionTip">
        <g-input v-model="config.position" />
      </g-field>
      <g-field label="图片大小" :tooltip="sizeTip">
        <g-input v-model="config.size" />
      </g-field>
      <g-field label="图片重复">
        <g-select v-model="config.repeat" :data="repeatTypes" />
      </g-field>
    </template>
    <template v-else>
      <g-field label="宽度" :tooltip="borderWidthTip">
        <g-input v-model="config.border.width" />
      </g-field>
      <g-field label="切片" :tooltip="borderSliceTip">
        <g-input v-model="config.border.slice" />
      </g-field>
      <g-field label="外扩" :tooltip="borderOutsetTip">
        <g-input v-model="config.border.outset" />
      </g-field>
      <g-field label="平铺类型" :tooltip="borderRepeatTip">
        <g-select v-model="config.border.repeat" :data="borderRepeatTypes" />
      </g-field>
    </template>

    <g-field-collapse v-model="config.shadow.show" toggle label="阴影">
      <g-field label="阴影属性" :tooltip="shadowTip">
        <g-input v-model="config.shadow.size" />
      </g-field>
      <g-field label="阴影颜色">
        <g-color-picker v-model="config.shadow.color" />
      </g-field>
    </g-field-collapse>
    <g-field-collapse label="超链接配置">
      <g-field label="超链接" tooltip="点击标题区域可跳转至设定的超链接">
        <g-input v-model="config.urlConfig.url" placeholder="图片position，默认0 0" />
      </g-field>
      <g-field label="新窗口打开">
        <div class="pt-5">
          <b-switch v-model="config.urlConfig.isBlank" size="small" />
        </div>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { repeatTypes } from './config'
import { useStore } from '@/store'
import { imageTypes, borderRepeatTypes } from './config'
import {
  positionTip,
  sizeTip,
  shadowTip,
  borderSliceTip,
  borderOutsetTip,
  borderWidthTip,
  borderRepeatTip,
} from './tip'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const config = computed(() => props.data.config)
const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)

const imageChange = img => {
  if (img.attr) {
    selectedCom.value.attr.w = img.attr.w
    selectedCom.value.attr.h = img.attr.h
  }
}

// 恢复图片默认尺寸，如有的话
function resetSize() {
  const oldSize = selectedCom.value.config.attr // 从默认配置重取得attr
  if (oldSize) {
    if (oldSize.w) selectedCom.value.attr.w = oldSize.w
    if (oldSize.h) selectedCom.value.attr.h = oldSize.h
  }
}
</script>
