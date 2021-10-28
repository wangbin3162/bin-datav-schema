import { loadAsyncComponent } from '@/utils/async-component'
import BorderBox from './main.vue'

BorderBox.install = (app) => {
  app.component(BorderBox.name, BorderBox)
  app.component('VBorderBoxConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default BorderBox
