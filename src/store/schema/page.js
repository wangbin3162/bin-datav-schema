export default {
  state: {
    pageInfo: {},
    // 页面存储数据
    pageConfig: {
      gridStep: 8, // 拖拽间隔
      canvasRange: 100, // 画布缩放
      screenshot: '', // 快照json字符串
      layerExpand: true, // 图层面板展开收起
      componentsExpand: false, // 参数面板打开关闭
      configExpand: true, // 参数面板打开关闭
      toolboxShow: false, // 工具箱展示
    },
  },
  mutations: {
    SET_INFO: (state, info) => {
      state.pageInfo = info || {}
    },
    TOGGLE_LAYER: (state, visible) => {
      state.pageConfig.layerExpand = visible
    },
    TOGGLE_COMPS: (state, visible) => {
      state.pageConfig.componentsExpand = visible
    },
    TOGGLE_CONFIG: (state, visible) => {
      state.pageConfig.configExpand = visible
    },
    TOGGLE_TOOLBOX: (state, visible) => {
      state.pageConfig.toolboxShow = visible
    },
  },
  actions: {
    setPageInfo: ({ commit, state }, info) => {
      commit('SET_INFO', info)
    },
    toggleLayerPanel: ({ commit, state }, visible) => {
      commit('TOGGLE_LAYER', visible !== undefined ? visible : !state.pageConfig.layerExpand)
    },
    toggleCompsPanel: ({ commit, state }, visible) => {
      commit('TOGGLE_COMPS', visible !== undefined ? visible : !state.pageConfig.componentsExpand)
    },
    toggleConfigPanel: ({ commit, state }, visible) => {
      commit('TOGGLE_CONFIG', visible !== undefined ? visible : !state.pageConfig.configExpand)
    },
    toggleToolbox: ({ commit, state }, visible) => {
      commit('TOGGLE_TOOLBOX', visible !== undefined ? visible : !state.pageConfig.toolboxShow)
    },
  },
}
