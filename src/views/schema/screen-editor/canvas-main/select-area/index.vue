<template>
  <div
    v-show="showArea"
    :style="{
      left: x + 'px',
      top: y + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    class="area"
  >
    <span>{{ realData }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getTransArea } from './uitl'

const props = defineProps({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  showArea: Boolean,
})

const realData = computed(() => {
  const { x, y, width, height } = getTransArea(props)
  return `x:${x}, y:${y}, w:${width}, h:${height}`
})
</script>

<style lang="stylus" scoped>
.area {
  position: absolute;
  border: 1px solid #70c0ff;
}
</style>
