import { deepCopy } from '@/utils/util'

// 撤销和重做
export default {
  state: {
    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1, // 快照索引
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
      // 如果有多选的组件，恢复撤回重做后需要重新建立当前绑定对象内容
      if (this.multipleComs.length > 0) {
        const multipleIds = this.multipleComs.map(i => i.id)
        // 清空并重新设置多选
        this.multipleComs = this.comps.filter(i => multipleIds.includes(i.id))
      }
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
