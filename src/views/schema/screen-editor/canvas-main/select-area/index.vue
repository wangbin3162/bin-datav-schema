<template>
  <div
    v-show="showArea"
    :style="{
      left: x + 'px',
      top: y + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    class="select-area"
    @mousedown.stop="mouseDown"
  />
</template>

<script setup>
import { useStore } from '@/store'
import { on, off } from '@/utils/util'

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const { pageConfig, canvas, selectedComs, areaData } = storeToRefs(schemaStore)

defineProps({
  x: Number,
  y: Number,
  width: Number,
  height: Number,
  showArea: Boolean,
})

function mouseDown(ev) {
  let hasMove = false
  // 缓存区域属性
  const attr = {
    x: areaData.value.x,
    y: areaData.value.y,
  }
  // 缓存多选的组件
  const cacheCompsAttr = selectedComs.value.map(i => i.attr)

  const pos = Object.create(null)
  const compsPos = []
  const startX = ev.clientX
  const startY = ev.clientY
  const scale = canvas.value.scale
  const grid = pageConfig.value.grid

  const move = e => {
    const curX = e.clientX
    const curY = e.clientY
    // 每次移动固定格数
    const moveX = Math.round((curX - startX) / scale / grid) * grid
    const moveY = Math.round((curY - startY) / scale / grid) * grid

    hasMove = Math.abs(moveX) >= 1 || Math.abs(moveY) >= 1
    pos.x = attr.x + moveX
    pos.y = attr.y + moveY
    // 设置area 移动状态
    areaData.value = { ...areaData.value, ...pos }
    // 同时需要设置每一个
    selectedComs.value.forEach((comp, i) => {
      compsPos[i] = {
        x: cacheCompsAttr[i].x + moveX,
        y: cacheCompsAttr[i].y + moveY,
      }
      comp.attr = { ...comp.attr, ...compsPos[i] }
    })
  }

  const up = () => {
    hasMove && schemaStore.recordSnapshot()
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
  }

  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}
</script>

<style lang="stylus" scoped>
.select-area {
  position: absolute;
  border: 1px solid #70c0ff;
  background-color: rgba(36,63,162,0.08);
}
</style>
