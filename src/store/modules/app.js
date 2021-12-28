import { setAttrVar } from '@/config/setting.cfg'

export default {
  namespaced: true,
  state: {
    projectName: document.title,
    weather: {},
  },
  mutations: {
    SAVE_WEATHER: (state, weather) => {
      state.weather = { ...weather }
    },
  },
  actions: {
    // 设置主题模式
    loadAppTheme: ({ commit }, theme = 'dark') => {
      setAttrVar('data-schema', `datav-${theme}`)
    },
    setWeather: ({ commit }, weather) => {
      commit('SAVE_WEATHER', weather)
    },
  },
}
