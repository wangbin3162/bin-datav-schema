import page from './page'
import canvas from './canvas'
import contextmenu from './contextmenu'

export default {
  namespaced: true,
  state: {
    ...page.state,
    ...canvas.state,
    ...contextmenu.state,
  },
  mutations: {
    ...page.mutations,
    ...canvas.mutations,
    ...contextmenu.mutations,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...contextmenu.actions,
  },
}
