// 获取基础列表
import { fetchData } from '../request'

export function getRoleList() {
  return fetchData({
    url: '/role/list',
    method: 'get',
  })
}
