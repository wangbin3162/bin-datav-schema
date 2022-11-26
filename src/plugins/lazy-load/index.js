import LazyPlugin from 'vue3-lazy'
import defaultImg from '@/assets/images/default/img-default.png'
import errorImg from '@/assets/images/default/img-default.png'

export function registerLazy(app) {
  app.use(LazyPlugin, { loading: defaultImg, error: errorImg })
}
