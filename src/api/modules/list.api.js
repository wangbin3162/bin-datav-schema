import { fetchData } from '../request'

// 获取基础列表
export function getBaseList() {
  return fetchData({
    url: '/list/base',
    method: 'get',
  })
}

// 获取文章列表
export function getArticleList() {
  return fetchData({
    url: '/list/articles',
    method: 'get',
  })
}

// 获取项目列表
export function getProjectList() {
  return fetchData({
    url: '/list/projects',
    method: 'get',
  })
}
