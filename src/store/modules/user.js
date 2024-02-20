import { defineStore } from 'pinia'
import { getInfo } from '@/api/modules/login.api'
import { persistenceToken, removeRersistenceToken } from '@/utils/refresh'
import { store } from '@/store'

const useUser = defineStore('user', {
  state: () => ({
    token: '', // token
    roles: '',
    userInfo: null, // user的登录信息
  }),
  getters: {},
  actions: {
    // 设置token
    async setToken({ token, refreshToken, expires }) {
      try {
        persistenceToken(token, refreshToken, expires)
        this.token = token
        this.roles = ''
        this.userInfo = null
        return token
      } catch (e) {
        return false
      }
    },
    // 设置刷新token
    async setTokenForRefresh({ token, refreshToken, expires }) {
      persistenceToken(token, refreshToken, expires)
      this.token = token
      return token
    },
    // 清除token
    clearToken() {
      // 删除缓存的token
      this.token = ''
      this.roles = ''
      // 删除cookie
      removeRersistenceToken()
    },
    // 获取用户信息
    async getUserInfo() {
      const { data } = await getInfo()
      if (data.code === '00') {
        const userInfo = data.data
        this.userInfo = userInfo
        this.roles = userInfo.roleCodes
        return userInfo
      } else {
        throw new Error(data.message)
      }
    },
  },
})

export default useUser

export function useUserStoreWithOut() {
  return useUser(store)
}
