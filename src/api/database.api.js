import axios from 'axios'
import { getPublicPath } from '@/utils/env'
import { deepCopy, generateId } from '@/utils/util'
import ldb from '@/config/localforage-db'
import dayjs from 'dayjs'

// 保存测试mock的screen数据值列表
async function saveMockScreen2List(id, name) {
  try {
    const { data: list } = await getAnalysisList()
    const index = list.findIndex(i => i.id === id)
    if (index > -1) {
      const obj = list[index]
      list.splice(index, 1, {
        id,
        datasetName: name,
        datasourceName: '探索空间',
        creator: obj.creator,
        updater: obj.updater,
        updateDate: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      })
    } else {
      list.push({
        id,
        datasetName: name,
        datasourceName: '探索空间',
        creator: '316281400@qq.com',
        updater: '316281400@qq.com',
        updateDate: dayjs().format('YYYY/MM/DD HH:mm:ss'),
      })
    }
    // 再保存list
    await ldb.setItem('list', deepCopy(list))
  } catch (e) {
    console.log('save mock screen data fail.')
  }
}

/**
 * 模拟分析看板数列表
 */
export async function getAnalysisList() {
  const key = 'list'
  try {
    const list = await ldb.getItem(key)
    if (list && list.length) { // 如果列表数据库中存在则直接返回，否则去获取mock数据
      return { data: list }
    }
    const { data } = await axios.get(getPublicPath(`/data/mock/${key}.json`))
    await ldb.setItem(key, data)
    return { data }
  } catch (e) {
    console.log(e)
    return []
  }
}

/**
 * 模拟数据，可在外部修改，模拟两个id保存的数据内容
 * @param id 大屏分析id
 */
export async function loadScreen(id) {
  try {
    const data = await ldb.getItem(id)
    if (data) { // 如果列表数据库中存在则直接返回，否则去获取mock数据
      return { data }
    } else {
      const { data } = await axios.get(getPublicPath(`/data/mock/${id}.json`))
      await ldb.setItem(id, data)
      return { data }
    }
  } catch (e) {
    throw new Error('404')
  }
}

/**
 * 保存大屏数据
 * @param id 大屏id
 * @param screenData
 * screenData:{
 *    pageInfo:'当前大屏id等基本信息',
 *    pageConfig:'page基本配置信息',
 *    comps:'大屏包含的所有组件comps'
 * }
 */
export async function saveScreen(id, screenData) {
  const key = id || `screen_${generateId()}`
  screenData.pageInfo.id = key
  try {
    const data = await ldb.setItem(key, deepCopy(screenData))
    await saveMockScreen2List(key, data.pageInfo.name)
    return { data }
  } catch (e) {
    console.log(e)
    return null
  }
}

/**
 * 删除一个大屏数据
 * @param id
 */
export async function removeScreen(id) {
  try {
    const { data: list } = await getAnalysisList()
    const index = list.findIndex(i => i.id === id)
    if (index > -1) {
      list.splice(index, 1)
      // 先删除id key
      await ldb.removeItem(id)
      // 再保存list
      await ldb.setItem('list', deepCopy(list))
      return true
    }
    return false
  } catch (e) {
    console.log(e)
    return false
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
