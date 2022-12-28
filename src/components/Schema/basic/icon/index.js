import { loadAsyncComponent } from '@/utils/async-component'
import Icon from './main.vue'

Icon.install = app => {
  app.component(Icon.name, Icon)
  app.component(
    'VIconConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default Icon
