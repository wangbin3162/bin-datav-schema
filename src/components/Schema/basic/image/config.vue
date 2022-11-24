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
      <b-icon name="undo" type="button" title="恢复默认图片尺寸" @click="resetSize"></b-icon>
    </g-field>
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
import { imageTypes } from './config'

const positionTip = `可取关键字或具体数值: [top|left|bottom|right|center|%|em|px];
两个值：一个定义 x 坐标，另一个定义 y 坐标;`

const sizeTip = `cover: 保持宽高比例缩放，超出部分会被剪裁;
contain: 缩放背景图装入容器，容易会留白;
一个值: 这个值指定图片的宽度，图片的高度隐式的为 auto ,可取%|em|px|auto;
两个个值: 第一个值指定图片的宽度，第二个值指定图片的高度  ,可取%|em|px|auto;`

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
