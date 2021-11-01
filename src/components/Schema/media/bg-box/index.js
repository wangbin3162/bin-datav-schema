import { loadAsyncComponent } from '@/utils/async-component'
import VBgBox from './main.vue'

VBgBox.install = (app) => {
  app.component(VBgBox.name, VBgBox)
  app.component('VBgBoxConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default VBgBox
