import { loadAsyncComponent } from '@/utils/async-component'
import BasicPie from './main.vue'

BasicPie.install = (app) => {
  app.component(BasicPie.name, BasicPie)
  app.component(
    'VBasicPieConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicPie
