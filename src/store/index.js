import { createPinia, storeToRefs } from 'pinia'
// import piniaPlugin from './pinia-plugin'
import useUser from './modules/user'
import useSchema from './schema/index'

const store = createPinia()
// 注册store及插件信息
export function setupStore(app) {
  // store.use(piniaPlugin)
  app.use(store)
}

// 统一的store获取
export function useStore() {
  return {
    storeToRefs,
    userStore: useUser(),
    schemaStore: useSchema(),
  }
}

export { store }
