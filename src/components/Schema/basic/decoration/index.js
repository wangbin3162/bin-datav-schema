import { loadAsyncComponent } from '@/utils/async-component'
import Decoration from './main.vue'

Decoration.install = (app) => {
  app.component(Decoration.name, Decoration)
  app.component('VDecorationConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default Decoration
