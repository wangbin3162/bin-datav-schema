import { useStore } from 'vuex'
import { computed } from 'vue'
import { saveScreen } from '@/api/database.api'

const LAYER_WIDTH = 200
const COMPS_WIDTH = 220
const COMPS_WIDTH_MIN = 45
const CONFIG_WIDTH = 332
const TOOLBOX_HEIGHT = 40
const PANEL_PADDING = 60
export default function useSchemaStore() {
  const store = useStore()
  const schemaStatus = computed(() => store.state.schema)
  const pageInfo = computed(() => schemaStatus.value.pageInfo)
  const pageConfig = computed(() => schemaStatus.value.pageConfig)
  const comps = computed(() => schemaStatus.value.comps)
  const selectedCom = computed(() => schemaStatus.value.selectedCom)
  const hoveredCom = computed(() => schemaStatus.value.hoveredCom)
  // 四个基础面板
  const toolbar = computed(() => schemaStatus.value.toolbar)
  const toolbox = computed(() => schemaStatus.value.toolbox)
  // canvas画布
  const canvas = computed(() => schemaStatus.value.canvas)
  const getPanelOffsetX = computed(() => {
    const toolbarVisible = toolbar.value
    let offsetX = 0
    if (toolbarVisible.layer) {
      offsetX += LAYER_WIDTH
    }
    if (toolbarVisible.components) {
      offsetX += COMPS_WIDTH
    } else {
      offsetX += COMPS_WIDTH_MIN
    }
    if (toolbarVisible.config) {
      offsetX += CONFIG_WIDTH
    }
    return offsetX
  })
  const getPanelOffsetY = computed(() => {
    const toolbarVisible = toolbar.value
    let offsetY = 0
    if (toolbarVisible.toolbox) {
      offsetY += TOOLBOX_HEIGHT
    }
    return offsetY
  })
  const getPanelOffsetLeft = computed(() => {
    const toolbarVisible = toolbar.value
    let offsetX = PANEL_PADDING
    if (toolbarVisible.layer) {
      offsetX += LAYER_WIDTH
    }
    if (toolbarVisible.components) {
      offsetX += COMPS_WIDTH
    } else {
      offsetX += COMPS_WIDTH_MIN
    }
    return offsetX
  })
  const getPanelOffsetTop = computed(() => {
    const toolbarVisible = toolbar.value
    let offsetY = 40 + PANEL_PADDING
    if (toolbarVisible.toolbox) {
      offsetY += TOOLBOX_HEIGHT
    }
    return offsetY
  })

  // toggle图层面板
  async function toggleLayerPanel(visible) {
    await store.dispatch('schema/toggleLayerPanel', visible)
  }

  // toggle组件面板
  async function toggleCompsPanel(visible) {
    await store.dispatch('schema/toggleCompsPanel', visible)
  }

  // toggle配置面板
  async function toggleConfigPanel(visible) {
    await store.dispatch('schema/toggleConfigPanel', visible)
  }

  // toggle配置面板
  async function toggleToolbox(visible) {
    await store.dispatch('schema/toggleToolbox', visible)
  }

  // 设置pageInfo
  async function setPageInfo(info) {
    await store.dispatch('schema/setPageInfo', info)
  }

  // 增加组件至面板
  async function addCom({ component, index }) {
    await store.dispatch('schema/addCom', { component, index })
  }

  // 拷贝组件至面板
  async function copyCom(id) {
    await store.dispatch('schema/copyCom', id)
  }

  // 删除组件
  async function deleteCom(id) {
    await store.dispatch('schema/deleteCom', id)
  }

  // 设置hovered组件
  async function onCompHovered(component) {
    await store.dispatch('schema/hoveredCom', component)
  }

  // 设置selected组件
  async function onCompSelected(component) {
    await store.dispatch('schema/selectedCom', component)
  }

  // 移动组件位置
  async function onCompMoved(id, moveType) {
    await store.dispatch('schema/moveCom', { id, moveType })
  }

  const getPanelOffset = () => ({
    offsetX: getPanelOffsetX.value,
    offsetY: getPanelOffsetY.value,
  })

  // 自适应面板
  async function autoCanvasScale() {
    await store.dispatch('schema/autoCanvasScale', getPanelOffset)
  }

  // 设置面板
  async function setCanvasScale(scale) {
    await store.dispatch('schema/setCanvasScale', { scale, ...getPanelOffset() })
  }

  // 设置单个位置
  async function setSingleComAttr({ key, value }) {
    const map = { left: 'x', top: 'y' }
    await store.dispatch('schema/setShapeSingleStyle', { key: map[key], value })
  }

  // 设置全局的loading
  async function setGlobalLoading(loading) {
    await store.commit('schema/setLoading', loading)
  }

  // 载入全局data
  async function loadScreenData(screenData) {
    await store.dispatch('schema/loadScreenData', screenData)
  }

  // 保存screenData
  async function saveScreenData() {
    let result = {}
    try {
      await setGlobalLoading(true)
      const id = pageInfo.value.id
      const data = {
        pageInfo: pageInfo.value,
        pageConfig: pageConfig.value,
        comps: comps.value,
      }
      result = await saveScreen(id, data)
    } catch (e) {
      result = {}
    }
    await setGlobalLoading(false)
    return result
  }


  return {
    store,
    pageInfo,
    canvas,
    toolbar,
    toolbox,
    pageConfig,
    comps,
    hoveredCom,
    selectedCom,
    getPanelOffsetLeft,
    getPanelOffsetTop,
    setPageInfo,
    toggleLayerPanel,
    toggleCompsPanel,
    toggleConfigPanel,
    toggleToolbox,
    addCom,
    copyCom,
    deleteCom,
    onCompHovered,
    onCompSelected,
    onCompMoved,
    autoCanvasScale,
    setCanvasScale,
    setSingleComAttr,
    setGlobalLoading,
    loadScreenData,
    saveScreenData,
  }
}
