import { defineStore } from 'pinia'

const useGlobal = defineStore('global', {
  state: () => ({
    weather: {},
  }),
  getters: {},
  actions: {},
})

export default useGlobal
