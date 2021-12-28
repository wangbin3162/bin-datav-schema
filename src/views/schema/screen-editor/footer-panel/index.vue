<template>
  <div class="footer-panel">
    <div class="screen-info" flex="cross:center">
      <b-tooltip content="快捷键提示" :open-delay="500">
        <b-icon name="read" size="16" type="button" @click="keycodeVisible = true"></b-icon>
      </b-tooltip>
      <span class="ml-8" style="transform: scale(0.9);">{{ pageConfig.width }} 像素 * {{ pageConfig.height }} 像素</span>
    </div>
    <div flex="cross:center">
      <b-dropdown trigger="click" @command="submitScale">
        <div class="scale-input-wp">
          <input
            v-model="inputScale"
            type="number"
            class="scale-input"
            @keydown.enter="submitScale(0)"
          >
          <span class="percent">%</span>
          <i class="b-iconfont b-icon-down"></i>
        </div>
        <template #dropdown>
          <b-dropdown-menu>
            <b-dropdown-item
              v-for="s in scaleList"
              :key="s"
              :name="s"
            >
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

<script>
import { ref, watch } from 'vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import Shortcut from './shortcut.vue'

export default {
  name: 'footer-panel',
  components: { Shortcut },
  setup() {
    const {
      pageConfig,
      canvas,
      autoCanvasScale,
      setCanvasScale,
    } = useSchemaStore()
    const scaleList = ref([200, 150, 100, 50])
    const inputScale = ref(20)
    const scale = ref(20)
    const keycodeVisible = ref(false)

    const submitScale = async (val) => {
      if (val === -1) {
        await autoCanvasScale()
      } else {
        await setCanvasScale(val === 0 ? inputScale.value : val)
      }
    }

    // 缩放变化后，设置自适应的缩放大小
    watch(() => canvas.value.scale, s => {
      const val = parseInt((s * 100).toFixed(2))
      scale.value = val
      inputScale.value = val
    })

    return {
      pageConfig,
      scaleList,
      inputScale,
      scale,
      submitScale,
      keycodeVisible,
    }
  },
}
</script>
