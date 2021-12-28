import { createStore, createLogger } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'
import schema from './schema'

const debug = false // process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: { app, menu, user, schema },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export function setupStore(app) {
  app.use(store)
}

export default store
