<template>
  <div class="group-comps">
    <div class="comp-wrap">
      <div class="comp-item img-add" v-if="canEdit">
        <div class="inner">
          <div class="comp-item-img">
            <g-upload @upload="imageUpload" multiple v-if="!uploadLoading"></g-upload>
            <g-loading v-else spinning></g-loading>
          </div>
        </div>
      </div>
      <div class="comp-item" v-for="(com, index) in list" :key="index">
        <div class="inner">
          <div
            class="comp-item-img"
            :class="{ 'can-edit': canEdit }"
            :draggable="true"
            @dragstart="dragStart($event, com)"
            @click="click(com)"
          >
            <img v-lazy="com.url ? com.url : com.src" v-if="!listLoading" />
            <img v-lazy="com.url ? com.url : com.src" v-else />
            <div class="hover-layer" v-if="canEdit">
              <i
                class="b-iconfont b-icon-delete-fill"
                title="删除图片"
                @click.stop="removePic(com)"
              ></i>
            </div>
          </div>
          <div class="comp-item-text" :title="JSON.stringify(com, null, 2)">{{ com.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as api from '@/api/images/images.api'
import { defaultGroupKeys } from '@/api/images/default'
import { throwError } from '@/utils/util'
import { MessageBox } from "bin-ui-design"

const emit = defineEmits(['dragstart', 'click'])
const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
})

const list = ref([])
const canEdit = computed(() => !defaultGroupKeys.includes(props.groupId))
const uploadLoading = ref(false)
const listLoading = ref(false)
// 获取组件库
async function getCompList() {
  listLoading.value = true
  try {
    list.value = await api.getImagesByGroup(props.groupId)
  } catch (e) {
    throwError(e)
  }
  listLoading.value = false
}

getCompList()

// 上传拦截
async function imageUpload(files) {
  uploadLoading.value = true
  try {
    // TODO: 这里需要组装需要的对象，后续需要调用接口进行实际上传
    const imgs = files.map(file => ({
      groupKey: props.groupId,
      name: file.name,
      attr: { w: file.width, h: file.height },
      file: file.file,
    }))
    for (let i = 0; i < imgs.length; i++) {
      await api.uploadImagesToGroup(imgs[i])
    }
    getCompList()
  } catch (error) {
    console.log(error)
  }
  uploadLoading.value = false
}

// 移除一个图片
async function removePic({ id }) {
  MessageBox.confirm({
    type: 'warning',
    title: '提示',
    message: '是否删除当前图片？',
  }).then(async () => {
    await api.removeImage(id)
    getCompList()
  }).catch((error) => {
    console.log(error)
  })
}

const dragStart = (e, comp) => emit('dragstart', e, comp)
const click = comp => emit('click', comp)
</script>

<style scoped>
.comp-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 4px;
}
.comp-item {
  width: 50%;
  vertical-align: top;
  user-select: none;
  margin-bottom: 4px;
  padding: 0 4px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .comp-item-text {
    font-size: 12px;
    padding: 0 5px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 22px;
  }
  .comp-item-img {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 72px;
    padding: 2px;
    border-radius: 2px;
    transition: border-color 0.2s;
    border: 1px dashed var(--s-border-color-2);
    cursor: url('@/assets/images/schema/cursor-move.png') 4 4, auto;
    > img {
      min-width: 1px;
      min-height: 1px;
      max-width: 100%;
      max-height: 100%;
    }
    .hover-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(33, 33, 37, 0.7);
      display: none;
      > i {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #fff;
      }
    }
    &:hover {
      border-color: var(--bin-color-primary-light2);
      background: #2a292f;
      .hover-layer {
        display: block;
      }
    }
  }
}
</style>
