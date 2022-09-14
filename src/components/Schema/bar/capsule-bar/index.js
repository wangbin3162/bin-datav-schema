import { loadAsyncComponent } from '@/utils/async-component'
import VCapsuleBar from './main.vue'

VCapsuleBar.install = app => {
  app.component(VCapsuleBar.name, VCapsuleBar)
  app.component(
    'VCapsuleBarConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default VCapsuleBar
