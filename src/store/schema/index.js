import { defineStore } from 'pinia'
import page from './page'
import canvas from './canvas'
import compose from './compose'
import contextmenu from './contextmenu'
import shortcuts from './shortcuts'
import snapshot from './snapshot'

const useSchema = defineStore('schema', {
  state: () => ({
    ...page.state,
    ...canvas.state,
    ...compose.state,
    ...contextmenu.state,
    ...snapshot.state,
    ...shortcuts.state,
  }),
  getters: {
    ...shortcuts.getters,
    ...canvas.getters,
    ...page.getters,
    ...compose.getters,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...compose.actions,
    ...contextmenu.actions,
    ...snapshot.actions,
    ...shortcuts.actions,
  },
})

export default useSchema
