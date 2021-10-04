import { useStore } from 'vuex'
import { computed } from 'vue'
import { MENU_THEME_COLOR_LIST, SYSTEM_PRIMARY_COLOR_LIST } from '@/config/setting.cfg'

export default function useSetting() {
  const store = useStore()
  // setting 需要缓存至本地
  const setting = computed(() => store.state.app.setting)
  // 搜索面板显示，不需要缓存，这里设置vuex可以全局调用
  const searchVisible = computed(() => store.state.app.searchVisible)
  // 设置面板，不需要缓存，这里设置vuex可以全局调用
  const settingVisible = computed(() => store.state.app.settingVisible)
  // 保存的weather对象信息
  const weather = computed(() => store.state.app.weather)

  // setting 设置getter
  const theme = computed(() => setting.value.theme)
  const menuTheme = computed(() => setting.value.menuTheme)
  const systemPrimary = computed(() => setting.value.systemPrimary)
  const sidebar = computed(() => setting.value.sidebar)
  const sidebarWidth = computed(() => setting.value.sidebarWidth)
  const showTagsView = computed(() => setting.value.tagsView)
  const fixedAside = computed(() => setting.value.fixedAside)
  const fixedHeader = computed(() => setting.value.fixedHeader)
  const contentFull = computed(() => setting.value.contentFull)

  // 功能设置
  const showSearch = computed(() => setting.value.showSearch)
  const showMessage = computed(() => setting.value.showMessage)
  const showWeather = computed(() => setting.value.showWeather)

  // 根据不同的设置返回额外属性
  const asideStyle = computed(() => {
    const width = sidebar.value ? sidebarWidth.value : 64
    return {
      flex: `0 0 ${width}px`,
      maxWidth: `${width}px`,
      minWidth: `${width}px`,
      width: `${width}px`,
    }
  })
  // 右侧区域宽度
  const rightContentWidth = computed(() => {
    return {
      width: (!contentFull.value && fixedHeader.value)
        ? `calc(100% - ${sidebar.value ? sidebarWidth.value : 64}px)` : '100%',
    }
  })
  const fixedHeaderStyle = computed(() => {
    return {
      ...rightContentWidth.value,
      padding: 0,
      zIndex: 10,
      right: fixedHeader.value ? 0 : null,
    }
  })

  // toggle侧边栏
  async function toggleSidebar() {
    await store.dispatch('app/toggleSideBar')
  }

  // toggle内容区域撑满
  async function toggleContentFull() {
    await store.dispatch('app/toggleContentFull')
  }

  // toggle搜索面板
  async function toggleSearch() {
    await store.dispatch('app/toggleSearchPane')
  }

  // toggle设置面板
  async function toggleSetting() {
    await store.dispatch('app/toggleSettingPane')
  }

  // 大主题切换
  async function themChange(val) {
    await store.dispatch('app/setThemeMode', val)
  }

  // 菜单主题切换
  async function setMenuTheme(color) {
    if (color !== menuTheme.value) {
      await store.dispatch('app/setMenuTheme', color)
    }
  }

  // 系统色切换
  async function setSystemPrimary(color) {
    if (color !== systemPrimary.value) {
      await store.dispatch('app/setSystemPrimary', color)
    }
  }

  // toggle tagsView标签页
  async function toggleTagsView(val) {
    await store.dispatch('app/toggleTagsView')
    if (!val) {
      // 如果关闭tags，则需要关闭所有缓存
      await store.dispatch('tagsView/delAllViews')
    }
  }

  // 是否固定头部
  async function changeFixedHeader(val) {
    await store.dispatch('app/toggleFixedHeader', val)
  }

  // 是否固定侧边栏
  async function changeFixedAside(val) {
    await store.dispatch('app/toggleFixedAside', val)
  }

  // 设置侧边栏宽度
  async function changeSidebarWidth(width) {
    await store.dispatch('app/setSideBarWidth', width)
  }

  // 设置顶栏搜索
  async function toggleSearchBtn() {
    await store.dispatch('app/toggleSearchBtn')
  }

  // 设置顶栏message
  async function toggleMessageBtn() {
    await store.dispatch('app/toggleMessageBtn')
  }

  // 设置顶栏天气
  async function toggleWeatherBtn() {
    await store.dispatch('app/toggleWeatherBtn')
  }

  return {
    // state
    theme,
    menuTheme,
    systemPrimary,
    sidebar,
    sidebarWidth,
    contentFull,
    showTagsView,
    fixedAside,
    fixedHeader,
    showSearch,
    showMessage,
    showWeather,
    // self state
    searchVisible,
    settingVisible,
    weather,
    // computed
    asideStyle,
    rightContentWidth,
    fixedHeaderStyle,
    // normal colors
    systemPrimaryColorList: SYSTEM_PRIMARY_COLOR_LIST,
    menuThemeColorList: MENU_THEME_COLOR_LIST,
    // actions
    themChange,
    setMenuTheme,
    setSystemPrimary,
    toggleSidebar,
    changeSidebarWidth,
    toggleTagsView,
    changeFixedHeader,
    changeFixedAside,
    toggleSearch,
    toggleSetting,
    toggleSearchBtn,
    toggleMessageBtn,
    toggleWeatherBtn,
    toggleContentFull,
  }
}
