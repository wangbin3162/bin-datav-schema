import { loadAsyncComponent } from '@/utils/async-component'
import BasicBar from './main.vue'

BasicBar.install = (app) => {
  app.component(BasicBar.name, BasicBar)
  app.component('VBasicBarConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default BasicBar
