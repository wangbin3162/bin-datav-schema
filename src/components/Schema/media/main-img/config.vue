<template>
  <div class="setting-panel-gui">
    <g-field label="背景图" tooltip="支持图片地址、静态路径、base64存储">
      <g-upload-img v-model="config.backgroundImage" prefix-icon="image"></g-upload-img>
    </g-field>
    <g-field label="图片预设">
      <g-images-select v-model="config.backgroundImage" :images="mainImages" value-key="src" />
    </g-field>
    <g-field label="图片重复">
      <g-select v-model="config.repeat" :data="repeatTypes" />
    </g-field>
    <g-field label="圆角">
      <g-input-number
        v-model="config.radius"
        :min="0"
        :step="1"
        suffix="px"
      />
    </g-field>
    <g-field-collapse tooltip="点击标题区域可跳转至设定的超链接" label="超链接配置">
      <g-field label="超链接">
        <g-input v-model="config.urlConfig.url" />
      </g-field>
      <g-field label="新窗口打开">
        <div class="pt-5">
          <b-switch v-model="config.urlConfig.isBlank" size="small" />
        </div>
      </g-field>
    </g-field-collapse>
  </div>
</template>

<script>
import { toRef } from 'vue'
import { repeatTypes } from '@/config/select-options'
import { mainImages } from '@/components/Schema/media/main-img/config'

export default {
  name: 'VMainImgConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.data, 'config')

    return {
      config,
      repeatTypes,
      mainImages,
    }
  },
}
</script>
