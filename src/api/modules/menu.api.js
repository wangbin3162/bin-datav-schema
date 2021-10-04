import { fetchData } from '../request'

// 获取基础部门树
export function getMenuTree() {
  return fetchData({
    url: '/menu/tree',
    method: 'get',
  })
}
