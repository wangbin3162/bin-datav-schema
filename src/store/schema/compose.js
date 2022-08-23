// page页面需要保存的信息
export default {
  state: {
    editorEL: null,
    areaData: { left: 0, top: 0, width: 0, height: 0 },
  },
  getters: {},
  actions: {
    getEditor() {
      this.editorEL = document.querySelector('#canvas-components')
    },
  },
}
