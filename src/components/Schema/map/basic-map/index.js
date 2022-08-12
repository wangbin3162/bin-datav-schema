import { loadAsyncComponent } from '@/utils/async-component'
import BasicMap from './main.vue'

BasicMap.install = app => {
  app.component(BasicMap.name, BasicMap)
  app.component(
    'VBasicMapConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicMap
