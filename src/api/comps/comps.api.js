import ldb from '@/config/localforage-db'
import { deepCopy, findIndex, uuid } from '@/utils/util'
import { defaultGroup } from './default'
// 组件相关接口存储数据等

const COMPS_GROUP = 'COMPS_GROUP' // 组件库分组

const COMPS_LIB = 'COMPS_LIB' // 组件库下面的组件列表

const _getCompsGroupList = async () => ldb.getItem(COMPS_GROUP)
const _setCompsGroup = async data => ldb.setItem(COMPS_GROUP, deepCopy(data))

const _getCompsList = async () => ldb.getItem(COMPS_LIB)
const _setComps = async data => ldb.setItem(COMPS_LIB, deepCopy(data))

// 获取组件分组
export async function getCompGroup() {
  try {
    const data = await _getCompsGroupList()
    if (data) return data

    const defaultList = deepCopy(defaultGroup)
    await _setCompsGroup(defaultList)
    return defaultList
  } catch (e) {
    return []
  }
}

// 创建组件分组
export async function createCompGroup(group) {
  try {
    const data = await _getCompsGroupList()
    if (data) {
      data.push(group)
      await _setCompsGroup(data)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

// 修改组件分组
export async function modifyCompGroup(item) {
  try {
    const data = await _getCompsGroupList()
    if (data) {
      // 修改
      const index = findIndex(data, item.key, 'key')
      data[index].value = item.value
      await _setCompsGroup(data)
      return item.key
    }
    return false
  } catch (e) {
    return false
  }
}

// 移除组件分组
export async function removeCompGroup(key) {
  try {
    const data = await _getCompsGroupList()
    if (data) {
      // 存在表
      const index = findIndex(data, key, 'key')
      data.splice(index, 1)
      await _setCompsGroup(data)
      return true
    }
    return false
  } catch (e) {
    return false
  }
}

// 保存一个组件至指定的组件分组内
export async function saveComps(groupKey, comp) {
  try {
    const saveData = { id: uuid(), group: groupKey, comp }
    const data = await _getCompsList() // 先获取全部已存储的组件，并拼接设置
    if (data) {
      data.push(saveData)
      await _setComps(data)
      return true
    }
    await _setComps([saveData])
    return false
  } catch (e) {
    return false
  }
}

// 根据不同的组，载入组内的组件列表
export async function getCompsByGroup(groupKey) {
  try {
    const data = await _getCompsList() // 先获取全部已存储的组件，并进行筛选
    if (data) return data.filter(i => i.group === groupKey)
    return []
  } catch (e) {
    return []
  }
}
