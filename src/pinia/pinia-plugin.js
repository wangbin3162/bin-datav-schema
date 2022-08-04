import { toRaw } from 'vue'
import localforage from 'localforage'
import { deepCopy } from '@/utils/util'

const __piniaKey = '__BIN_DATAV_SCHEMA__'
localforage.config({ name: __piniaKey, version: 1 })

// 取值
const getStorage = async key => await localforage.getItem(key)

// 存储
const setStorage = async (key, value) => await localforage.setItem(key, deepCopy(value))

const piniaPlugin = options => {
  return async context => {
    const { store } = context
    const storageKey = `__${options?.key ?? __piniaKey}_${store.$id}__`
    const data = await getStorage(storageKey)
    if (data) {
      store.$state = toRaw(data)
    }

    store.$subscribe(async args => {
      let arrPaths = options.paths
      if (!arrPaths?.includes(args.storeId)) return
      await setStorage(storageKey, toRaw(store.$state))
    })

    return {
      ...store.$state,
      ...data,
    }
  }
}

export default piniaPlugin
