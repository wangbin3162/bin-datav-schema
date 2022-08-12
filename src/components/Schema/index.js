const comps = import.meta.globEager('./*/*/index.js')

export function registerVCharts(app) {
  Object.keys(comps).forEach(key => {
    const vueComp = comps[key].default
    app.use(vueComp)
  })
}
