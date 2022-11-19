<template>
  <div class="page-config-panel">
    <div class="page-config-top">页面设置</div>
    <div class="page-config-content">
      <b-scrollbar>
        <div class="page-config-wp">
          <g-field label="屏幕设置">
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

          <g-field label="背景颜色">
            <g-color-picker v-model="pageConfig.bgColor" />
          </g-field>
          <g-field label="背景图" tooltip="支持图片地址、静态路径、base64存储">
            <g-upload-img v-model="pageConfig.bgImage" />
          </g-field>
          <g-field label="背景预设" tooltip="可以加载对应预设的图片背景">
            <g-images-select v-model="pageConfig.bgImage" :images="['bg']" value-key="src" />
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
        <div class="page-config-wp">
          <g-field label="缩略图" tooltip="截取当前画布存为缩略图">
            <div class="image-thumb-wrap">
              <img v-if="pageConfig.thumbnail" :src="pageConfig.thumbnail" alt="" />
              <div v-else class="tip" flex="dir:top main:center cross:center">
                <b-icon name="image" size="52"></b-icon>
                <p>暂未截取缩略图</p>
              </div>
            </div>
            <div class="pt-5">
              <b-button type="primary" size="small" :loading="thumbLoading" @click="createThumb">
                截取
              </b-button>
              <b-button size="small" :loading="thumbLoading" @click="pageConfig.thumbnail = ''">
                清除
              </b-button>
            </div>
          </g-field>
        </div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { mobileScreenMap, webScreenMap } from '@/config/enum'
import { ref, watch } from 'vue'
import { createPreviewThumb } from '@/hooks/usePreviewImg'
import { Message } from 'bin-ui-next'

export default {
  name: 'page-config',
  setup() {
    const { schemaStore, storeToRefs } = useStore()
    const { pageConfig } = storeToRefs(schemaStore)
    const screenLabel = ref('')
    const thumbLoading = ref(false)

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
      Message.warning('正在截取画布缩略图，请勿进行其他操作！')

      thumbLoading.value = true
      const pageEl = document.getElementById('canvas-components')
      pageEl.style.top = 0
      pageEl.style.left = 0
      schemaStore.setCanvasScale(100)
      setTimeout(async () => {
        try {
          // 截取缩略图
          const thumb = await createPreviewThumb(pageEl)
          pageConfig.value.thumbnail = thumb
          Message.success('截取缩略图成功！')
        } catch (error) {
          console.log(error)
        }
        pageEl.style.top = '60px'
        pageEl.style.left = '60px'
        schemaStore.autoCanvasScale()
        thumbLoading.value = false
      }, 300)
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

    return {
      screenLabel,
      onSizeChange,
      resetBGImage,
      pageConfig,
      pageMap: [
        {
          group: 'web端',
          data: webScreenMap.map(i => ({ value: `${i.width}x${i.height}`, label: i.label })),
        },
        {
          group: '移动设备',
          data: mobileScreenMap.map(i => ({ value: `${i.width}x${i.height}`, label: i.label })),
        },
        { group: '其他', data: [{ value: 'custom', label: '自定义' }] },
      ],
      sizeChange,
      createPreviewThumb,
      createThumb,
      thumbLoading,
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
    bottom: 0;
    left: 6%;
    width: 91%;
    height: 1px;
    background: #262c33;
  }
  .image-thumb-wrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    margin-top: 5px;
    background: var(--schema-ui-bg);
    border: 1px solid var(--schema-ui-border);
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
