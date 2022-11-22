import { loadAsyncComponent } from '@/utils/async-component'
import BasicBoxplot from './main.vue'

BasicBoxplot.install = app => {
  app.component(BasicBoxplot.name, BasicBoxplot)
  app.component(
    'VBasicBoxplotConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicBoxplot
