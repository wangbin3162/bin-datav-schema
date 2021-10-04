import { getLinks, setLinks } from '@/config/datastore'

export default {
  namespaced: true,
  state: {
    links: getLinks()
  },
  mutations: {
    SET_LINKS: (state, links) => {
      state.links = links
      setLinks(links)
    }
  },
  actions: {
    setLinks: ({ commit }, links) => {
      commit('SET_LINKS', links)
    }
  }
}
