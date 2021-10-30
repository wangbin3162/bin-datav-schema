<template>
  <b-popover
    v-model:visible="visible"
    :placement="placement"
    trigger="click"
    :width="188"
    :show-arrow="false"
    transition=""
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
        <ul class="g-select-image-dropdown-menu">
          <template v-if="images && images.length > 0">
            <li
              v-for="(img,index) in images"
              :key="index"
              class="g-select-image-dropdown-menu-item"
              @click="onSelectImg(img)"
            >
              <img :src="img.src" class="g-select-image-img">
              <span>{{ img.name }}</span>
            </li>
          </template>
          <li v-else class="g-select-image-dropdown-menu-item --empty">
            <span>列表为空</span>
          </li>
        </ul>
      </div>
    </template>
  </b-popover>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'GImagesSelect',
  props: {
    modelValue: {  // 存储的就是src图片名称
      type: String,
      default: '',
    },
    images: {
      type: Array,
      default: () => [],
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
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const visible = ref(false)
    const selectedImg = computed(() => props.images.find(m => m[props.valueKey] === props.modelValue) || {})

    const onSelectImg = (img) => {
      visible.value = false
      ctx.emit('update:modelValue', img[props.valueKey])
    }

    return {
      visible,
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
  background: #111417;
  max-height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px solid var(--bin-color-primary);
  border-radius: 0;

  .g-select-image-dropdown-menu-wrap {
    .g-select-image-dropdown-menu {
      display: flex;
      flex-wrap: wrap;
      margin-right: 8px;
      margin-bottom: 8px;
      .g-select-image-dropdown-menu-item {
        box-sizing: border-box;
        width: 50%;
        height: 78px;
        padding: 8px 0 0 8px;
        background: transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow: hidden;
        line-height: 24px;
        font-size: 12px;
        color: #a1aeb3;
        cursor: pointer;
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
