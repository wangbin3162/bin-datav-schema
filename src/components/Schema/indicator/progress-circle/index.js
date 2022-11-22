import { loadAsyncComponent } from '@/utils/async-component'
import ProgressCircle from './main.vue'

ProgressCircle.install = app => {
  app.component(ProgressCircle.name, ProgressCircle)
  app.component(
    'VProgressCircleConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default ProgressCircle
