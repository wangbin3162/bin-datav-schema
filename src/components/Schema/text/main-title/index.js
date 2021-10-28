import { loadAsyncComponent } from '@/utils/async-component'
import MainTitle from './main-title.vue'

MainTitle.install = (app) => {
  app.component(MainTitle.name, MainTitle)
  app.component('VMainTitleConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default MainTitle
