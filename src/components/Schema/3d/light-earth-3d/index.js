import { loadAsyncComponent } from '@/utils/async-component'
import Main from './main.vue'

Main.install = app => {
  app.component(Main.name, Main)
  app.component(
    'VLightEarth3dConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default Main
