import page from './page'
import canvas from './canvas'
import contextmenu from './contextmenu'
import api from './api'

export default {
  namespaced: true,
  state: {
    ...page.state,
    ...canvas.state,
    ...contextmenu.state,
    ...api.state,
  },
  mutations: {
    ...page.mutations,
    ...canvas.mutations,
    ...contextmenu.mutations,
    ...api.mutations,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...contextmenu.actions,
    ...api.actions,
  },
}
