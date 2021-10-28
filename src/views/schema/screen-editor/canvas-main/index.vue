<template>
  <div class="canvas-main">
    <div id="canvas-wp" class="canvas-panel-wrap" @mousedown.stop="cancelSelectCom">
      <div class="screen-shot" :style="screenShotStyle">
        <mark-line :style="screenShotStyle" v-if="toolbox.markLine" />
        <ruler />
        <div
          id="canvas-components"
          class="canvas-panel"
          :style="canvasPanelStyle"
          @dragover="dragOver"
          @drop="dropToAddCom"
        >
          <dv-transform
            v-for="comp in comps"
            :key="comp.id"
            :data="comp"
          >
            <component
              :is="comp.name"
              :data="comp"
              :style="{
                transform: 'translateZ(0px)',
                opacity: comp.attr.opacity,
              }"
            />
          </dv-transform>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { on, off, debounce } from '@/utils/util'
import Ruler from '@/views/schema/screen-editor/canvas-main/ruler/index.vue'
import MarkLine from '@/views/schema/screen-editor/canvas-main/mark-line/index.vue'
import DvTransform from '@/views/schema/screen-editor/canvas-main/dv-transform/index.vue'
import { createComponent } from '@/config/components-cfg'
import { ApiType } from '@/config/data-source'
import { getStaticData } from '@/api/database.api'

export default {
  name: 'canvas-main',
  components: { MarkLine, DvTransform, Ruler },
  setup() {
    const {
      canvas,
      pageConfig,
      autoCanvasScale,
      comps,
      onCompSelected,
      getPanelOffsetLeft,
      getPanelOffsetTop,
      selectedCom,
      addCom,
      toolbox,
    } = useSchemaStore()
    const screenShotStyle = computed(() => {
      return {
        width: `${canvas.value.width}px`,
        height: `${canvas.value.height}px`,
      }
    })
    const canvasPanelStyle = computed(() => {
      return {
        position: 'absolute',
        width: `${pageConfig.value.width}px`,
        height: `${pageConfig.value.height}px`,
        transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
        backgroundImage: `url(${pageConfig.value.bgImage})`,
        backgroundColor: pageConfig.value.bgColor,
      }
    })

    const autoScale = debounce(autoCanvasScale, 200)

    // 拖放增加组件
    const dropToAddCom = async (event) => {
      event.preventDefault()
      try {
        const name = event.dataTransfer.getData('text')
        if (name) {
          const com = createComponent(name)
          const { scale } = canvas.value
          const offsetX = (event.clientX - getPanelOffsetLeft.value) / scale
          const offsetY = (event.clientY - getPanelOffsetTop.value) / scale
          com.attr.x = Math.round(offsetX - com.attr.w / 2)
          com.attr.y = Math.round(offsetY - com.attr.h / 2)
          await addCom({ component: com })
          // 选中当前
          await onCompSelected(com)
          // 如是静态数据，且存在staticPath，则填充一次数据
          if (com.apiData.source && com.apiData.source.type === ApiType.static && com.apiData.source.staticPath) {
            const { data } = await getStaticData(com.id, com.apiData.source.staticPath)
            selectedCom.value.apiData.source.config.data = JSON.stringify(data)
          }
        }
      } catch (e) {
        console.warn(e)
      }
    }

    const cancelSelectCom = () => {
      onCompSelected()
    }

    const dragOver = (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      ev.dataTransfer.dropEffect = 'copy'
    }

    onMounted(() => {
      on(window, 'resize', autoScale)
      autoScale()
    })
    onBeforeUnmount(() => {
      off(window, 'resize', autoScale)
    })
    return {
      screenShotStyle,
      canvasPanelStyle,
      comps,
      toolbox,
      cancelSelectCom,
      dropToAddCom,
      dragOver,
    }
  },
}
</script>
