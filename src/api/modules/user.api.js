// 获取基础列表
import { fetchData } from '../request'

export function getUserList() {
  return fetchData({
    url: '/user/list',
    method: 'get',
  })
}
