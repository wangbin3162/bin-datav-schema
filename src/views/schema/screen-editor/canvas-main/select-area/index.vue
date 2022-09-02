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
  />
</template>

<script setup>
defineProps({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  showArea: Boolean,
})
</script>

<style lang="stylus" scoped>
.area {
  position: absolute;
  border: 1px solid #70c0ff;
  background-color: rgba(36,63,162,0.08);
}
</style>
