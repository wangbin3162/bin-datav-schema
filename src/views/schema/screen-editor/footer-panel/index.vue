<template>
  <div class="footer-panel">
    <div class="screen-info" flex="cross:center">
      <b-tooltip content="快捷键提示" :open-delay="500">
        <b-icon name="read" size="16" type="button" @click="keycodeVisible = true"></b-icon>
      </b-tooltip>
      <span class="ml-8" style="transform: scale(0.9)">
        {{ pageConfig.width }} 像素 * {{ pageConfig.height }} 像素
      </span>
      <span class="ml-8" style="transform: scale(0.9)" v-if="anyKeyDown">
        {{ anyKeyDownStr }}
      </span>
    </div>
    <div flex="cross:center">
      <b-dropdown trigger="click" @command="submitScale">
        <div class="scale-input-wp">
          <input
            v-model="inputScale"
            type="number"
            class="scale-input"
            @keydown.enter="submitScale(0)"
          />
          <span class="percent">%</span>
          <i class="b-iconfont b-icon-down"></i>
        </div>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item v-for="s in scaleList" :key="s" :name="s">
              {{ `${s}%` }}
            </b-dropdown-item>
            <b-dropdown-item :name="-1">自适应</b-dropdown-item>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
      <div class="scale-slider-wp">
        <b-slider
          v-model="scale"
          :min="10"
          :max="200"
          :step="5"
          :show-tooltip="false"
          @change="submitScale"
        />
      </div>
    </div>
  </div>
  <shortcut v-model="keycodeVisible" />
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import Shortcut from './shortcut.vue'

defineOptions({
  name: 'FooterPanel',
})

const { schemaStore, storeToRefs } = useStore()
const { pageConfig, canvas, shortcuts } = storeToRefs(schemaStore)
const scaleList = ref([200, 150, 100, 50])
const inputScale = ref(20)
const scale = ref(20)
const keycodeVisible = ref(false)

const submitScale = async val => {
  if (val === -1) {
    schemaStore.autoCanvasScale()
  } else {
    schemaStore.setCanvasScale(val === 0 ? inputScale.value : val)
  }
}

const anyKeyDown = computed(
  () =>
    shortcuts.value.altKey ||
    shortcuts.value.ctrlKey ||
    shortcuts.value.spaceKey ||
    shortcuts.value.shiftKey,
)

const anyKeyDownStr = computed(() => {
  const { altKey, ctrlKey, spaceKey, shiftKey } = shortcuts.value
  const keys = []
  if (altKey) keys.push('Alt')
  if (ctrlKey) keys.push('Ctrl')
  if (spaceKey) keys.push('Space')
  if (shiftKey) keys.push('Shift')
  return `按下了 [ ${keys.join(' , ')} ] 键`
})

// 缩放变化后，设置自适应的缩放大小
watch(
  () => canvas.value.scale,
  s => {
    const val = parseInt((s * 100).toFixed(2))
    scale.value = val
    inputScale.value = val
  },
)
</script>

<style scoped>
.footer-panel {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  width: 100%;
  height: 32px;
  background: var(--schema-color-bg-2);
  border-top: 1px solit var(--schema-color-border);
  user-select: none;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .screen-info {
    > span {
      font-size: 12px;
    }
  }
  .scale-input-wp {
    position: relative;
    display: block;
    width: 70px;
    height: 22px;
    line-height: 22px;
    margin-left: 20px;
    margin-right: 10px;
    overflow: hidden;
    cursor: pointer;
    background: var(--s-color-1);
    border: 1px solid var(--s-border-color-3);

    .scale-input {
      width: 44px;
      padding-left: 5px;
      font-size: 12px;
      color: var(--s-text-color);
      text-align: center;
      background: transparent;
      outline: 0;
      border: 0;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
      }
    }
    .percent {
      margin-left: 1px;
      color: var(--s-text-color);
    }
    .b-iconfont {
      font-size: 12px;
      margin-left: 2px;
      color: var(--s-text-color);
    }
  }
  .scale-slider-wp {
    width: 190px;
  }
}
</style>
