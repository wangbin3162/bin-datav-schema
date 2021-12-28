import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { registerUI } from '@/plugins/bin-ui-next'
import { registerCharts } from '@/plugins/bin-charts-next'
import { registerEditor } from '@/plugins/bin-editor-next'
import { registerDatav } from '@/plugins/bin-datav'
import { registerVCharts } from '@/components/Schema'
import { registerGUI } from '@/components/Schema/ui'
import 'bin-ui-next/lib/styles/normalize.css' // 初始化样式
import 'bin-ui-next/lib/styles/scrollbar.css' // 滚动条样式
import 'bin-ui-next/lib/styles/index.css' // 组件库样式
import 'bin-datav/lib/styles/index.css'
import '@/assets/stylus/index.styl' // 项目样式

/**
 * mock 模块
 * 注意：线上版本需要首先移除mock模块再进行调试，切记切记！！！
 */
// if (process.env.NODE_ENV !== 'production') {
// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
import './mock'
// }

const app = createApp(App)
registerUI(app)
registerCharts(app)
registerEditor(app)
registerDatav(app)
registerVCharts(app)
registerGUI(app)
setupRouter(app)
setupStore(app)
// Mount when the route is ready
router.isReady().then(() => {
  app.mount('#app', true)
})
