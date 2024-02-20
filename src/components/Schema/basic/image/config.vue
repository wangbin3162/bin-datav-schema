<template>
  <div class="setting-panel-gui">
    <g-field-collapse label=" 属性" default-open>
      <g-field label="图片类型">
        <b-radio-group v-model="config.imageType" type="button" size="small">
          <b-radio v-for="item in ImageTypeOptions" :key="item.value" :label="item.value">
            {{ item.label }}
          </b-radio>
        </b-radio-group>
      </g-field>
      <g-field label="图片">
        <g-image v-model="config.src" @resize="resetSize" @change="imageChange" />
      </g-field>

      <template v-if="config.imageType === 'image'">
        <g-field label="圆角">
          <g-input-number v-model="config.radius" :min="0" :step="1" suffix="px" />
        </g-field>
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
          <g-select v-model="config.border.repeat" :data="BorderRepeatOptions" />
        </g-field>
      </template>
    </g-field-collapse>

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
        <g-input v-model="config.urlConfig.url" />
      </g-field>
      <g-field label="新窗口打开">
        <g-switch v-model="config.urlConfig.isBlank" size="small" />
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RepeatTypeOptions } from './config'
import { useStore } from '@/store'
import { ImageTypeOptions, ImageSizeOptions, BorderRepeatOptions } from './config'
import {
  positionTip,
  sizeTip,
  shadowTip,
  borderSliceTip,
  borderOutsetTip,
  borderWidthTip,
  borderRepeatTip,
} from './tip'
import { typeOf } from '@/utils/util'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const config = computed(() => props.data.config)
const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)

function imageChange(img) {
  const curCom = selectedCom.value

  // 初始化
  curCom.config.imageType = 'image'
  curCom.config.size = '100% 100%'
  curCom.config.position = '0 0'
  // 如果图片的原始大小存在，则进行结构赋值
  if (img.attr) {
    let w = 100
    let h = 100
    if (typeOf(img.attr) === 'string') {
      try {
        const obj = JSON.parse(img.attr)
        w = obj.w
        h = obj.h
      } catch (error) {
        console.warn('attr 存储不是正确的json格式!')
      }
    } else if (typeOf(img.attr) === 'object') {
      w = img.attr.w
      h = img.attr.h
    }
    curCom.attr.w = w
    curCom.attr.h = h

    curCom.config.attr = { w, h }
  }
  if (img.css) {
    curCom.config.css = img.css ?? {}
    curCom.config.size = img.css.size ?? '100% 100%'
    curCom.config.position = img.css.position ?? '0 0'
  }
  // 如果是边框模式
  if (img.group === 'box' && img.border) {
    curCom.config.imageType = 'border'
    curCom.config.border = { ...img.border }
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
