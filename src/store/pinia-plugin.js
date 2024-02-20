import { toRaw } from 'vue'
import { deepCopy } from '@/utils/util'
import localforage from 'localforage'

const __piniaKey = '__BIN_DATAV_SCHEMA__'
localforage.config({ name: __piniaKey, version: 1 })

// 取值
const getStorage = async key => await localforage.getItem(key)

// 存储
const setStorage = async (key, value) => await localforage.setItem(key, deepCopy(value))

/**
 * 自定义插件，插件options中可以定义一个属性来开启缓存
 * 如新增 persist: true,则会缓存整个store
 * 如新增 persist: { paths: ['a', 'b'] }, 则会缓存当前store的a，b两个属性，其他的不会缓存。
 * @param {*} options 用于扩展插件缓存的用法。
 * @param {*} store
 * @returns
 */
const piniaPlugin = async ({ options, store }) => {
  const storeKey = store.$id
  const storageKey = storeKey.toUpperCase()
  const { persist } = options
  if (!persist) return

  const data = await getStorage(storageKey)

  if (data) {
    store.$state = {
      ...store.$state,
      ...toRaw(data),
    }
  }
  store.$subscribe(async () => {
    // 如果是整体缓存
    if (typeof persist === 'boolean' && persist) {
      await setStorage(storageKey, toRaw(store.$state))
    }
    // 如果是部分字段缓存
    if (typeof persist === 'object') {
      if (persist.paths && persist.paths.length > 0) {
        const temp = {}
        persist.paths.forEach(key => {
          if (store.$state[key]) {
            temp[key] = toRaw(store.$state[key])
          }
        })
        await setStorage(storageKey, temp)
      }
    }
  })
}

export default piniaPlugin
