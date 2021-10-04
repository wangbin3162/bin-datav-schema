import { fetchData } from '../request'

// 根据workspaceId获取左侧表数据
export function getTableList(workspaceId) {
  return fetchData({
    url: '/dataset/listByDsId',
    method: 'get',
    params: { workspaceId },
  })
}

// 根据id和 workspaceId 查询已有的节点
export function getSchema({ workspaceId, id }) {
  return fetchData({
    url: '/dataset/schema',
    method: 'get',
    params: { workspaceId, id },
  })
}
