<template>
  <div class="canvas-ruler-wp">
    <div
      ref="hRulerWpRef"
      class="ruler-wrapper h-container"
      :style="`transform: translateX(-${hScroll}px);`"
    ></div>
    <div
      ref="vRulerWpRef"
      class="ruler-wrapper v-container"
      :style="`transform: rotate(90deg) translateX(-${vScroll}px);`"
    ></div>
    <div class="ruler-corner">
      <b-tooltip :content="toolbox.markLine ? '对齐线开启' : '对齐线关闭'">
        <b-icon
          :name="toolbox.markLine ? 'eye' : 'eye-close'"
          type="button"
          @click="toolbox.markLine = !toolbox.markLine"
        />
      </b-tooltip>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useStore } from '@/store'
import { RulerBuilder } from './builder'

defineOptions({
  name: 'Ruler',
})

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store

const { toolbox, canvas } = storeToRefs(schemaStore)
const hRulerWpRef = ref(null)
const vRulerWpRef = ref(null)
const hRuler = ref(null)
const vRuler = ref(null)
const hScroll = ref(0)
const vScroll = ref(0)
const cw = document.documentElement.clientWidth

watchEffect(() => {
  if (hRulerWpRef.value && vRulerWpRef.value) {
    const hWidth = Math.max(canvas.value.width, cw)
    if (hRuler.value) {
      hRuler.value.setSize(hWidth, 20, canvas.value.scale)
    } else {
      hRuler.value = new RulerBuilder(hRulerWpRef.value, {
        direction: 'TB',
        width: hWidth,
        scale: canvas.value.scale,
      })
    }

    if (vRuler.value) {
      vRuler.value.setSize(canvas.value.height, 20, canvas.value.scale)
    } else {
      vRuler.value = new RulerBuilder(vRulerWpRef.value, {
        direction: 'LR',
        width: canvas.value.height,
        scale: canvas.value.scale,
      })
    }
  }
})

const onScroll = e => {
  const dom = e.target
  hScroll.value = dom.scrollLeft
  vScroll.value = dom.scrollTop
}
onMounted(() => {
  const canvasWp = document.getElementById('canvas-wp')
  canvasWp?.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  const canvasWp = document.getElementById('canvas-wp')
  canvasWp?.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.canvas-ruler-wp {
  position: fixed;
  z-index: 1;
  .ruler-wrapper {
    position: absolute;
    height: 20px;
  }
  .h-container {
    left: 20px;
    transform: translateX(0);
  }
  .v-container {
    transform: rotate(90deg) translateX(0);
    transform-origin: 0 100% 0;
    border-right: 1px solid var(--s-border-color-2);
  }
  .ruler-corner {
    position: fixed;
    z-index: 10;
    display: flex;
    width: 20px;
    height: 20px;
    font-size: 16px;
    color: #bcc9d4;
    cursor: pointer;
    background: var(--schema-color-bg-4);
    align-items: center;
    justify-content: center;
    &:hover {
      color: #fff;
    }
  }
}
</style>
