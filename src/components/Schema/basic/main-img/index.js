import { loadAsyncComponent } from '@/utils/async-component'
import MainImg from './main.vue'

MainImg.install = (app) => {
  app.component(MainImg.name, MainImg)
  app.component('VMainImgConfig', loadAsyncComponent(() => import('./config.vue')))
}

export default MainImg
