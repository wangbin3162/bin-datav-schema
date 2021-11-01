import { loadAsyncComponent } from '@/utils/async-component'
import BasicLine from './main.vue'

BasicLine.install = (app) => {
  app.component(BasicLine.name, BasicLine)
  app.component('VBasicLineConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default BasicLine
