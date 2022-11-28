const LAYER_WIDTH = 220
const COMPS_WIDTH = 50
const CONFIG_WIDTH = 330
const TOOLBOX_HEIGHT = 40
const PANEL_PADDING = 60
// 画布相关状态值
export default {
  state: {
    // 画布
    canvas: {
      width: 1920,
      height: 1080,
      scale: 0.2,
    },
    // 工具栏面板
    toolbar: {
      layer: true,
      components: false,
      config: true,
      toolbox: false,
      loading: false,
    },
    // 工具箱
    toolbox: {
      referLine: true,
      markLine: false,
    },
  },
  getters: {
    getPanelOffsetX() {
      let offsetX = COMPS_WIDTH
      if (this.toolbar.layer) {
        offsetX += LAYER_WIDTH
      }
      if (this.toolbar.config) {
        offsetX += CONFIG_WIDTH
      }
      return offsetX
    },
    getPanelOffsetY() {
      let offsetY = 0
      if (this.toolbar.toolbox) {
        offsetY += TOOLBOX_HEIGHT
      }
      return offsetY
    },
    getPanelOffsetLeft() {
      let offsetX = PANEL_PADDING + COMPS_WIDTH
      if (this.toolbar.layer) {
        offsetX += LAYER_WIDTH
      }
      return offsetX
    },
    getPanelOffsetTop() {
      let offsetY = 40 + PANEL_PADDING
      if (this.toolbar.toolbox) {
        offsetY += TOOLBOX_HEIGHT
      }
      return offsetY
    },
    getPanelOffset() {
      return {
        offsetX: this.getPanelOffsetX,
        offsetY: this.getPanelOffsetY,
      }
    },
  },
  actions: {
    toggleLayerPanel(visible) {
      this.toolbar.layer = visible !== undefined ? visible : !this.toolbar.layer
    },
    toggleCompsPanel(visible) {
      this.toolbar.components = visible !== undefined ? visible : !this.toolbar.components
    },
    toggleConfigPanel(visible) {
      this.toolbar.config = visible !== undefined ? visible : !this.toolbar.config
    },
    toggleToolbox(visible) {
      this.toolbar.toolbox = visible !== undefined ? visible : !this.toolbar.toolbox
    },
    toggleReferLine(visible) {
      this.toolbox.referLine = visible !== undefined ? visible : !this.toolbox.referLine
    },
    toggleMarkLine(visible) {
      this.toolbox.markLine = visible !== undefined ? visible : !this.toolbox.markLine
    },
    setCanvasScale(scaleSetValue) {
      const offset = this.getPanelOffset
      let width = document.documentElement.clientWidth - offset.offsetX
      let height = document.documentElement.clientHeight - 42 - 32 - offset.offsetY
      const scale = Math.min(Math.max(scaleSetValue, 20), 200) / 100
      // 方便计算滚动条 和 标尺
      const deltaW = this.pageConfig.width * scale
      const deltaH = this.pageConfig.height * scale
      if (width < deltaW) {
        width = deltaW + 200
      }
      if (height < deltaH) {
        height = deltaH + 200
      }
      this.canvas = { scale, width, height }
    },
    autoCanvasScale() {
      const offset = this.getPanelOffset
      const width = document.documentElement.clientWidth - offset.offsetX
      const height = document.documentElement.clientHeight - 42 - 32 - offset.offsetY

      const a = (width - 120) / this.pageConfig.width
      const b = (height - 100) / this.pageConfig.height
      const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100
      this.setCanvasScale(scale)
    },
    setGlobalLoading(loading) {
      this.toolbar.loading = loading
    },
  },
}
