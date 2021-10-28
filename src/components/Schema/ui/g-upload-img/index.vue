<template>
  <div class="dv-gui g-upload">
    <g-images
      :model-value="modelValue"
      :show-suffix="showSuffix"
      :suffix-title="suffixTitle"
      :static-path="staticPath"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :images="images"
      placeholder="请输入图片地址"
      @update:model-value="handleInput"
    ></g-images>
    <b-upload action="" :before-upload="handleUpload" :show-upload-list="false">
      <div
        class="g-upload-image-wrap"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <div class="g-upload-image-content">
          <img v-if="modelValue" :src="modelValue" alt="">
          <div v-else class="g-upload-tip" flex="dir:top main:center cross:center">
            <b-icon name="image" size="52"></b-icon>
            <p>点击或拖拽文件到这里更换</p>
          </div>
        </div>
        <div v-if="visibleCover" class="g-upload-image-cover">
          <span>更改</span>
          <p style="padding: 0 10px;">|</p>
          <span @click.stop="removeImage">删除</span>
        </div>
      </div>
    </b-upload>
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script>
import { ref } from 'vue'
import { validAllowImg } from './utils'
import { getPublicPath } from '@/utils/env'

export default {
  name: 'g-upload-img',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    allowType: {
      type: String,
      default: 'jpeg|jpg|png',
    },
    size: {  // 限制大小2m
      type: Number,
      default: 2,
    },
    label: {
      type: String,
      default: '',
    },
    showSuffix: {
      type: Boolean,
      default: false,
    },
    suffixTitle: {
      type: String,
      default: '预设',
    },
    prefixIcon: {
      type: String,
      default: 'link',
    },
    suffixIcon: {
      type: String,
      default: 'sketch',
    },
    staticPath: { // 图片上传或选择的路径地址
      type: String,
    },
    images: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const loading = ref(false)
    const visibleCover = ref(false)

    const handleUpload = (file) => {
      const valid = validAllowImg(file, {
        allowType: props.allowType,
        allowSize: props.size,
      })
      if (!valid) {
        return false
      }

      try {
        const reader = new FileReader()
        reader.readAsDataURL(file)      // 将图片转换为base64
        reader.onload = (res) => {
          const fileResult = res.target.result
          handleInput(fileResult)
        }
      } catch (e) {
        console.warn(e)
      }
      return false
    }

    const handleMouseEnter = () => {
      if (props.modelValue) {
        visibleCover.value = true
      }
    }

    const handleMouseLeave = () => {
      visibleCover.value = false
    }

    const handleInput = (value) => {
      ctx.emit('update:modelValue', value)
    }

    const handleCommand = (name) => {
      const path = getPublicPath(`/images/${name}`)
      handleInput(path)
    }

    const removeImage = () => {
      handleInput('')
      visibleCover.value = false
    }

    return {
      loading,
      visibleCover,
      handleUpload,
      handleMouseEnter,
      handleMouseLeave,
      handleCommand,
      removeImage,
      handleInput,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-upload {
    width: 100%;
    margin-bottom: 4px;
    :deep(.bin-upload) {
      width: 100%;
    }
    .g-upload-image-wrap {
      position: relative;
      cursor: pointer;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 120px;
      margin-top: 5px;
      background: var(--schema-ui-bg);
      border: 1px solid var(--schema-ui-border);
      &:hover {
        background: #303640;
        border: 1px solid var(--bin-color-primary);
      }
      .g-upload-image-content {
        width: 100%;
        height: 100%;
        padding: 8px;
        .g-upload-tip {
          width: 100%;
          padding-top: 4px;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        p {
          margin-top: 4px;
          color: #a1aeb3;
        }
      }

      .g-upload-image-cover {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #a1aeb3;
        span {
          cursor: pointer;
          &:hover {
            color: var(--bin-color-primary);
          }
        }
      }
    }
  }
}
</style>
