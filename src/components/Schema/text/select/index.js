import { loadAsyncComponent } from '@/utils/async-component'
import Select from './main.vue'

Select.install = app => {
  app.component(Select.name, Select)
  app.component(
    'VSelectConfig',
    loadAsyncComponent(() => import('./config.vue')),
  )
}

export default Select
