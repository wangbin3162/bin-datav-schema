import { defineStore } from 'pinia'
import page from './page'
import canvas from './canvas'
import contextmenu from './contextmenu'
import shortcuts from './shortcuts'
import snapshot from './snapshot'

const useSchema = defineStore('schema', {
  state: () => ({
    ...page.state,
    ...canvas.state,
    ...shortcuts.state,
    ...contextmenu.state,
    ...snapshot.state,
  }),
  getters: {
    ...shortcuts.getters,
    ...canvas.getters,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...shortcuts.actions,
    ...contextmenu.actions,
    ...snapshot.actions,
  },
})

export default useSchema
