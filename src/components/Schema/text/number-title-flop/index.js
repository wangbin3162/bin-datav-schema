import { loadAsyncComponent } from '@/utils/async-component'
import NumberTitleFlop from './main.vue'

NumberTitleFlop.install = (app) => {
  app.component(NumberTitleFlop.name, NumberTitleFlop)
  app.component('VNumberTitleFlopConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default NumberTitleFlop
