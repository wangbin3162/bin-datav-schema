import { loadAsyncComponent } from '@/utils/async-component'
import LineBasicScatter from './main.vue'

LineBasicScatter.install = (app) => {
  app.component(LineBasicScatter.name, LineBasicScatter)
  app.component(
    'VLineBasicScatterConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default LineBasicScatter
