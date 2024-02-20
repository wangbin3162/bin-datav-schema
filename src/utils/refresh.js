import axios from 'axios'
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_EXPIRES, TIME_RECORD } from '@/config/token-const'
import { CLIENT_ID, CLIENT_SECRET } from '@/config/client-const'
import cookies from './util.cookies'
import { throwError } from './util'
import { useStore } from '@/store'

// 专用于刷新token接口的axios实例，用于请求时不会触发主实例的拦截器，不影响原有流程。
const req = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 60000,
})

// 刷新token接口
async function refreshTokenApi(refresh_token) {
  const res = await req({
    url: '/oauth/token',
    method: 'post',
    params: {
      grant_type: 'refresh_token',
      refresh_token,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    },
  })
  if (res.data.successful) {
    return res.data.data
  } else {
    const error = new Error('认证无效或者已过期')
    error.statusCode = 401
    throw error
  }
}

// 持久化保存登录后的token、refreshToken、expires
function persistenceToken(token, refreshToken, expires) {
  // 计算登录token过期时间
  const expiresTime = new Date(Date.now() + expires * 1000)
  // 保存登录token
  cookies.set(ACCESS_TOKEN, token, { expires: expiresTime })
  // 保存请求刷新token接口时使用的token
  localStorage.setItem(REFRESH_TOKEN, refreshToken)
  // 保存本次token的过期时间,用于每次点击的时候判断此次点击是否到达了刷新token的时间,相关逻辑在APP.vue文件内
  localStorage.setItem(TOKEN_EXPIRES, expires)
}

// 清除持久化的token、refreshToken、expires、timeRecord
function removeRersistenceToken() {
  cookies.remove(ACCESS_TOKEN)
  localStorage.removeItem(REFRESH_TOKEN)
  localStorage.removeItem(TOKEN_EXPIRES)
  localStorage.removeItem(TIME_RECORD)
}

// 在合适的间隔时机刷新token
async function refreshToken() {
  const { userStore } = useStore()
  try {
    const tiemRecord = localStorage.getItem(TIME_RECORD)
    let stack = tiemRecord ? JSON.parse(tiemRecord) : []
    const curTime = Date.now()
    if (stack.length === 0) {
      // 判断是否时初次操作
      stack = [curTime, curTime]
    } else {
      stack.splice(0, 1)
      stack.push(curTime)
    }
    localStorage.setItem(TIME_RECORD, JSON.stringify(stack))

    const token = cookies.get(ACCESS_TOKEN)
    const exporesTime = localStorage.getItem(TOKEN_EXPIRES)
    // 如果token失效，登录时token失效，token值不会存在，但是存在exporesTiem，如果都不存在则表名没有登录
    if (!token && exporesTime) {
      const timeDiff = stack[1] - stack[0]
      // 判断两次操作时间间隔，如果小于过期时间
      if (timeDiff <= exporesTime * 1000) {
        // 换算成毫秒，后端返回的有效期单位为秒
        // 刷新token
        // 读取用于刷新token的token
        const reToken = localStorage.getItem(REFRESH_TOKEN)
        const { accessToken: token, refreshToken, expiresIn: expires } = await refreshTokenApi(reToken)
        userStore.setTokenForRefresh({ token, refreshToken, expires })
      } else {
        // 刷新token失败也清除相关数据
        userStore.clearToken()
      }
    }
  } catch (error) {
    // 刷新token失败也清除相关数据
    userStore.clearToken()
    throwError('refresh/refreshToken', error)
  }
}

export { refreshToken, persistenceToken, removeRersistenceToken }
