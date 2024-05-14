const comps = import.meta.glob('./*/*.vue', { eager: true })

export function registerCommonComps(app) {
  Object.keys(comps).forEach(key => {
    const vueComp = comps[key].default
    // 注册组件
    app.component(vueComp.name, vueComp)
  })
}
