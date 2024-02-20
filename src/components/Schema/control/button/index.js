import { loadAsyncComponent } from '@/utils/async-component'
import VButton from './main.vue'

VButton.install = app => {
  app.component(VButton.name, VButton)
  app.component(
    'VButtonConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default VButton
