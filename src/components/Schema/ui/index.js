import GLoading from './g-loading/index.vue'
import GBreadcrumb from './g-breadcrumb/index.vue'
import { defineAsyncComponent } from 'vue'
import Focus from '@/directives/focus'

const components = [
  GLoading,
  GBreadcrumb,
]
const plugins = [
  Focus,
]

// 注册gui
export function registerGUI(app) {
  // sync register
  components.forEach(component => {
    app.component(component.name, component)
  })
  // async register
  app.component('GField', defineAsyncComponent(() => import('./g-field/index.vue')))
  app.component('GFieldCollapse', defineAsyncComponent(() => import('./g-field-collapse/index.vue')))
  app.component('GImagesSelect', defineAsyncComponent(() => import('./g-images-select/index.vue')))
  app.component('GInput', defineAsyncComponent(() => import('./g-input/index.vue')))
  app.component('GInputNumber', defineAsyncComponent(() => import('./g-input-number/index.vue')))
  app.component('GSelect', defineAsyncComponent(() => import('./g-select/index.vue')))
  app.component('GGroupSelect', defineAsyncComponent(() => import('./g-group-select/index.vue')))
  app.component('GSlider', defineAsyncComponent(() => import('./g-slider/index.vue')))
  app.component('GColorPicker', defineAsyncComponent(() => import('./g-color-picker/index.vue')))
  app.component('GUploadImg', defineAsyncComponent(() => import('./g-upload-img/index.vue')))
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
