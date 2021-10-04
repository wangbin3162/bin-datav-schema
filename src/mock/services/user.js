import Mock from 'mockjs'
import { builder, getBody } from '../util'
import menuList from '@/router/menus'

// 默认的用户名密码
const username = ['admin', 'wang']
const password = ['admin', '123456']
const testMenu = menuList

const login = (options) => {
  // 拼装请求体
  const body = getBody(options)
  if (username.includes(body.username) && password.includes(body.password)) {
    return builder({ accessToken: '4291d7da9005377ec9aec4a71ea837f' }, '', '00', { 'Custom-Header': Mock.mock('@guid') })
  }
  return builder(false, '账户或密码错误', '401')
}

const info = (options) => {
  const userInfo = {
    departCode: '10000',
    departId: 'pre_ncloud_sys_depart_10000',
    departKind: 'DOMAIN',
    departName: '信用办',
    functions: [...testMenu],
    permissions: {},
    realName: 'Wang',
    roleCodes: 'ROLE_ADMIN',
    roleNames: '王彬',
    username: 'admin',
  }
  return builder(userInfo)
}

Mock.mock(/\/user\/login/, 'post', login)
Mock.mock(/\/user\/info/, 'get', info)
