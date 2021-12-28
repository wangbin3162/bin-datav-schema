import { ACCESS_TOKEN } from '@/config/token-const'
import request from 'axios'
import cookies from '../utils/util.cookies'
import { throwError } from '@/utils/util'
import store from '@/store'
import router from '@/router'

const baseUrl = process.env.NODE_ENV === 'production' ? '/' : '/'

const service = request.create({
  baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 60000, // 请求超时时间
})

// 获取填充数据
export async function fetchData(config) {
  try {
    const { data } = await service(config)
    if (data.code === '00') {
      return data.data
    } else {
      throw data.message
    }
  } catch (e) {
    throw Error(e)
  }
}

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    // const token = cookies.get(ACCESS_TOKEN)
    // 响应时触发错误
    throwError('request/error', data)
  }
  return Promise.reject(error)
}
/**
 * request interceptor
 */
service.interceptors.request.use(async config => {
  const token = cookies.get(ACCESS_TOKEN)
  if (token && token !== 'undefined') {
    config.headers.Authorization = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

/**
 * response interceptor
 */
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status >= 500) { // 如果是服务器端错误则跳转至服务错误页面
        router.push({ path: 'error', query: { status: '500', message: error.message } })
      } else if (error.response.status === 404) {
        router.push({ path: 'error', query: { status: '404', message: error.message } })
      }
    }
    return Promise.reject(error)
  },
)

export default service
