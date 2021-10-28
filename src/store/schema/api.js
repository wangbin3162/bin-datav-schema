import { ApiType } from '@/config/data-source'
import { toJson } from '@/utils/util'

export default {
  state: {
    dataMap: {}, // 数据值映射
    dataStatusMap: {}, // 数据状态
    fieldStatusMap: {}, // 字段状态
  },
  mutations: {
    SET_DATA: (state, { comId, data }) => {
      for (const [keyName, value] of Object.entries(data)) {
        if (state.dataMap[comId]) {
          state.dataMap[comId][keyName] = value
        } else {
          state.dataMap[comId] = { [keyName]: value }
        }
      }
    },
    // payload:{ comId, data:ApiDataStatus }
    SET_DATA_STATUS: (state, payload) => {
      for (const [keyName, value] of Object.entries(payload.data)) {
        if (state.dataStatusMap[payload.comId]) {
          state.dataStatusMap[payload.comId][keyName] = value
        } else {
          state.dataStatusMap[payload.comId] = { [keyName]: value }
        }
      }
    },
    // payload:{ comId, fields:ApiFieldStatus }
    SET_FIELD_STATUS: (state, payload) => {
      for (const [keyName, value] of Object.entries(payload.fields)) {
        if (state.fieldStatusMap[payload.comId]) {
          state.fieldStatusMap[payload.comId][keyName] = value
        } else {
          state.fieldStatusMap[payload.comId] = { [keyName]: value }
        }
      }
    },
  },
  actions: {
    setData: ({ commit }, { comId, data }) => {
      commit('SET_DATA', { comId, data })
    },
    requestData: async ({ commit }, { comId, aConfig, adConfig }) => {
      const { type, config } = adConfig
      let res = undefined

      if (type === ApiType.static) {
        res = config.data
      }
      // todo: 动态api，获取数据
      return toJson(res, [])
    },
    setDataStatus: ({ commit }, payload) => {
      commit('SET_DATA_STATUS', payload)
    },
    setFieldStatus: ({ commit }, payload) => {
      commit('SET_FIELD_STATUS', payload)
    },
  },
}
