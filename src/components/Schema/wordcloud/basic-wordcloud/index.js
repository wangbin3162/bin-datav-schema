import { loadAsyncComponent } from '@/utils/async-component'
import VBasicWordCloud from './main.vue'

VBasicWordCloud.install = (app) => {
  app.component(VBasicWordCloud.name, VBasicWordCloud)
  app.component(
    'VBasicWordCloudConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default VBasicWordCloud
