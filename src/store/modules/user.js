import { getInfo } from '@/api/modules/login.api'
import { ACCESS_TOKEN } from '@/config/token-const'
import cookies from '@/utils/util.cookies'

export default {
  namespaced: true,
  state: {
    token: '', // token
    roles: [],
    userInfo: null // user的登录信息
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.userInfo = info
    }
  },
  actions: {
    // 设置token
    setToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        try {
          cookies.set(ACCESS_TOKEN, token)
          commit('SET_TOKEN', token)
          commit('SET_ROLES', [])
          commit('SET_INFO', null)
          resolve(token)
        } catch (e) {
          reject(e)
        }
      })
    },
    // 清除token
    clearToken({ commit }) {
      // 删除缓存的token
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      // 删除cookie
      cookies.remove(ACCESS_TOKEN)
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
      const { data } = await getInfo()
      if (data.code === '00') {
        commit('SET_ROLES', data.data.roleCodes)
        commit('SET_INFO', data.data)
        return data.data
      } else {
        throw new Error(data.message)
      }
    }
  }
}
