// 快捷键状态
export default {
  state: {
    shortcuts: {
      altKey: false,
      ctrlKey: false,
      shiftKey: false,
      spaceKey: false,
    },
  },
  mutations: {
    // 设置右键菜单信息
    SET_KEY(state, { key, status }) {
      state.shortcuts[key] = status
    },
    RESET_KEYCODE(state) {
      state.shortcuts.altKey = false
      state.shortcuts.ctrlKey = false
      state.shortcuts.shiftKey = false
      state.shortcuts.spaceKey = false
    },
  },
  actions: {
    toggleKey({ commit }, { key, status }) {
      commit('SET_KEY', { key, status })
    },
    resetKeyCode({ commit }) {
      commit('RESET_KEYCODE')
    },
  },
}
