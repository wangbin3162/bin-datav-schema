export default {
  state: {
    contextMenuInfo: { x: 0, y: 0, isShow: false }, // 右键菜单
  },
  mutations: {
    // 设置右键菜单信息
    SET_CONTEXT_MENU_INFO(state, info) {
      state.contextMenuInfo = info
    },
  },
  actions: {
    toggleContextMenu({ commit }, info) {
      let menuInfo = info ? Object.assign({}, info, { isShow: true }) : { x: 0, y: 0, isShow: false }
      commit('SET_CONTEXT_MENU_INFO', menuInfo)
    },
  },
}
