export default {
  state: {
    canvas: {
      width: 1920,
      height: 1080,
      scale: 0.2,
    },
    toolbar: {
      layer: true,
      components: false,
      config: true,
      toolbox: false,
      loading: false,
    },
    toolbox: {
      referLine: true,
      markLine: false,
    },
  },
  mutations: {
    TOGGLE_TOOLBAR: (state, { visible, key }) => {
      state.toolbar[key] = visible !== undefined ? visible : !state.toolbar[key]
    },
    TOGGLE_TOOLBOX: (state, { visible, key }) => {
      state.toolbox[key] = visible !== undefined ? visible : !state.toolbox[key]
    },
    SET_CANVAS: (state, payload) => {
      state.canvas = { ...payload }
    },
    setLoading: (state, loading) => {
      state.toolbar.loading = loading
    },
  },
  actions: {
    toggleLayerPanel: ({ commit }, visible) => {
      commit('TOGGLE_TOOLBAR', { visible, key: 'layer' })
    },
    toggleCompsPanel: ({ commit }, visible) => {
      commit('TOGGLE_TOOLBAR', { visible, key: 'components' })
    },
    toggleConfigPanel: ({ commit }, visible) => {
      commit('TOGGLE_TOOLBAR', { visible, key: 'config' })
    },
    toggleToolbox: ({ commit }, visible) => {
      commit('TOGGLE_TOOLBAR', { visible, key: 'toolbox' })
    },
    toggleReferLine: ({ commit }, visible) => {
      commit('TOGGLE_TOOLBOX', { visible, key: 'referLine' })
    },
    toggleMarkLine: ({ commit }, visible) => {
      commit('TOGGLE_TOOLBOX', { visible, key: 'markLine' })
    },
    setCanvasScale: ({ commit, state }, payload) => {
      let width = document.documentElement.clientWidth - payload.offsetX
      let height = document.documentElement.clientHeight - 42 - 32 - payload.offsetY
      const scale = Math.min(Math.max(payload.scale, 20), 200) / 100
      // 方便计算滚动条 和 标尺
      const deltaW = state.pageConfig.width * scale
      const deltaH = state.pageConfig.height * scale
      if (width < deltaW) {
        width = deltaW + 200
      }
      if (height < deltaH) {
        height = deltaH + 200
      }
      commit('SET_CANVAS', { scale, width, height })
    },
    autoCanvasScale: ({ commit, dispatch, state }, payload) => {
      const offset = payload()
      const width = document.documentElement.clientWidth - offset.offsetX
      const height = document.documentElement.clientHeight - 42 - 32 - offset.offsetY

      const a = (width - 120) / state.pageConfig.width
      const b = (height - 100) / state.pageConfig.height
      const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100
      dispatch('setCanvasScale', { scale, ...offset })
    },
  },
}
