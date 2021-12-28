import { fetchData } from '@/api/request'
import ldb from '@/config/localforage-db'
import { findIndex, uuid } from '@/utils/util'

// 文件夹key
const FOLDER_KEY = 'DASHBOARD_FOLDER'
// 默认文件夹对象
const DEFAULT_FOLDER = {
  'id': '1',
  'text': '分析看板',
  'parentId': '0',
  'children': [{ 'id': '7f0000017da314fa817dbc02cbb800ea', 'text': '我的看板', 'parentId': '1', 'children': [] }],
}


/**
 * 获取看板目录
 */
export async function getKanbanDir() {
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) return data
    await ldb.setItem(FOLDER_KEY, DEFAULT_FOLDER)
    return DEFAULT_FOLDER
  } catch (e) {
    return DEFAULT_FOLDER
  }
}

/**
 * 创建目录
 */
export async function createFolder(folder) {
  const newObj = { id: uuid(), parentId: folder.pid, text: folder.name, children: [] }
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) { // 存在表
      data.children.push(newObj)
      await ldb.setItem(FOLDER_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 修改目录
 */
export async function modifyFolder(folder) {
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) { // 存在表
      const index = findIndex(data.children, folder.id)
      data.children[index] = { ...data.children[index], text: folder.name }
      await ldb.setItem(FOLDER_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 移除文件夹
 */
export async function removeFolder(id) {
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) { // 存在表
      const index = findIndex(data.children, id)
      data.children.splice(index, 1)
      await ldb.setItem(FOLDER_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 移除
 */
export function removeKanban(id) {
  return fetchData({
    url: '/analysis/kanban/remove',
    method: 'post',
    data: { id },
  })
}

/**
 * 获取分析看板列表
 */
export function getDashboardList(data) {
  return fetchData({
    url: '/analysis/kanban/search',
    method: 'post',
    data: {
      ...data,
      directory: 'N',
    },
  })
}

/**
 * 根据模型获取立方体数据
 */
export function getCubeById(id) {
  return fetchData({
    url: '/analysis/model/cubeById',
    method: 'post',
    data: { id },
  })
}

/**
 * 查询模型数据
 */
export function getModelDataById({ modelId, x, y, filters }) {
  return fetchData({
    url: '/analysis/component/getdata',
    method: 'post',
    data: { modelId, x, y, filters },
  })
}


/**
 * 发布已保存的看板
 */
export function publishKanban(id) {
  return fetchData({
    url: '/analysis/kanban/publish',
    method: 'post',
    data: { id },
  })
}

/**
 * 获取所有发布过的看板
 */
export function getPublishList(name) {
  return fetchData({
    url: '/analysis/kanban/publish/list',
    method: 'post',
    data: { name },
  })
}

/**
 * 保存分析看板
 * id: 当id为空时，创建看板，当id不为空时，更新看板
 * name: 看板名称
 */
export function saveKanban({ id, name, pid, status, layout, components }) {
  return fetchData({
    url: '/analysis/kanban/save',
    method: 'post',
    data: { id, name, pid, status, layout, components },
  })
}

/**
 * 载入看板详情
 */
export function loadKanban(id) {
  return fetchData({
    url: '/analysis/kanban/detail',
    method: 'post',
    data: { id },
  })
}
