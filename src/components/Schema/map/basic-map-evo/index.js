import { loadAsyncComponent } from '@/utils/async-component'
import BasicMapEvo from './main.vue'

BasicMapEvo.install = app => {
  app.component(BasicMapEvo.name, BasicMapEvo)
  app.component(
    'VBasicMapEvoConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicMapEvo
