import { fetchData } from '../request'

/**
 * 获取模型列表
 */
export function getModeDir() {
  return fetchData({
    url: '/analysis/model/dir',
    method: 'post',
  })
}

/**
 * 获取模型所需的枚举
 */
export function getModelEnum(arr) {
  return fetchData({
    url: '/management/enum/common',
    method: 'post',
    data: arr,
  })
}

/**
 * 获取模型列表
 */
export function getModelList(data) {
  return fetchData({
    url: '/analysis/model/list',
    method: 'post',
    data,
  })
}

/**
 * 获取数据中心的表
 */
export function getDbCenterTables(data) {
  return fetchData({
    url: '/analysis/db/gettables',
    method: 'post',
    data,
  })
}

/**
 * 创建目录或模型
 */
export function createModelOrFolder(data) {
  return fetchData({
    url: '/analysis/model/create',
    method: 'post',
    data,
  })
}

/**
 * 修改目录或模型
 */
export function modifyModelOrFolder(data) {
  return fetchData({
    url: '/analysis/model/modify',
    method: 'post',
    data,
  })
}

/**
 * 模型详情
 */
export function getModelDetail(id) {
  return fetchData({
    url: '/analysis/model/detail',
    method: 'post',
    data: { id },
  })
}

/**
 * 获取已配置的表
 */
export function getModelTables(id) {
  return fetchData({
    url: '/analysis/model/gettables',
    method: 'post',
    data: { id },
  })
}

/**
 * 获取配置schema
 */
export function getModelSchema(id) {
  return fetchData({
    url: '/analysis/model/schema',
    method: 'post',
    data: { id },
  })
}

/**
 * 保存配置schema
 */
export function saveModelSchema(modelId, physicalSchema, fields) {
  return fetchData({
    url: '/analysis/model/save',
    method: 'post',
    data: {
      modelId,
      physicalSchema,
      fields,
    },
  })
}

/**
 * 移除模型
 */
export function removeModel(id) {
  return fetchData({
    url: '/analysis/model/remove',
    method: 'post',
    data: { id },
  })
}

/**
 * 刷新数据
 */
export function refreshData(modelId, physicalSchema, fields) {
  return fetchData({
    url: '/analysis/model/getdata',
    method: 'post',
    data: {
      modelId,
      physicalSchema,
      fields,
    },
  })
}

/**
 * 获取模型树形结构
 */
export function getModelTree() {
  return fetchData({
    url: '/analysis/model/tree',
    method: 'post',
  })
}
