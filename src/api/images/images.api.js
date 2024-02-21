import ldb from '@/config/localforage-db'
import { deepCopy, findIndex, uuid } from '@/utils/util'
import { defaultGroup, defaultGroupKeys, getPresetImages } from './default'
// 图片相关接口存储数据等

const IMAGES_GROUP = 'IMAGES_GROUP' // 图片库分组
const IMAGES_LIB = 'IMAGES_LIB' // 图片库分组内容

const _getImagesGroupList = async () => ldb.getItem(IMAGES_GROUP)
const _setImagesGroup = async data => ldb.setItem(IMAGES_GROUP, deepCopy(data))

const _getImagesList = async () => ldb.getItem(IMAGES_LIB)
const _setImages = async data => ldb.setItem(IMAGES_LIB, deepCopy(data))

// 获取图片分组
export async function getImagesGroup() {
  try {
    const data = await _getImagesGroupList()
    if (data) {
      return data
    }
    await _setImagesGroup([])
    return []
  } catch (e) {
    return []
  }
}

// 创建图片分组
export async function createImagesGroup(group) {
  try {
    const data = await _getImagesGroupList()
    if (data) {
      data.push(group)
      await _setImagesGroup(data)
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
    const data = await _getImagesGroupList()
    if (data) {
      // 修改
      const index = findIndex(data, item.key, 'key')
      data[index].value = item.value
      await _setImagesGroup(data)
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
    const data = await _getImagesGroupList()
    if (data) {
      // 存在表
      const index = findIndex(data, key, 'key')
      data.splice(index, 1)
      await _setImagesGroup(data)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

// 根据不同的组，载入组内的图片列表
export async function getImagesByGroup(groupKey) {
  try {
    // 获取预设图片，此处可以直接丢入public目录，同事配好配置项，进行载入
    if (defaultGroupKeys.includes(groupKey)) return await getPresetImages(groupKey)
    // 先获取全部已存储的组件，并进行筛选
    const data = await _getImagesList()
    if (data) {
      // 根据返回的图片信息，获取拼接的组件列表
      return data.filter(i => i.groupKey === groupKey).reverse()
    }
    return []
  } catch (e) {
    return []
  }
}

// 保存一组图片至一个组
export async function uploadImagesToGroup(files) {
  try {
    const saveData = files.map(file => ({ id: uuid(), ...file }))
    const data = await _getImagesList() // 先获取全部已存储的图片信息，并拼接设置
    if (data) {
      const newList = data.concat(saveData)
      await _setImages(newList)
      return true
    }
    await _setImages(saveData)
    return false
  } catch (e) {
    return false
  }
}

// 删除一个组中的一张图片
export async function removeImage(groupKey, id) {
  try {
    // 先获取全部已存储的组件，并进行筛选
    const data = await _getImagesList()
    if (data) {
      const images = data.filter(i => i.groupKey === groupKey)
      const index = findIndex(images, id)
      images.splice(index, 1)
      await _setImages(images)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}
