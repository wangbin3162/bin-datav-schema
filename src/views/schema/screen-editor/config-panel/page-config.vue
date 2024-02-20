<template>
  <div class="page-config-panel">
    <div class="page-config-top">
      <b-radio-group v-model="curTabIndex" size="large" type="capsule" style="width: 100%">
        <b-radio :label="0">
          <span class="mr-16">基础配置</span>
          <b-icon name="desktop"></b-icon>
        </b-radio>
        <b-radio :label="1">
          <span class="mr-16">脚本配置</span>
          <b-icon name="code"></b-icon>
        </b-radio>
      </b-radio-group>
    </div>
    <div class="page-config-content">
      <b-scrollbar>
        <div v-if="curTabIndex === 0">
          <div class="page-config-wp">
            <g-field label="屏幕设置" style="padding-bottom: 8px; padding-top: 8px">
              <g-group-select v-model="screenLabel" :data="pageMap" @change="sizeChange" />
            </g-field>
            <g-field label="屏幕大小" flat>
              <g-input-number
                v-model="pageConfig.width"
                label="宽度"
                :min="375"
                :max="3840"
                inline
                suffix="px"
                @change="onSizeChange"
              />
              <g-input-number
                v-model="pageConfig.height"
                label="高度"
                :min="600"
                :max="2160"
                inline
                suffix="px"
                @change="onSizeChange"
              />
            </g-field>

            <g-field label="背景图片" tooltip="可以加载对应预设的图片背景">
              <g-image
                :ignore-group-keys="['header', 'box', 'decoration', 'widget']"
                :show-resize="false"
                show-clear
                @clear="resetBGImage"
                v-model="pageConfig.bgImage"
              />
            </g-field>
            <g-field label="背景颜色">
              <g-color-picker v-model="pageConfig.bgColor" />
            </g-field>
            <g-field label="缩略图" tooltip="截取当前画布存为缩略图">
              <div class="image-thumb-wrap">
                <img v-if="pageConfig.thumbnail" :src="pageConfig.thumbnail" alt="" />
                <div v-else class="tip" flex="dir:top main:center cross:center">
                  <b-icon name="image" size="52"></b-icon>
                  <p>暂未截取缩略图</p>
                </div>
              </div>
              <div class="pt-8">
                <b-button type="primary" size="small" :loading="thumbLoading" @click="createThumb">
                  截取
                </b-button>
                <b-button size="small" :loading="thumbLoading" @click="pageConfig.thumbnail = ''">
                  清除
                </b-button>
              </div>
            </g-field>
          </div>
          <GlobalTheme />
          <div class="page-config-wp mt-16">
            <g-field-collapse label="滤镜" toggle v-model="data.filterShow">
              <g-field label="色相">
                <g-slider
                  v-model="data.hueRotate"
                  :step="3"
                  :min="0"
                  :max="360"
                  :label="`值：${data.hueRotate}deg`"
                  :show-input="false"
                  style="margin-bottom: 0"
                />
                <div class="preset-filter-box">
                  <div
                    class="pre-desc"
                    style="
                      display: flex;
                      flex-flow: wrap;
                      justify-content: space-between;
                      align-items: center;
                      height: 20px;
                      width: 50px;
                    "
                  >
                    <div style="width: 24px; height: 20px; line-height: 20px; font-size: 12px">
                      底色
                    </div>

                    <div :style="{ backgroundColor: hueRotateColor }"></div>
                  </div>
                  <div class="preset-filter">
                    <div
                      class="item"
                      style="filter: hue-rotate(36deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 36"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(72deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 72"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(108deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 108"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(144deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 144"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(180deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 180"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(216deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 216"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(252deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 252"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(288deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 288"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(324deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 324"
                    ></div>
                    <div
                      class="item"
                      style="filter: hue-rotate(360deg)"
                      :style="{ backgroundColor: hueRotateColor }"
                      @click="data.hueRotate = 360"
                    ></div>
                  </div>
                </div>
              </g-field>
              <g-field label="饱和度">
                <g-slider
                  v-model="data.saturate"
                  :step="0.1"
                  :min="0"
                  :max="2"
                  :label="`值：${(parseFloat(data.saturate) * 100).toFixed(0)}%`"
                  :show-input="false"
                />
              </g-field>
              <g-field label="对比度">
                <g-slider
                  v-model="data.contrast"
                  :step="0.1"
                  :min="0"
                  :max="2"
                  :label="`值：${(parseFloat(data.contrast) * 100).toFixed(0)}%`"
                  :show-input="false"
                />
              </g-field>
              <g-field label="亮度">
                <g-slider
                  v-model="data.brightness"
                  :step="0.1"
                  :min="0"
                  :max="2"
                  :label="`值：${(parseFloat(data.brightness) * 100).toFixed(0)}%`"
                  :show-input="false"
                />
              </g-field>
              <g-field label="透明">
                <g-slider
                  v-model="data.opacity"
                  :min="0"
                  :max="1"
                  :step="0.05"
                  :label="`值：${(parseFloat(data.opacity) * 100).toFixed(0)}%`"
                  :show-input="false"
                />
              </g-field>
              <g-field label="混合">
                <g-select v-model="data.blendMode" :data="BlendModeOptions" />
              </g-field>
            </g-field-collapse>
          </div>
        </div>
        <div v-if="curTabIndex === 1" class="page-config-wp">
          <ScriptConfig :pageConfig="pageConfig" :paramsDesc="paramsDesc" :exampleDesc="exampleDesc" />
        </div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { mobileScreenMap, webScreenMap } from '@/config/enum'
import { ref, watch, computed } from 'vue'
import { createPreviewThumb } from '@/hooks/usePreviewImg'
import { Message } from 'bin-ui-design'
import { setGlobalLoading } from '@/hooks/schema/useGlobalLoading'
import { BlendModeOptions } from '@/config/select-options'
import { hueRotateColor, GlobalTheme } from '@/theme'
import { useParamsDesc } from '@/components/Common/CustomScripts/customScriptsUtil'
import ScriptConfig from '@/views/schema/screen-editor/config-panel/script-panel/index.vue'

defineOptions({
  name: 'PageConfig',
})

const { schemaStore, storeToRefs } = useStore()
const { pageConfig, comps } = storeToRefs(schemaStore)
const { paramsDesc, exampleDesc } = useParamsDesc(comps.value)

const pageMap = [
  {
    group: 'web端',
    data: webScreenMap.map(i => ({ value: `${i.width}x${i.height}`, label: i.label })),
  },
  {
    group: '移动设备',
    data: mobileScreenMap.map(i => ({ value: `${i.width}x${i.height}`, label: i.label })),
  },
  { group: '其他', data: [{ value: 'custom', label: '自定义' }] },
]

// tab切换
const curTabIndex = ref(0)
const screenLabel = ref('')
const thumbLoading = ref(false)

const data = computed({
  get: () => pageConfig.value.styles,
  set: val => (pageConfig.value.styles = val),
})

const resetBGImage = () => {
  pageConfig.value.bgColor = '#0d2a42'
  pageConfig.value.bgImage = ''
}

const onSizeChange = () => schemaStore.autoCanvasScale()

const sizeChange = value => {
  if (value !== 'custom') {
    const val = value.split('x')
    const width = +val[0]
    const height = +val[1]
    schemaStore.setScreenSize({ width, height })
  }
}

// 截屏操作
async function createThumb() {
  setGlobalLoading(true)
  Message.warning('正在截取画布缩略图，请勿进行其他操作！')

  thumbLoading.value = true
  const pageEl = document.getElementById('canvas-components')
  try {
    // 截取缩略图
    const thumb = await createPreviewThumb(pageEl)
    pageConfig.value.thumbnail = thumb
    Message.success('截取缩略图成功！')
  } catch (error) {
    console.log(error)
  }
  thumbLoading.value = false
  setGlobalLoading(false)
}

watch(
  [() => pageConfig.value.width, () => pageConfig.value.height],
  () => {
    const { width, height } = pageConfig.value
    if (
      (width === 1920 && height === 1080) ||
      (width === 2560 && height === 1080) ||
      (width === 3440 && height === 1080) ||
      (width === 3440 && height === 1440) ||
      (width === 414 && height === 736) ||
      (width === 375 && height === 667) ||
      (width === 375 && height === 812)
    ) {
      screenLabel.value = `${width}x${height}`
    } else {
      screenLabel.value = 'custom'
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.page-config-panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .page-config-top {
    width: 100%;
    height: 56px;
    padding: 10px;
  }

  .page-config-content {
    overflow: hidden;
    height: calc(100% - 60px);
  }
}
.page-config-wp {
  position: relative;
  padding: 0 10px;
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    height: 1px;
    background: var(--s-border-color);
  }
  .image-thumb-wrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 140px;
    background: var(--schema-color-bg-2);
    border: 1px solid var(--s-border-color);
    border-radius: var(--bin-border-radius-default);
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.preset-filter-box {
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  .pre-desc {
    position: absolute;
    right: 0;
    top: -20px;
    div {
      width: 20px;
      height: 12px;
      border-radius: 2px;
    }
  }
  .preset-filter {
    display: grid;
    grid-template-columns: repeat(10, 10%);
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;
    margin-top: 4px;
    height: 10px;
    width: 100%;
    .item {
      height: 100%;
    }
  }
}
</style>
