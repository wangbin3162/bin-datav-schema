import { loadAsyncComponent } from '@/utils/async-component'
import Image from './main.vue'

Image.install = app => {
  app.component(Image.name, Image)
  app.component(
    'VTopoConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default Image
