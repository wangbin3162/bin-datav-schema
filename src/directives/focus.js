export default {
  install(app) {
    app.directive('focus', {
      mounted(el) {
        const defaultValue = el.getAttribute('default-value')
        if (defaultValue) {
          el.value = defaultValue
        }
        el.focus()
        const input = el.querySelector('input')
        if (input) input.focus()
      },
    })
  },
}
