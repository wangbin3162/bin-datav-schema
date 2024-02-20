import { loadAsyncComponent } from '@/utils/async-component'
import VDatePicker from './main.vue'

VDatePicker.install = (app) => {
  app.component(VDatePicker.name, VDatePicker)
  app.component('VDatePickerConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default VDatePicker
