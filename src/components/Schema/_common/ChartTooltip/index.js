import Main from './index.vue'

Main.install = app => {
  app.component(Main.name, Main)
}

export default Main
