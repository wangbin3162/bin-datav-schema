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
  actions: {
    toggleLayerPanel(visible) {
      this.toolbox.layer = visible !== undefined ? visible : !this.toolbar.layer
    },
    toggleCompsPanel(visible) {
      this.toolbox.components = visible !== undefined ? visible : !this.toolbar.components
    },
    toggleConfigPanel(visible) {
      this.toolbox.config = visible !== undefined ? visible : !this.toolbar.config
    },
    toggleToolbox(visible) {
      this.toolbox.toolbox = visible !== undefined ? visible : !this.toolbar.toolbox
    },
    toggleReferLine(visible) {
      this.toolbox.referLine = visible !== undefined ? visible : !this.toolbox.referLine
    },
    toggleMarkLine(visible) {
      this.toolbox.markLine = visible !== undefined ? visible : !this.toolbox.markLine
    },
    setCanvasScale(payload) {
      let width = document.documentElement.clientWidth - payload.offsetX
      let height = document.documentElement.clientHeight - 42 - 32 - payload.offsetY
      const scale = Math.min(Math.max(payload.scale, 20), 200) / 100
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
    autoCanvasScale(payload) {
      const offset = payload()
      const width = document.documentElement.clientWidth - offset.offsetX
      const height = document.documentElement.clientHeight - 42 - 32 - offset.offsetY

      const a = (width - 120) / this.pageConfig.width
      const b = (height - 100) / this.pageConfig.height
      const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100
      this.setCanvasScale({ scale, ...offset })
    },
    setGlobalLoading(loading) {
      this.toolbar.loading = loading
    },
  },
}
