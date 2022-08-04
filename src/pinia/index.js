import { createPinia, storeToRefs } from 'pinia'
import piniaPlugin from './pinia-plugin'
import useGlobal from './modules/global'
import useUser from './modules/user'
import useMenu from './modules/menu'

// 注册store及插件信息
export function setupStore1(app) {
  const store = createPinia()
  store.use(
    piniaPlugin({
      key: 'store',
      paths: [],
    }),
  )
  app.use(store)
}

// 统一的store获取
export function useStore() {
  return {
    storeToRefs,
    globalStore: useGlobal(),
    userStore: useUser(),
    menuStore: useMenu(),
  }
}
