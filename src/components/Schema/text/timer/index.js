import { loadAsyncComponent } from '@/utils/async-component'
import VTimer from './main.vue'

VTimer.install = (app) => {
  app.component(VTimer.name, VTimer)
  app.component('VTimerConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default VTimer
