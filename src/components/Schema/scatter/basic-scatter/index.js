import { loadAsyncComponent } from '@/utils/async-component'
import BasicScatter from './main.vue'

BasicScatter.install = app => {
  app.component(BasicScatter.name, BasicScatter)
  app.component(
    'VBasicScatterConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicScatter
