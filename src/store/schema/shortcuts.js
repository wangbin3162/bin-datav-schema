// 快捷操作状态
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
    // 单组件设置吸附位置和顶点
    doAdsorption(type) {
      const com = this.selectedCom
      const page = this.pageConfig
      // { value: 'align-to-top', label: '移至顶部' },
      // { value: 'align-to-center', label: '垂直居中' },
      // { value: 'align-to-bottom', label: '移至底部' },
      // { value: 'align-to-left', label: '移至左侧' },
      // { value: 'align-to-middle', label: '水平居中' },
      // { value: 'align-to-right', label: '移至右侧' },
      if (type === 'align-to-top') {
        com.attr.y = 0
      } else if (type === 'align-to-center') {
        com.attr.y = (page.height - com.attr.h) / 2
      } else if (type === 'align-to-bottom') {
        com.attr.y = page.height - com.attr.h
      } else if (type === 'align-to-left') {
        com.attr.x = 0
      } else if (type === 'align-to-middle') {
        com.attr.x = (page.width - com.attr.w) / 2
      } else if (type === 'align-to-right') {
        com.attr.x = page.width - com.attr.w
      }

      this.recordSnapshot()
    },
  },
}
