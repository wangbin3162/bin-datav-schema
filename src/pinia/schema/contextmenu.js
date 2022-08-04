// 右键菜单内容
export default {
  state: {
    contextMenu: { x: 0, y: 0, show: false }, // 右键菜单
  },
  actions: {
    toggleContextMenu(info) {
      this.contextMenu = info ? { ...info, show: true } : { x: 0, y: 0, show: false }
    },
  },
}
