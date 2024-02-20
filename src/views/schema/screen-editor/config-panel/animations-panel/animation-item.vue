<template>
  <div class="animation-wrap">
    <div
      class="animation-box"
      v-for="(item, index) in list"
      :key="index"
      :class="[activeIndex(item.value) && 'active']"
      @mouseover="hoverPreviewAnimate = item.value"
      @click="addAnimation(item)"
    >
      <div
        class="animation-item"
        :class="[hoverPreviewAnimate === item.value && `animate__animated  animate__${item.value}`]"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { ref } from 'vue'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)

defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

const hoverPreviewAnimate = ref('')

// * 选中的动画样式
const activeIndex = value => selectedCom.value.animation.name === value

// * 新增动画，现只支持一种
const addAnimation = item => {
  selectedCom.value.animation.name = item.value
}
</script>

<style scoped>
.animation-wrap {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  gap: 10px 6px;
  margin-bottom: 30px;
  padding-top: 10px;
}
.animation-box {
  grid-column: span 1 / span 1;
  color: var(--s-text-color);
  border: 1px solid var(--s-border-color);
  height: 36px;
  line-height: 36px;
  text-align: center;
  border-radius: 3px;
  cursor: pointer;
  &.active {
    color: var(--bin-color-primary);
    border: 1px solid var(--bin-color-primary);
  }
}
.animation-item {
  transition: all 0.2s;
  font-size: 13px;
  border-radius: 3px;
}
</style>
