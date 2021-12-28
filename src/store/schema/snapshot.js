import { deepCopy } from '@/utils/util'

export default {
  state: {
    snapshotData: [], // 编辑器快照数据
    snapshotIndex: -1, // 快照索引
  },
  actions: {
    undo: ({ commit, state }) => {
      if (state.snapshotIndex > 0) {
        state.snapshotIndex--
        commit('SET_COMPS', deepCopy(state.snapshotData[state.snapshotIndex]))
        commit('SELECT_COM', null)
      }
    },

    redo: ({ commit, state }) => {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++
        commit('SET_COMPS', deepCopy(state.snapshotData[state.snapshotIndex]))
        commit('SELECT_COM', null)
      }
    },

    recordSnapshot: ({ commit, state }) => {
      // 添加新的快照
      state.snapshotData[++state.snapshotIndex] = deepCopy(state.comps)
      // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
      }
      // 判定快照长度
      if (state.snapshotData.length > 20) {
        state.snapshotData.shift()
        state.snapshotIndex--
      }
    },
  },
}
