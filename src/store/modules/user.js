import { defineStore } from 'pinia'
import cookies from '@/utils/util.cookies'
import { getInfo } from '@/api/modules/login.api'
import { ACCESS_TOKEN } from '@/config/token-const'

const useUser = defineStore('user', {
  state: () => ({
    token: '', // token
    roles: '',
    userInfo: null, // user的登录信息
  }),
  getters: {},
  actions: {
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
    // 设置token
    async setToken(token) {
      try {
        cookies.set(ACCESS_TOKEN, token)
        this.token = token
        this.roles = ''
        this.userInfo = null
        return token
      } catch (e) {
        return false
      }
    },
    // 清除token
    clearToken() {
      // 删除缓存的token
      this.token = ''
      this.roles = ''
      // 删除cookie
      cookies.remove(ACCESS_TOKEN)
    },
  },
})

export default useUser
