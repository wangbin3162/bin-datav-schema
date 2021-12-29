import axios from 'axios'
import { getPublicPath } from '@/utils/env'
import { deepCopy, generateId } from '@/utils/util'
import ldb from '@/config/localforage-db'
import { webScreenMap } from '@/config/enum'

const PREVIEW_KEY = 'SCREEN_PREVIEW'
const CREATE_KEY = 'SCREEN_CREATE'

/**
 * 保存预览大屏数据
 * @param screenData
 * screenData:{
 *    pageInfo:'当前大屏id等基本信息',
 *    pageConfig:'page基本配置信息',
 *    comps:'大屏包含的所有组件comps'
 * }
 */
export async function saveScreenPreview(screenData) {
  screenData.pageInfo.id = screenData.pageInfo.id || `screen_${generateId()}`
  try {
    return await ldb.setItem(PREVIEW_KEY, deepCopy(screenData))
  } catch (e) {
    console.log(e)
    return null
  }
}

/**
 * 载入预览数据
 */
export async function loadScreenPreview() {
  try {
    return await ldb.getItem(PREVIEW_KEY)
  } catch (e) {
    throw new Error('404')
  }
}

/**
 * 获取静态组件数据
 * @param comId 组件id
 * @param comPath 路径，存储为根路径data数据中内容
 */
export function getStaticData(comId, comPath) {
  const path = getPublicPath(`/data/${comPath}.json?comId=${comId}`)
  return axios.get(path)
}

/**
 * 默认创建参数
 * @type {{type: string}} web mobile custom || tpl
 */
export const defaultCreateObj = {
  label: webScreenMap[0].label,
  type: 'web',
  width: 1920,
  height: 1080,
  tpl: '',
}

/**
 * 保存创建基本信息
 * @param createData
 * screenData:{
 *    pageInfo:'当前大屏id等基本信息',
 *    pageConfig:'page基本配置信息',
 *    comps:'大屏包含的所有组件comps'
 * }
 */
export async function saveCreateData(createData) {
  try {
    return await ldb.setItem(CREATE_KEY, deepCopy(createData))
  } catch (e) {
    console.log(e)
    return { ...defaultCreateObj }
  }
}

/**
 * 获取创建信息
 */
export async function getCreateData() {
  try {
    return await ldb.getItem(CREATE_KEY)
  } catch (e) {
    return { ...defaultCreateObj }
  }
}
