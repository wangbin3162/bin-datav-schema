import { getAdminSetting, setAdminSetting } from '@/config/datastore'
import { MENU_THEME_COLOR_LIST, setMenuTheme, setPrimaryColor, setThemeMode } from '@/config/setting.cfg'

export default {
  namespaced: true,
  state: {
    projectName: document.title,
    setting: getAdminSetting(),
    searchVisible: false,
    settingVisible: false,
    weather: {},
  },
  mutations: {
    SAVE_SETTING: (state, setting) => {
      state.setting = { ...setting }
      setAdminSetting(state.setting)
    },
    SAVE_WEATHER: (state, weather) => {
      state.weather = { ...weather }
    },
    TOGGLE_SEARCH: (state) => {
      state.searchVisible = !state.searchVisible
    },
    TOGGLE_SETTING: (state) => {
      state.settingVisible = !state.settingVisible
    },
  },
  actions: {
    // 载入时加载本地存储数据和主题配置信息
    loadApp: ({ commit, state }) => {
      const setting = { ...state.setting }
      setThemeMode(setting.theme)
      setPrimaryColor(setting.systemPrimary)
      setMenuTheme(setting.menuTheme)
      setting.contentFull = false
      commit('SAVE_SETTING', setting)
    },
    toggleSideBar: ({ commit, state }) => {
      const setting = { ...state.setting }
      setting.sidebar = !setting.sidebar
      commit('SAVE_SETTING', setting)
    },
    toggleContentFull: ({ commit, state }) => {
      const setting = { ...state.setting }
      setting.contentFull = !setting.contentFull
      if (setting.contentFull) { // 如果内容区撑满全屏，则需要设置
        setting.tagsView = true
        setting.fixedHeader = true
      }
      commit('SAVE_SETTING', setting)
    },
    setThemeMode: ({ commit, state }, theme) => {
      const setting = { ...state.setting }
      // 设置默认浅色和主色时需要自定义menu色值
      const menuColor = MENU_THEME_COLOR_LIST[theme === 'light' ? 2 : 0]
      setting.theme = theme
      setting.menuTheme = menuColor
      setThemeMode(theme)
      setMenuTheme(menuColor)
      commit('SAVE_SETTING', setting)
    },
    setMenuTheme: ({ commit, state }, menuColor) => {
      const setting = { ...state.setting }
      const isLight = ['#fff', '#ffffff'].includes(menuColor.toLowerCase())
      const theme = isLight ? 'light' : 'dark'
      setting.theme = theme
      setting.menuTheme = menuColor
      setThemeMode(theme)
      setMenuTheme(menuColor)
      commit('SAVE_SETTING', setting)
    },
    setSystemPrimary: ({ commit, state }, color) => {
      const setting = { ...state.setting }
      setting.systemPrimary = color
      setPrimaryColor(color)
      commit('SAVE_SETTING', setting)
    },
    setSideBarWidth: ({ commit, state }, width) => {
      const setting = { ...state.setting }
      setting.sidebarWidth = width
      commit('SAVE_SETTING', setting)
    },
    toggleTagsView: ({ commit, state }) => {
      const setting = { ...state.setting }
      setting.tagsView = !setting.tagsView
      commit('SAVE_SETTING', setting)
    },
    toggleFixedHeader: ({ commit, state }, isFixed) => {
      const setting = { ...state.setting }
      setting.fixedHeader = isFixed
      commit('SAVE_SETTING', setting)
    },
    toggleFixedAside: ({ commit, state }, isFixed) => {
      const setting = { ...state.setting }
      setting.fixedAside = isFixed
      commit('SAVE_SETTING', setting)
    },
    toggleSearchPane: ({ commit }) => {
      commit('TOGGLE_SEARCH')
    },
    toggleSettingPane: ({ commit }) => {
      commit('TOGGLE_SETTING')
    },
    toggleSearchBtn: ({ commit, state }) => {
      const setting = { ...state.setting }
      setting.showSearch = !setting.showSearch
      commit('SAVE_SETTING', setting)
    },
    toggleMessageBtn: ({ commit, state }) => {
      const setting = { ...state.setting }
      setting.showMessage = !setting.showMessage
      commit('SAVE_SETTING', setting)
    },
    toggleWeatherBtn: ({ commit, state }) => {
      const setting = { ...state.setting }
      setting.showWeather = !setting.showWeather
      commit('SAVE_SETTING', setting)
    },
    setWeather: ({ commit }, weather) => {
      commit('SAVE_WEATHER', weather)
    },
  },
}
