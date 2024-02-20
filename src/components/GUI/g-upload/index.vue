<template>
  <div
    class="dv-gui g-upload"
    @click="handleClick"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <input
      ref="fileInputRef"
      type="file"
      class="custom-file-input"
      :multiple="multiple"
      :accept="allowType"
      @change="handleChange"
    />
    <slot>
      <div class="g-upload-image-wrap">
        <b-icon name="plus"></b-icon>
      </div>
    </slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validAllowImg } from './utils'
import { readFileBase64Img } from '@/utils/file-helper'

const emit = defineEmits(['upload'])
const props = defineProps({
  allowType: {
    type: String,
    default: 'jpeg|jpg|png|svg|gif',
  },
  size: {
    // 限制大小2m
    type: Number,
    default: 2,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const fileInputRef = ref(null)

function handleClick() {
  fileInputRef.value.click()
}

function handleChange(e) {
  const files = e.target.files

  if (!files) {
    return
  }
  uploadFiles(files)
  fileInputRef.value.value = null
}

function onDrop(e) {
  e.preventDefault()
  uploadFiles(e.dataTransfer.files)
}

function uploadFiles(files) {
  let postFiles = Array.prototype.slice.call(files)
  if (!props.multiple) postFiles = postFiles.slice(0, 1)

  const images = []
  postFiles.forEach(file => {
    const valid = validAllowImg(file, {
      allowType: props.allowType,
      allowSize: props.size,
    })
    if (valid) images.push(file)
  })

  uploadImages(images)
}

// 上传读取对象，这里会读取图片信息，并进行保存，外部接收之后可以做自定义操作
function uploadImages(images) {
  const reqs = images.map(file => readFileBase64Img(file))
  Promise.all(reqs).then(res => {
    emit('upload', res)
  })
}
</script>

<style scoped>
.dv-gui {
  &.g-upload {
    width: 100%;
    height: 100%;
    :deep(.bin-upload) {
      width: 100%;
      height: 100%;
    }
    .custom-file-input {
      display: none;
    }
    .g-upload-image-wrap {
      position: relative;
      cursor: pointer;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      > i {
        font-size: 28px;
      }
    }
  }
}
</style>
