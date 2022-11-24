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
          @mousedown="handleMouseDown"
        >
          <dv-transform v-for="comp in comps" :key="comp.id" :data="comp">
            <component
              :is="comp.name"
              :data="comp"
              :style="{
                width: comp.attr.w + 'px',
                height: comp.attr.h + 'px',
                opacity: comp.attr.opacity,
                transform: 'translateZ(0px)',
              }"
              :id="`component_${comp.id}`"
            />
          </dv-transform>
          <SelectArea v-bind="areaData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { on, off, debounce } from '@/utils/util'
import eventBus from '@/utils/event-bus'
import Ruler from '@/views/schema/screen-editor/canvas-main/ruler/index.vue'
import MarkLine from '@/views/schema/screen-editor/canvas-main/mark-line/index.vue'
import DvTransform from '@/views/schema/screen-editor/canvas-main/dv-transform/index.vue'
import ActionBar from '@/views/schema/screen-editor/canvas-main/action-bar/index.vue'
import { createComponent } from '@/config/components-cfg'
import { ApiType } from '@/config/data-source'
import { getStaticData } from '@/api/database.api'
import { useStore } from '@/store'
import SelectArea from './select-area/index.vue'
import { getSelectArea } from './select-area/util'

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const {
  pageConfig,
  spaceDown,
  canvas,
  selectedCom,
  comps,
  toolbox,
  getPanelOffsetLeft,
  getPanelOffsetTop,
  editorEL,
  areaData,
} = storeToRefs(schemaStore)

const canvasWpRef = ref(null)

const dragStatus = reactive({
  drag: false,
  startX: 0,
  startY: 0,
})

let editorX = 0
let editorY = 0

const screenShotStyle = computed(() => ({
  width: `${canvas.value.width}px`,
  height: `${canvas.value.height}px`,
}))
const canvasPanelStyle = computed(() => ({
  position: 'absolute',
  width: `${pageConfig.value.width}px`,
  height: `${pageConfig.value.height}px`,
  transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
  backgroundImage: `url(${pageConfig.value.bgImage})`,
  backgroundColor: pageConfig.value.bgColor,
}))

const autoScale = debounce(schemaStore.autoCanvasScale, 50)

// 拖放增加组件
async function dropToAddCom(event) {
  event.preventDefault()
  try {
    // 获取自定义组件或者是图片内容
    const imageComp = event.dataTransfer.getData('image-comp')
    if (imageComp) {
      const com = JSON.parse(imageComp)
      dropCom(event, com)
      return
    }

    // 获取自定义组件或者是图片内容
    const customComp = event.dataTransfer.getData('custom-comp')
    if (customComp) {
      const com = JSON.parse(customComp)
      dropCom(event, com)
      return
    }

    const name = event.dataTransfer.getData('normal-comp')
    if (name) {
      const com = createComponent(name)
      dropCom(event, com)
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

// 放置组件
function dropCom(e, com) {
  const { scale } = canvas.value
  const offsetX = (e.clientX - getPanelOffsetLeft.value + canvasWpRef.value.scrollLeft) / scale
  const offsetY = (e.clientY - getPanelOffsetTop.value + canvasWpRef.value.scrollTop) / scale
  com.attr.x = Math.round(offsetX - com.attr.w / 2)
  com.attr.y = Math.round(offsetY - com.attr.h / 2)
  schemaStore.addCom({ component: com })
  // 选中当前
  schemaStore.selectCom(com)
}

function dragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  e.dataTransfer.dropEffect = 'copy'
}

function cancelSelectCom(ev) {
  if (spaceDown.value) {
    dragStatus.drag = true
    const startX = ev.clientX
    const startY = ev.clientY
    const scale = canvas.value.scale
    const { scrollLeft, scrollTop, clientWidth, scrollWidth, clientHeight, scrollHeight } =
      canvasWpRef.value
    const couldMove = clientWidth < scrollWidth || clientHeight < scrollHeight // 是否出现滚动条
    const attr = { left: scrollLeft, top: scrollTop }

    const move = e => {
      if (couldMove) {
        const curX = e.clientX
        const curY = e.clientY
        const disX = Math.round((curX - startX) / scale)
        const disY = Math.round((curY - startY) / scale)

        canvasWpRef.value.scrollLeft = attr.left - disX
        canvasWpRef.value.scrollTop = attr.top - disY
      }
    }

    const up = () => {
      dragStatus.drag = false
      off(document, 'mousemove', move)
      off(document, 'mouseup', up)
    }

    on(document, 'mousemove', move)
    on(document, 'mouseup', up)
  } else {
    schemaStore.selectCom()
  }
}

// 框选多个组件
function handleMouseDown(e) {
  // 如果没有选中组件 在画布上点击时需要调用 e.preventDefault() 防止触发 drop 事件
  if (!selectedCom.value) {
    e.preventDefault()
  }

  // 如果空格按下移动或者是按下时触发了select-area
  if (spaceDown.value || e.target.className === 'select-area') return

  hideArea()

  const rectInfo = editorEL.value.getBoundingClientRect()
  editorX = rectInfo.x
  editorY = rectInfo.y
  const startX = e.clientX
  const startY = e.clientY
  areaData.value.showArea = true

  const _scale = canvas.value.scale

  areaData.value.x = (startX - editorX) / _scale
  areaData.value.y = (startY - editorY) / _scale

  const move = e => {
    areaData.value.width = Math.abs((e.clientX - startX) / _scale)
    areaData.value.height = Math.abs((e.clientY - startY) / _scale)
    if (e.clientX < startX) {
      areaData.value.x = (e.clientX - editorX) / _scale
    }
    if (e.clientY < startY) {
      areaData.value.y = (e.clientY - editorY) / _scale
    }
  }

  const up = e => {
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
    if (e.clientX === startX && e.clientY === startY) {
      hideArea()
      return
    }
    createGroup() // 打组内容
  }
  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}

// 创建分组包围盒
function createGroup() {
  // 获取选中区域的组件数据
  const selectAreaComps = getSelectArea(areaData.value, comps.value)
  // 如果没有选中的组件则隐藏区域
  if (selectAreaComps.length === 0) {
    hideArea()
    return
  }
  // 选中项只有一个的时候设置为单选
  if (selectAreaComps.length === 1) {
    schemaStore.selectCom(selectAreaComps[0])
    hideArea()
    return
  }
  // 设置多选，并进行计算区域
  schemaStore.multiSelectComs(selectAreaComps)
}

function hideArea() {
  areaData.value.showArea = false
  areaData.value.width = 0
  areaData.value.height = 0
}

onMounted(() => {
  on(window, 'resize', autoScale)
  eventBus.on('hideArea', hideArea)
  schemaStore.getEditor()
  autoScale()
})

onBeforeUnmount(() => {
  off(window, 'resize', autoScale)
})
</script>
