import page from './page'
import canvas from './canvas'
import contextmenu from './contextmenu'
import shortcuts from './shortcuts'
import snapshot from './snapshot'

export default {
  namespaced: true,
  state: {
    ...page.state,
    ...canvas.state,
    ...contextmenu.state,
    ...shortcuts.state,
    ...snapshot.state,
  },
  mutations: {
    ...page.mutations,
    ...canvas.mutations,
    ...contextmenu.mutations,
    ...shortcuts.mutations,
    ...snapshot.mutations,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...contextmenu.actions,
    ...shortcuts.actions,
    ...snapshot.actions,
  },
}
