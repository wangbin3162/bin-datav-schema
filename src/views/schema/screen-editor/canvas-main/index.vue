<template>
  <div class="canvas-main">
    <div
      id="canvas-wp"
      ref="canvasWpRef"
      class="canvas-panel-wrap"
      @mousedown.stop="cancelSelectCom"
    >
      <div class="screen-shot" :style="screenShotStyle">
        <mark-line :style="screenShotStyle" v-if="toolbox.markLine" />
        <action-bar />
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
import { computed, onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import { on, off, debounce } from '@/utils/util'
import Ruler from '@/views/schema/screen-editor/canvas-main/ruler/index.vue'
import MarkLine from '@/views/schema/screen-editor/canvas-main/mark-line/index.vue'
import DvTransform from '@/views/schema/screen-editor/canvas-main/dv-transform/index.vue'
import ActionBar from '@/views/schema/screen-editor/canvas-main/action-bar/index.vue'
import { createComponent } from '@/config/components-cfg'
import { ApiType } from '@/config/data-source'
import { getStaticData } from '@/api/database.api'

export default {
  name: 'canvas-main',
  components: { MarkLine, DvTransform, Ruler, ActionBar },
  setup() {
    const {
      store,
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
    const canvasWpRef = ref(null)
    const dragStatus = reactive({
      drag: false,
      startX: 0,
      startY: 0,
    })
    const spaceDown = computed(() => store.state.schema.shortcuts.spaceKey)
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

    const autoScale = debounce(autoCanvasScale, 50)

    // 拖放增加组件
    const dropToAddCom = async (event) => {
      event.preventDefault()
      try {
        const name = event.dataTransfer.getData('text')
        if (name) {
          const com = createComponent(name)
          const { scale } = canvas.value
          const offsetX = (event.clientX - getPanelOffsetLeft.value + canvasWpRef.value.scrollLeft) / scale
          const offsetY = (event.clientY - getPanelOffsetTop.value + canvasWpRef.value.scrollTop) / scale
          com.attr.x = Math.round(offsetX - com.attr.w / 2)
          com.attr.y = Math.round(offsetY - com.attr.h / 2)
          await addCom({ component: com })
          // 选中当前
          await onCompSelected(com)
          // 如是静态数据，且存在staticPath，则填充一次数据
          if (com.apiData && com.apiData.type === ApiType.static && com.apiData.staticPath) {
            const { data } = await getStaticData(com.id, com.apiData.staticPath)
            selectedCom.value.apiData.config.data = JSON.stringify(data)
          }
        }
      } catch (e) {
        console.warn(e)
      }
    }

    const dragOver = (ev) => {
      ev.preventDefault()
      ev.stopPropagation()
      ev.dataTransfer.dropEffect = 'copy'
    }

    const cancelSelectCom = (ev) => {
      if (!spaceDown.value) {
        onCompSelected()
      }

      dragStatus.drag = true
      const startX = ev.clientX
      const startY = ev.clientY
      const scale = canvas.value.scale
      const { scrollLeft, scrollTop, clientWidth, scrollWidth, clientHeight, scrollHeight } = canvasWpRef.value
      const couldMove = clientWidth < scrollWidth || clientHeight < scrollHeight // 是否出现滚动条
      const attr = { left: scrollLeft, top: scrollTop }

      const move = (e) => {
        if (!spaceDown.value || !dragStatus.drag || !couldMove) return
        const curX = e.clientX
        const curY = e.clientY
        const disX = Math.round((curX - startX) / scale)
        const disY = Math.round((curY - startY) / scale)

        canvasWpRef.value.scrollLeft = attr.left - disX
        canvasWpRef.value.scrollTop = attr.top - disY
      }

      const up = () => {
        dragStatus.drag = false
        off(document, 'mousemove', move)
        off(document, 'mouseup', up)
      }

      on(document, 'mousemove', move)
      on(document, 'mouseup', up)
    }

    onMounted(() => {
      on(window, 'resize', autoScale)
      autoScale()
    })
    onBeforeUnmount(() => {
      off(window, 'resize', autoScale)
    })
    return {
      canvasWpRef,
      ...toRefs(dragStatus),
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
