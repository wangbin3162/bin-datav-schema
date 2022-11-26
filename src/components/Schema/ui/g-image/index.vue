<template>
  <div class="dv-gui g-select-image-wrap">
    <div class="g-img" :class="{ resize: showResize }" @click="openModal">
      <img v-if="imgUrl" :src="imgUrl" />
    </div>
    <div class="g-resize" v-if="showResize">
      <b-icon name="undo" type="button" title="恢复默认图片尺寸" @click="resetSize"></b-icon>
    </div>
  </div>
  <ImageSelect
    ref="modalRef"
    :ignore-group-keys="ignoreGroupKeys"
    v-model="imgUrl"
    @change="imageChange"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import ImageSelect from './image-select.vue'

const emit = defineEmits(['update:modelValue', 'change', 'resize'])
const props = defineProps({
  modelValue: {
    // 存储的就是src图片名称
    type: String,
    default: '',
  },
  showResize: {
    type: Boolean,
    default: true,
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
const modalRef = ref(null)

function openModal() {
  modalRef.value.open()
}

function imageChange(image) {
  emit('change', image)
}

function resetSize() {
  emit('resize')
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-select-image-wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 28px;
    background: var(--schema-ui-bg);
    .g-img {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      border: 1px solid var(--schema-ui-border);;
      overflow: hidden;
      cursor: pointer;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 100%;
      }
      &.resize {
        width: calc(100% - 22px);
      }
    }
    .g-resize {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 22px;
      height: 100%;
      border: 1px solid var(--schema-ui-border);;
      border-left: none;
    }
  }
}
</style>
