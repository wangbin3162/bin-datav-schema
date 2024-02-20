<template>
  <b-modal
    v-model="visible"
    title="选择图片"
    append-to-body
    top="60px"
    width="800px"
    custom-class="schema-modal"
  >
    <div class="images-modal-wrap">
      <div class="group-wrap">
        <b-scrollbar native>
          <div
            v-for="group in groups"
            :key="group.key"
            class="group-item t-ellipsis"
            :class="{ active: activeKey === group.key }"
            @click="changeGroup(group.key)"
          >
            {{ group.value }}
          </div>
        </b-scrollbar>
      </div>
      <div class="img-wrap">
        <b-scrollbar>
          <template v-if="!loading">
            <div class="img-inner">
              <div class="comp-item img-add" v-if="canEdit">
                <g-upload @upload="imageUpload" v-if="!uploadLoading"></g-upload>
                <g-loading v-else spinning></g-loading>
              </div>
              <div class="comp-item" v-for="(img, index) in list" :key="index" @click="setImg(img)">
                <img v-lazy="img.url ? img.url : img.src" :title="img.name" />
              </div>
            </div>
          </template>
          <g-loading v-else spinning></g-loading>
        </b-scrollbar>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getImagesGroup, getImagesByGroup, uploadImagesToGroup } from '@/api/images/images.api'
import { defaultGroupKeys, defaultGroup } from '@/api/images/default'

const emit = defineEmits(['update:modelValue', 'change', 'resize'])
const props = defineProps({
  modelValue: {
    // 存储的就是src图片名称
    type: String,
    default: '',
  },
  // 忽略组
  ignoreGroupKeys: {
    type: Array,
    default: () => [],
  },
})

const imgUrl = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const visible = ref(false)

const groups = ref([]) // 图片分组
const activeKey = ref('')

const list = ref([])
const loading = ref(false)
const uploadLoading = ref(false)

const canEdit = computed(() => !defaultGroupKeys.includes(activeKey.value))

// 加载对应列表
async function getImgsByGroup(groupKey) {
  try {
    loading.value = true
    list.value = await getImagesByGroup(groupKey)
  } catch (error) {
    console.log(error)
  }

  loading.value = false
}

// 更换分组
function changeGroup(groupKey) {
  activeKey.value = groupKey
  getImgsByGroup(groupKey)
}

// 设置图像
function setImg(img) {
  imgUrl.value = img.url ? img.url : img.src
  emit('change', img)
  visible.value = false
}

// 上传拦截
async function imageUpload(files) {
  uploadLoading.value = true
  try {
    // TODO: 这里需要组装需要的对象，后续需要调用接口进行实际上传
    const imgs = files.map(file => ({
      groupKey: activeKey.value,
      name: file.name,
      attr: { w: file.width, h: file.height },
      file: file.file,
    }))
    for (let i = 0; i < imgs.length; i++) {
      await uploadImagesToGroup(imgs[i])
    }
    await getImgsByGroup(activeKey.value)
    // 设置img
    setImg(list.value[0])
  } catch (error) {
    console.log(error)
  }
  uploadLoading.value = false
}

async function open() {
  try {
    visible.value = true
    const res = await getImagesGroup()
    groups.value = [...defaultGroup.filter(i => !props.ignoreGroupKeys.includes(i.key)), ...res]
    activeKey.value = groups.value[0]?.key
    await getImgsByGroup(activeKey.value)
  } catch (error) {
    console.log(error)
  }
}
defineExpose({ open })
</script>

<style scoped>
.images-modal-wrap {
  margin: -16px;
  height: 350px;
  display: flex;
  background: rgba(0, 0, 0, 0.45);
  .group-wrap {
    width: 180px;
    height: 100%;
    border-right: 1px solid var(--schema-color-border);
    background: rgba(255, 255, 255, 0.08);
    .group-item {
      cursor: pointer;
      display: flex;
      padding: 0 10px;
      font-size: 13px;
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid var(--s-border-color-2);
      color: var(--s-text-color-2);
      &:hover {
        color: rgba(255, 255, 255, 0.85);
        background: rgba(0, 0, 0, 0.25);
      }
      &.active {
        color: #fff;
        background: rgba(0, 0, 0, 0.25);
      }
      > span {
        margin: 0 4px;
      }
    }
  }
  .img-wrap {
    width: calc(100% - 180px);
    height: 100%;
    .img-inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 10px;
      gap: 8px;
    }
    .comp-item {
      position: relative;
      width: 78px;
      height: 78px;
      border-radius: 2px;
      border: 1px dashed rgba(255, 255, 255, 0.2);
      box-sizing: border-box;
      margin: 0;
      cursor: pointer;
      color: #fff;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
      }
      &:hover {
        border-color: var(--bin-color-primary);
      }
    }
  }
}
</style>
