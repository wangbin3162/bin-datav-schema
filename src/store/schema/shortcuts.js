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
  getters: {
    spaceDown() {
      return this.shortcuts.spaceKey
    },
  },
  actions: {
    toggleKey({ key, status }) {
      this.shortcuts[key] = status
    },
    resetKeyCode() {
      this.shortcuts.altKey = false
      this.shortcuts.ctrlKey = false
      this.shortcuts.shiftKey = false
      this.shortcuts.spaceKey = false
    },
  },
}
