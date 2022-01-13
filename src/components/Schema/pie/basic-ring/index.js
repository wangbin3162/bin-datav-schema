import { loadAsyncComponent } from '@/utils/async-component'
import BasicRing from './main.vue'

BasicRing.install = (app) => {
  app.component(BasicRing.name, BasicRing)
  app.component(
    'VBasicRingConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicRing
