import { deepCopy } from '@/utils/util'

// 撤销和重做
export default {
  state: {
    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1, // 快照索引
  },
  getters: {
    undoDisable() {
      return this.snapshotIndex === 0
    },
    // 当前选中的组件是不是group组
    redoDisable() {
      return this.snapshotData.length === 0 || this.snapshotIndex === this.snapshotData.length - 1
    },
  },
  actions: {
    undo() {
      if (this.snapshotIndex > 0) {
        this.snapshotIndex--
        this.setCompsSelectedAndMultipleComs()
      }
    },
    redo() {
      if (this.snapshotIndex < this.snapshotData.length - 1) {
        this.snapshotIndex++
        this.setCompsSelectedAndMultipleComs()
      }
    },
    setCompsSelectedAndMultipleComs() {
      this.comps = deepCopy(this.snapshotData[this.snapshotIndex])
      this.selectedCom = null
      this.selectedComIds = []

      this.areaData.x = 0
      this.areaData.y = 0
      this.areaData.width = 0
      this.areaData.height = 0
      this.areaData.showArea = false
    },
    recordSnapshot() {
      // 添加新的快照
      this.snapshotData[++this.snapshotIndex] = deepCopy(this.comps)
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (this.snapshotIndex < this.snapshotData.length - 1) {
        this.snapshotData = this.snapshotData.slice(0, this.snapshotIndex + 1)
      }
      // 判定快照长度
      if (this.snapshotData.length > 20) {
        this.snapshotData.shift()
        this.snapshotIndex--
      }
    },
  },
}
