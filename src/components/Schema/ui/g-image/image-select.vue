<template>
  <b-modal
    v-model="visible"
    title="选择图片"
    append-to-body
    top="60px"
    width="720px"
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
        <b-scrollbar native>
          <template v-if="!loading">
            <div class="comp-item img-add" v-if="canEdit">
              <g-upload @upload="imageUpload"></g-upload>
            </div>
            <div class="comp-item" v-for="(img, index) in list" :key="index" @click="setImg(img)">
              <img :src="img.src" />
            </div>
          </template>
          <g-loading v-else spinning type="square"></g-loading>
        </b-scrollbar>
      </div>
    </div>
  </b-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getImagesGroup, getImagesByGroup, uploadImagesToGroup } from '@/api/images/images.api'
import { defaultGroupKeys } from '@/api/images/default'

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

const canEdit = computed(() => !defaultGroupKeys.includes(activeKey.value))

// 获取图片分组
getImagesGroup().then(res => {
  groups.value = res.filter(i => !props.ignoreGroupKeys.includes(i.key))
})

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
  imgUrl.value = img.src
  emit('change', img)
  visible.value = false
}

// 上传拦截
async function imageUpload(files) {
  try {
    // TODO: 这里需要组装需要的对象，后续需要调用接口进行实际上传
    const imgs = files.map(file => ({
      group: activeKey.value,
      name: file.name,
      attr: { w: file.width, h: file.height },
      src: file.image,
    }))
    await uploadImagesToGroup(imgs)
    // 设置img
    setImg(imgs[0])
  } catch (error) {
    console.log(error)
  }
}

function open() {
  visible.value = true
  activeKey.value = groups.value[0]?.key
  getImgsByGroup(activeKey.value)
}
defineExpose({ open })
</script>

<style scoped lang="stylus">
.images-modal-wrap {
  margin: -16px;
  height: 350px;
  display: flex;
  background: rgba(0,0,0,.45);
  .group-wrap {
    width: 180px;
    height: 100%;
    border-right: 1px solid #000;
    background: rgba(255,255,255,.08);
    .group-item {
      cursor: pointer;
      display: flex;
      padding: 0 10px;
      font-size: 13px;
      height: 36px;
      line-height: 36px;
      border-bottom: 1px solid rgba(255,255,255,.2);
      color: rgba(255,255,255,.65);
      &:hover {
        color: rgba(255,255,255,.85);
        background: rgba(0,0,0,.25);
      }
      &.active {
        color: #fff;
        background: rgba(0,0,0,.25);
      }
      > span {
        margin: 0 4px;
      }
    }
  }
  .img-wrap {
    width: calc(100% - 180px);
    height: 100%;
    .comp-item {
      position: relative;
      float: left;
      width: 78px;
      height: 78px;
      border-radius: 2px;
      border: 1px dashed rgba(255,255,255,.2);
      box-sizing: border-box;
      margin: 10px 0 0 10px;
      cursor: pointer;
      color: #fff;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 100%;
        max-height: 100%;
      }
      &:hover{
        border-color: #fff;
      }
    }
  }
}
</style>
