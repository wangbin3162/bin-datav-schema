const comps = import.meta.glob('./*/*/index.js', { eager: true })
import group from './group'

export function registerVCharts(app) {
  Object.keys(comps).forEach(key => {
    const vueComp = comps[key].default
    app.use(vueComp)
  })
  // 注册组
  app.use(group)
}
