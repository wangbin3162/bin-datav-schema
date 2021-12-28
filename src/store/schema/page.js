import { MoveType } from '@/config/enum'
import { deepCopy, generateId, isEmpty } from '@/utils/util'

const findComIndex = (comps, id) => comps.findIndex(c => c.id === id)

const findCom = (comps, id) => comps.find(c => c.id === id)

// 模拟后端复制
const getNewCom = (com) => {
  const ncom = deepCopy(com)
  ncom.id = `${ncom.name}_${generateId()}`
  ncom.alias += '_copy'
  ncom.attr.x += 50
  ncom.attr.y += 50


  if (!isEmpty(ncom.apiData)) {
    ncom.apiData.id = `api_${generateId()}`
    ncom.apiData.comId = ncom.id
  }

  return ncom
}

const defaultInfo = {
  pid: '1',
  id: '',
  name: '',
}

const defaultPageCfg = {
  width: 1920,
  height: 1080,
  bgColor: '#0d2a42',
  bgImage: '',
  grid: 1, // 拖拽间隔
  thumbnail: '',
}

export default {
  state: {
    // 当前页面信息
    pageInfo: { ...defaultInfo },
    // 页面存储数据
    pageConfig: { ...defaultPageCfg },
    comps: [], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    selectedCom: null, // 单选选中的可拖拽组件
    hoveredCom: '',// 悬停的组件缓存，保存的内容为id
    renamingId: '',// 重命名的id
  },
  mutations: {
    SET_SIZE: (state, { width, height }) => {
      state.pageConfig.width = width
      state.pageConfig.height = height
    },
    SET_INFO: (state, info) => {
      state.pageInfo = info || { ...defaultInfo }
    },
    SET_PAGE_CFG: (state, cfg) => {
      state.pageConfig = cfg || { ...defaultPageCfg }
    },
    SET_COMPS: (state, comps) => {
      state.comps = comps || []
    },
    ADD_COM(state, { component, index }) {
      if (index !== undefined) {
        state.comps.splice(index, 0, component)
      } else {
        state.comps.push(component)
      }
    },
    COPY_COM(state, id) {
      const ocom = findCom(state.comps, id)
      if (ocom) {
        const ncom = getNewCom(ocom)
        state.comps.push(ncom)
        state.selectedCom = ncom
      }
    },
    DELETE_COM(state, id) {
      const i = findComIndex(state.comps, id)
      state.comps.splice(i, 1)
    },
    SELECT_COM: (state, component) => {
      state.selectedCom = component
    },
    HOVER_COM: (state, id) => {
      state.hoveredCom = id
    },
    RENAMING_COM: (state, id) => {
      state.renamingId = id
    },
    MOVE_COM: (state, { id, moveType }) => {
      const i = findComIndex(state.comps, id)

      if (moveType === MoveType.up) {
        if (i + 1 < state.comps.length) {
          state.comps.splice(i + 1, 0, ...state.comps.splice(i, 1))
        }
      } else if (moveType === MoveType.down) {
        if (i > 0) {
          state.comps.splice(i - 1, 0, ...state.comps.splice(i, 1))
        }
      } else if (moveType === MoveType.top) {
        if (i + 1 < state.comps.length) {
          state.comps.push(...state.comps.splice(i, 1))
        }
      } else if (moveType === MoveType.bottom) {
        if (i > 0) {
          state.comps.unshift(...state.comps.splice(i, 1))
        }
      }
    },
    SET_SINGLE_STYLE: (state, { key, value }) => {
      if (!state.selectedCom) return
      state.selectedCom.attr[key] = value
    },
  },
  actions: {
    setPageInfo: ({ commit, state }, info) => {
      commit('SET_INFO', info)
    },
    addCom: ({ commit }, { component, index }) => {
      commit('ADD_COM', { component, index })
    },
    copyCom: ({ commit }, id) => {
      commit('COPY_COM', id)
    },
    deleteCom: ({ commit }, id) => {
      commit('DELETE_COM', id)
    },
    selectedCom: ({ commit }, component) => {
      commit('SELECT_COM', component)
    },
    hoveredCom: ({ commit }, id) => {
      commit('HOVER_COM', id)
    },
    renamingCom: ({ commit }, id) => {
      commit('RENAMING_COM', id)
    },
    moveCom: ({ commit }, { id, moveType }) => {
      commit('MOVE_COM', { id, moveType })
    },
    setShapeSingleStyle: ({ commit }, { key, value }) => {
      commit('SET_SINGLE_STYLE', { key, value })
    },
    // 载入全屏数据
    loadScreenData: async ({ commit }, screenData) => {
      const { pageInfo, pageConfig, comps } = screenData
      commit('SET_INFO', pageInfo)
      commit('SET_PAGE_CFG', pageConfig)
      commit('SET_COMPS', comps)
    },
    // 设置screen size
    setScreenSize: async ({ commit }, screenSize) => {
      commit('SET_SIZE', screenSize)
    },
    clearScreen: ({ commit }) => {
      commit('SELECT_COM', null)
      commit('HOVER_COM', '')
      commit('RENAMING_COM', '')
      commit('SET_COMPS', [])
    },
  },
}
