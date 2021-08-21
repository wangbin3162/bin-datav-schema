import { createApp } from 'vue'
import App from './App.vue'
import { registerUI } from './plugins/bin-ui'
import 'bin-ui-next/lib/styles/normalize.css' // 初始化样式
import 'bin-ui-next/lib/styles/index.css' // 组件库样式
import './assets/stylus/index.styl' // 项目样式

const app = createApp(App)
registerUI(app)
app.mount('#app', true)
