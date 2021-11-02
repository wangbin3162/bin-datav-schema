import { loadAsyncComponent } from '@/utils/async-component'
import BasicArea from './main.vue'

BasicArea.install = (app) => {
  app.component(BasicArea.name, BasicArea)
  app.component('VBasicAreaConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default BasicArea
