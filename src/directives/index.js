import Focus from './focus'
const directives = [Focus]
export function registerDirectives(app) {
  directives.forEach(plugin => {
    app.use(plugin)
  })
}
