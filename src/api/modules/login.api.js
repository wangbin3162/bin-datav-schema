import request from '../request'

/**
 * 登录方法
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: data,
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
