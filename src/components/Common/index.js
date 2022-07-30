const comps = import.meta.globEager('./*/*.vue')

export function registerCommonComps(app) {
  Object.keys(comps).forEach(key => {
    const vueComp = comps[key].default
    // 注册组件
    app.component(vueComp.name, vueComp)
  })
}
