import { createStore, createLogger } from 'vuex'
import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'
import tagsView from './modules/tagsView'
import links from './modules/links'
import todos from './modules/todos'
import schema from './schema'

const debug = false // process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: { app, user, menu, tagsView, links, todos, schema },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export function setupStore(app) {
  app.use(store)
  store.dispatch('app/loadApp')
}

export default store
