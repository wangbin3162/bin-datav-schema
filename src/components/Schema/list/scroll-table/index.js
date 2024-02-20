import { loadAsyncComponent } from '@/utils/async-component'
import ScrollTable from './main.vue'

ScrollTable.install = (app) => {
  app.component(ScrollTable.name, ScrollTable)
  app.component('VScrollTableConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default ScrollTable
