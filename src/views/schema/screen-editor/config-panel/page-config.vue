<template>
  <div class="page-config-panel">
    <div class="page-config-top">页面设置</div>
    <div class="page-config-content">
      <div class="page-config-wp">
        <g-field label="屏幕大小" flat>
          <g-input-number
            v-model="pageConfig.width"
            label="宽度"
            :min="1000"
            :max="3840"
            inline
            suffix="px"
            @change="onSizeChange"
          ></g-input-number>
          <g-input-number
            v-model="pageConfig.height"
            label="高度"
            :min="600"
            :max="2160"
            inline
            suffix="px"
            @change="onSizeChange"
          ></g-input-number>
        </g-field>
        <g-field label="背景颜色">
          <g-color-picker v-model="pageConfig.bgColor"></g-color-picker>
        </g-field>
        <g-field label="背景图" tooltip="支持图片地址、静态路径、base64存储">
          <g-upload-img v-model="pageConfig.bgImage"></g-upload-img>
        </g-field>
        <g-field label="背景预设" tooltip="可以加载对应预设的图片背景">
          <g-images-select v-model="pageConfig.bgImage" :images="backgroundImages" value-key="src" />
        </g-field>
        <g-field label="重置">
          <b-button type="primary" size="small" @click="resetBGImage">恢复默认背景</b-button>
        </g-field>
      </div>
      <div class="page-config-wp">
        <g-field label="栅格间距" tooltip="每次移动的距离，单位px">
          <g-input-number
            v-model="pageConfig.grid"
            :min="1"
            :max="20"
            suffix="px"
          ></g-input-number>
        </g-field>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { getBgPath } from '@/utils/env'
import { backgroundImages } from '@/components/Schema/media/config/background'

export default {
  name: 'page-config',
  setup() {
    const { pageConfig, autoCanvasScale } = useSchemaStore()

    const resetBGImage = () => {
      pageConfig.value.bgColor = '#0d2a42'
      pageConfig.value.bgImage = getBgPath('bg.png')
    }

    const onSizeChange = async () => {
      await autoCanvasScale()
    }
    return {
      onSizeChange,
      resetBGImage,
      backgroundImages,
      pageConfig,
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-config-wp {
  position: relative;
  &:not(:last-child)::after {
    content: "";
    position: absolute;
    bottom: 1px;
    left: 6%;
    width: 91%;
    height: 1px;
    background: #262c33;
  }
}
</style>
