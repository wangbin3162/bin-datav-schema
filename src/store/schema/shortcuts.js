// 快捷操作状态
export default {
  state: {
    shortcuts: {
      altKey: false,
      ctrlKey: false,
      spaceKey: false,
      shiftKey: false,
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
      this.shortcuts.spaceKey = false
      this.shortcuts.shiftKey = false
    },
    doRotate(type) {
      const com = this.selectedCom
      if (type === 'rotate-left') {
        com.attr.rotate -= 90
      } else if (type === 'sync') {
        com.attr.rotate = 0
      } else if (type === 'rotate-right') {
        com.attr.rotate += 90
      }
      com.attr.rotate = com.attr.rotate < 0 ? com.attr.rotate + 360 : com.attr.rotate
      if (com.attr.rotate === 360) com.attr.rotate = 0
    },
  },
}
