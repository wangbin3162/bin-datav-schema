<template>
  <b-popover
    v-model:visible="visible"
    :placement="placement"
    trigger="click"
    :width="288"
    :show-arrow="false"
    :offset="3"
    popper-class="g-select-image-popover"
  >
    <div class="dv-gui g-select-image-wrap">
      <div class="dv-gui g-select-image">
        <div class="g-select-image-selection">
          <div class="g-select-image-selection__inner">
            <div class="g-select-image-selected-wrap">
              <img v-if="selectedImg.src" :src="selectedImg.src" class="g-select-image-img">
              <span :class="{'no-name':!selectedImg.src}">{{ selectedImg.name || '可选择' }}</span>
            </div>
          </div>
          <span class="g-select-image-arrow">
              <i class="b-iconfont b-icon-down"></i>
            </span>
        </div>
      </div>
    </div>
    <template #content>
      <div class="g-select-image-dropdown-menu-wrap">
        <ul class="g-select-image-tabs" v-if="images.length>1">
          <li
            class="tab-item"
            v-for="item in images"
            :class="{active:item===activeTab}"
            :key="item"
            @click="activeTab=item"
          >{{ imagesTitleMap[item] }}
          </li>
        </ul>
        <ul class="g-select-image-dropdown-menu">
          <li
            v-for="(img,index) in currentImages"
            :key="index"
            class="g-select-image-dropdown-menu-item"
          >
            <div class="image-item" @click="onSelectImg(img)">
              <img :src="img.src" class="g-select-image-img">
              <span>{{ img.name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </b-popover>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { bgImages } from '@/components/Schema/images-cfg/bg'
import { boxImages } from '@/components/Schema/images-cfg/box'
import { decorationImages } from '@/components/Schema/images-cfg/decoration'
import { headerImages } from '@/components/Schema/images-cfg/header'
import { widgetImages } from '@/components/Schema/images-cfg/widget'

const imagesMap = {
  bg: bgImages,
  box: boxImages,
  decoration: decorationImages,
  header: headerImages,
  widget: widgetImages,
}
const allImages = [
  ...bgImages,
  ...boxImages,
  ...decorationImages,
  ...headerImages,
  ...widgetImages,
]
const imagesTitleMap = {
  bg: '背景',
  box: '边框',
  decoration: '装饰',
  header: '头部',
  widget: '部件',
}

export default {
  name: 'GImagesSelect',
  props: {
    modelValue: {  // 存储的就是src图片名称
      type: String,
      default: '',
    },
    images: { // 图片预设分类，至少为一个
      type: Array,
      default: () => ['bg', 'box', 'decoration', 'header', 'widget'],
    },
    placement: {
      type: String,
      default: 'left',
    },
    valueKey: {
      type: String,
      default: 'id',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const visible = ref(false)
    const activeTab = ref('')

    const currentImages = computed(() => imagesMap[activeTab.value] || [])

    const selectedImg = computed(() => allImages.find(m => m[props.valueKey] === props.modelValue) || {})

    const onSelectImg = (img) => {
      visible.value = false
      ctx.emit('update:modelValue', img[props.valueKey])
      ctx.emit('change', img)
    }

    watch(() => visible.value, v => {
      if (v) {
        activeTab.value = props.images[0]
      }
    })

    return {
      imagesMap,
      imagesTitleMap,
      visible,
      activeTab,
      currentImages,
      selectedImg,
      onSelectImg,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-select-image-wrap {
    width: 100%;
    margin-bottom: 4px;
  }
  .g-select-image {
    width: 100%;
    height: 68px;
    padding: 5px;
    padding-right: 0;
    background: #262c33;
    border: 1px solid #0b0c0d;
    font-size: 12px;
    color: #fff;
    outline: none;
    box-shadow: none;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    line-height: 28px;
    &:hover {
      border-color: var(--bin-color-primary);
    }
    .g-select-image-selection {
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      display: block;
      border-radius: 6px;
      position: relative;
      width: 100%;
      height: 100%;
      padding-right: 16px;
      font-size: 12px;
      color: #fff;
      outline: none;
      box-shadow: none;
      background: transparent;
      user-select: none;
    }
    .g-select-image-selection__inner {
      height: 100%;
      width: 100%;
      line-height: 100%;
      margin-left: 0;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .g-select-image-selected-wrap {
      width: 100%;
      display: flex !important;
      flex-wrap: nowrap;
      align-items: center;
      position: relative;
      pointer-events: none;
      left: 0;
      top: 0;
      opacity: 1;
      .g-select-image-img {
        height: 54px;
        width: 50%;
        display: inline-flex;
        object-fit: contain;
      }
      > span {
        padding-left: 5px;
        flex: 1;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        line-height: 24px;
        &.no-name {
          opacity: 0.5;
        }
      }
    }
    .g-select-image-arrow {
      width: auto;
      top: 13px;
      height: 26px;
      position: absolute;
      right: 5px;
      outline: 0;
      user-select: none;
    }
  }
}
</style>

<style lang="stylus">
.bin-popover.g-select-image-popover {
  box-shadow: none;
  background: #262c33;
  overflow: hidden;
  border: 1px solid #0b0c0d;
  border-radius: 0;
  .g-select-image-dropdown-menu-wrap {
    .g-select-image-tabs {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #0b0c0d;
      .tab-item {
        flex: auto;
        text-align: center;
        line-height 22px;
        padding: 4px 8px 5px;
        cursor: pointer;
        &:hover {
          color: var(--bin-color-primary);
        }
        &.active {
          color: var(--bin-color-primary);
          position: relative;
          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: var(--bin-color-primary);
          }
        }
      }
    }
    .g-select-image-dropdown-menu {
      display: flex;
      flex-wrap: wrap;
      padding-right: 8px;
      padding-top: 4px;
      max-height: 380px;
      overflow-y: auto;
      .g-select-image-dropdown-menu-item {
        box-sizing: border-box;
        width: 50%;
        height: 86px;
        padding: 8px 0 0 8px;
        background: transparent;
        .image-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
          line-height: 24px;
          font-size: 12px;
          color: #a1aeb3;
          cursor: pointer;
        }
        .g-select-image-img {
          width: 100%;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid transparent;
          object-fit: contain;
        }
        > span {
          width: 100%;
          height: 16px;
          line-height: 16px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
        }
      }
    }
  }
}
</style>
