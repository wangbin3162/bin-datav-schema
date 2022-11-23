<template>
  <div class="dv-gui g-upload">
    <b-upload
      action=""
      :before-upload="beforeUpload"
      :show-upload-list="false"
      multiple
      type="drag"
    >
      <div class="g-upload-image-wrap">
        <b-icon name="plus"></b-icon>
      </div>
    </b-upload>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { validAllowImg } from './utils'
import { readFileBase64 } from '@/utils/file-helper'

export default {
  name: 'g-upload',
  props: {
    allowType: {
      type: String,
      default: 'jpeg|jpg|png|svg|gif',
    },
    size: {
      // 限制大小2m
      type: Number,
      default: 2,
    },
    prefixIcon: {
      type: String,
      default: 'link',
    },
  },
  emits: ['upload'],
  setup(props, { emit }) {
    const loading = ref(false)
    const visibleCover = ref(false)

    const uploadList = ref([])
    let timer = null
    let start = false // 是否开始选中
    let index = 0

    const beforeUpload = file => {
      // 第一个文件 传入时 开启计时器记录时间阈值
      updateDateTime()
      const valid = validAllowImg(file, {
        allowType: props.allowType,
        allowSize: props.size,
      })
      if (!valid) return false
      readFileBase64(file).then(data => {
        const image = new Image()
        image.src = data
        image.onload = () => {
          uploadList.value.push({
            fileName: file.name,
            width: image.width,
            height: image.height,
            fileRaw: image.src,
          })
        }
      })
      return false
    }

    function updateDateTime() {
      // 第一个文件 传入时 开启计时器记录时间阈值
      if (!start && !timer) {
        start = true
        timer = setInterval(() => {
          index++
          // 停止计时器
          if (index === 5) {
            clearTimeout(timer)
            index = 0
            timer = null
            start = false
            emit('upload', uploadList.value)
            uploadList.value = []
            return
          }
        }, 100)
      } else {
        index = 0
      }
    }

    const clearDateTime = () => {
      if (timer) clearTimeout(timer)
    }
    onUnmounted(() => {
      clearDateTime()
    })
    return {
      loading,
      visibleCover,
      beforeUpload,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-upload {
    width: 100%;
    height: 100%;
    :deep(.bin-upload) {
      width: 100%;
      height: 100%;
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
