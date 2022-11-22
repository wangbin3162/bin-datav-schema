import ldb from '@/config/localforage-db'
import { getPublicPath } from '@/utils/env'
import { deepCopy, findIndex } from '@/utils/util'
import { defaultGroup } from './default'
// 图片相关接口存储数据等

const IMAGES_GROUP = 'IMAGES_GROUP'

// 获取图片分组
export async function getImagesGroup() {
  try {
    const data = await ldb.getItem(IMAGES_GROUP)
    if (data) {
      return data
    }
    await ldb.setItem(IMAGES_GROUP, defaultGroup)
    return defaultGroup
  } catch (e) {
    return []
  }
}

// 创建图片分组
export async function createImagesGroup(group) {
  try {
    const data = await ldb.getItem(IMAGES_GROUP)
    if (data) {
      data.push(group)
      await ldb.setItem(IMAGES_GROUP, deepCopy(data))
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

// 修改图片分组
export async function modifyImagesGroup(item) {
  try {
    const data = await ldb.getItem(IMAGES_GROUP)
    if (data) {
      // 修改
      const index = findIndex(data, item.key, 'key')
      data[index].value = item.value
      await ldb.setItem(IMAGES_GROUP, deepCopy(data))
      return item.key
    }
    return false
  } catch (e) {
    return false
  }
}

// 移除图片分组
export async function removeImagesGroup(key) {
  try {
    const data = await ldb.getItem(IMAGES_GROUP)
    if (data) {
      // 存在表
      const index = findIndex(data, key, 'key')
      data.splice(index, 1)
      await ldb.setItem(IMAGES_GROUP, data)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}
