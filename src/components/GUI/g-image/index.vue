<template>
  <div class="dv-gui g-select-image-wrap">
    <div class="g-img" :class="{ resize: showResize }" @click="openModal">
      <img v-if="imgUrl" :src="imgUrl" />
      <span class="tip" v-else>点击选择图片</span>
    </div>
    <div class="g-resize" v-if="showResize">
      <b-tooltip content="恢复默认尺寸">
        <b-icon name="expend" type="button" @click="resetSize"></b-icon>
      </b-tooltip>
    </div>
    <div class="g-resize" v-if="showClear">
      <b-tooltip content="清除图片">
        <b-icon name="clear" type="button" @click="clear"></b-icon>
      </b-tooltip>
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

const emit = defineEmits(['update:modelValue', 'change', 'resize', 'clear'])
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
  showClear: {
    type: Boolean,
    default: false,
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

function clear() {
  imgUrl.value = ''
  emit('clear')
}
</script>

<style scoped>
.dv-gui {
  &.g-select-image-wrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 28px;
    background: var(--s-color-1);
    border: 1px solid var(--s-color-1);
    border-radius: var(--bin-border-radius-default);
    .g-img {
      position: relative;
      display: inline-block;
      width: calc(100% - 28px);
      height: 100%;
      overflow: hidden;
      cursor: pointer;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
      }
      .tip {
        position: absolute;
        left: 8px;
        top: 3px;
        color: var(--s-text-color-3);
      }
    }
    .g-resize {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 100%;

      border-left: 1px solid var(--s-color-1);
    }
    &:hover {
      border-color: var(--bin-color-primary);
    }
  }
}
</style>
