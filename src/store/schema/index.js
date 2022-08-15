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
    ...contextmenu.state,
    ...snapshot.state,
    ...shortcuts.state,
  }),
  getters: {
    ...shortcuts.getters,
    ...canvas.getters,
  },
  actions: {
    ...page.actions,
    ...canvas.actions,
    ...contextmenu.actions,
    ...snapshot.actions,
    ...shortcuts.actions,
  },
})

export default useSchema
