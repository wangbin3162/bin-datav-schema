<template>
  <div class="footer-panel">
    <b-popover
      width="235"
      placement="top"
      trigger="hover"
      popper-class="editor-popover"
      :show-arrow="false"
    >
      <i class="b-iconfont b-icon-codelibrary" style="font-size: 18px;"></i>
      <template #content>
        <div class="shortcut-wp">
          <div class="shortcut-item">
            <div class="shortcut-title">开关图层面板</div>
            <div class="shortcut-value">Ctrl/Cmd + ←</div>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-title">切换组件面板</div>
            <div class="shortcut-value">Ctrl/Cmd + ↑</div>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-title">切换右侧面板</div>
            <div class="shortcut-value">Ctrl/Cmd + →</div>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-title">画布缩放到最佳位置</div>
            <div class="shortcut-value">Ctrl/Cmd + a</div>
          </div>
          <div class="shortcut-item">
            <div class="shortcut-title">画布缩放为100%</div>
            <div class="shortcut-value">Ctrl/Cmd + d</div>
          </div>
        </div>
      </template>
    </b-popover>
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
        :max="150"
        :step="5"
        :show-tooltip="false"
        @change="submitScale"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { Message } from 'bin-ui-next'
import { useRouter } from 'vue-router'

export default {
  name: 'footer-panel',
  setup() {
    const {
      canvas,
      autoCanvasScale,
      setCanvasScale,
      toggleLayerPanel,
      toggleCompsPanel,
      toggleConfigPanel,
      pageInfo,
      saveScreenData,
    } = useSchemaStore()
    const $router = useRouter()
    const scaleList = ref([150, 100, 75, 50])
    const inputScale = ref(20)
    const scale = ref(20)

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

    const addShortcuts = (ev) => {
      const target = ev.target
      if (!['input', 'textarea'].includes(target.tagName.toLowerCase())) {
        if ((ev.ctrlKey)) {
          const key = ev.key.toLowerCase()
          if (key === 'arrowleft') {
            toggleLayerPanel()
          } else if (key === 'arrowup') {
            toggleCompsPanel()
          } else if (key === 'arrowright') {
            toggleConfigPanel()
          } else if (key === 'a') {
            autoCanvasScale()
          } else if (key === 'd') {
            submitScale(100)
          } else if (key === 's') {
            handleSave()
          }
          ev.preventDefault()
        }
      }
    }

    const handleSave = async () => {
      const oldId = pageInfo.value.id // 缓存原有id
      const { data } = await saveScreenData()
      if (!oldId) {
        let routeData = $router.resolve({
          path: '/schema/screen',
          query: { id: data.pageInfo.id },
        })
        window.location.replace(routeData.href)
      }
      Message.success({ message: '保存成功！', showClose: true })
    }

    onMounted(() => {
      document.addEventListener('keydown', addShortcuts, false)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', addShortcuts, false)
    })

    return {
      scaleList,
      inputScale,
      scale,
      submitScale,
    }
  },
}
</script>

<style lang="stylus" scoped>
.shortcut-wp {
  position: relative;
  padding: 5px 10px;
  font-size: 12px;
  background: #303640;
  box-shadow: 0 0 8px -4px #000;
  user-select: none;

  .shortcut-item {
    display: flex;
    margin: 5px 0;
    justify-content: space-between;
    align-items: center;
  }

  .shortcut-title {
    padding-right: 15px;
    color: #bcc9d4;
  }

  .shortcut-value {
    padding: 4px 6px;
    font-weight: 700;
    color: #08a1db;
    background: #262b33;
    border-radius: 2px;
  }
}
</style>
