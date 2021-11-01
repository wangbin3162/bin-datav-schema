import { loadAsyncComponent } from '@/utils/async-component'
import VHorizontalBar from './main.vue'

VHorizontalBar.install = (app) => {
  app.component(VHorizontalBar.name, VHorizontalBar)
  app.component('VHorizontalBarConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default VHorizontalBar
