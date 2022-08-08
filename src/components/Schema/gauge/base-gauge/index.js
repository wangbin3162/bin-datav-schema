import { loadAsyncComponent } from '@/utils/async-component'
import BasicGauge from './main.vue'

BasicGauge.install = (app) => {
  app.component(BasicGauge.name, BasicGauge)
  app.component(
    'VBasicGaugeConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicGauge
