import { loadAsyncComponent } from '@/utils/async-component'
import BasicFunnel from './main.vue'

BasicFunnel.install = (app) => {
  app.component(BasicFunnel.name, BasicFunnel)
  app.component(
    'VBasicFunnelConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default BasicFunnel
