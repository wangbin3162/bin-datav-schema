import { createStore, createLogger } from 'vuex'
import schema from './schema'

const debug = false // process.env.NODE_ENV !== 'production'
const store = createStore({
  modules: { schema },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
})

export function setupStore(app) {
  app.use(store)
}

export default store
