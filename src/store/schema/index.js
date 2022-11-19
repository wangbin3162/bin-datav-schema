import { defineStore } from 'pinia'
import page from './page'
import canvas from './canvas'
import compose from './compose'
import contextmenu from './contextmenu'
import shortcuts from './shortcuts'
import snapshot from './snapshot'
import { defaultInfo, defaultPageCfg } from './page'

const useSchema = defineStore('schema', {
  state: () => ({
    ...page.state,
    ...canvas.state,
    ...compose.state,
    ...contextmenu.state,
    ...snapshot.state,
    ...shortcuts.state,
  }),
  getters: {
    ...shortcuts.getters,
    ...canvas.getters,
    ...page.getters,
    ...snapshot.getters,
    ...compose.getters,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...compose.actions,
    ...contextmenu.actions,
    ...snapshot.actions,
    ...shortcuts.actions,
    // store状态清空
    clearStore() {
      // 当前页面信息
      this.pageInfo = { ...defaultInfo }
      // 页面存储数据
      this.pageConfig = { ...defaultPageCfg }
      this.comps = []
      this.selectedCom = null
      this.selectedComIds = []
      this.hoveredComId = ''
      this.renamingComId = ''
      this.snapshotData = []
      this.snapshotIndex = -1
    },
  },
})

export default useSchema
