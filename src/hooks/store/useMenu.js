import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'
import useTagsView from '@/hooks/store/useTagsView'
import { HOME_PATH } from '@/router/menus'

export default function useMenu() {
  const $store = useStore()
  const $router = useRouter()
  const $route = useRoute()
  const navMenu = computed(() => $store.state.menu.menu)
  const navMenuItems = computed(() => $store.state.menu.menuItems)
  const addRouters = computed(() => $store.state.menu.addRouters)
  const allMenuItems = computed(() => {
    const functions = navMenu.value
    const all = []
    const mapper = route => {
      const mapperNode = { ...route }
      mapperNode.children = (route.children && route.children.map(mapper)) || []
      if (route.name) {
        all.push(mapperNode)
      }
      return mapperNode
    }
    functions.forEach(item => {
      mapper(item)
    })
    return all
  })
  const { refreshCurrentPage } = useTagsView()

  // 获取菜单项名称路径
  function getMenuItemNamePath(name) {
    const activeRoute = navMenuItems.value.find(item => item.name === name)
    return activeRoute ? activeRoute.parents : []
  }

  // 获取当前
  function getCurrentMenu(name) {
    const activeRoute = allMenuItems.value.find(item => item.name === name)
    return activeRoute || null
  }

  // 获取当前菜单结构数组
  function getBreadcrumbData(name) {
    const list = []
    const current = getCurrentMenu(name)
    if (!current) return []
    const parents = current.parents
    if (parents.length === 1 && !current.children.length) {
      list.push(current)
    } else {
      // 如果有多级层级，则需要遍历查询父级菜单集合
      parents.forEach(name => {
        const route = getCurrentMenu(name)
        if (route) {
          list.push(route)
        }
      })
    }
    return list
  }

  // 选中路由名称
  function handleMenuSelect(name) {
    if (name === $route.name) {
      refreshCurrentPage()
      return
    }
    // 外链跳转
    const curMenu = allMenuItems.value.find(item => item.name === name)
    if (curMenu && curMenu.link) {
      window.open(curMenu.link, '_blank')
      return
    }
    // 路由跳转
    if (addRouters.value.find(item => item.name === name) || name === HOME_PATH) {
      $router.push({ name })
    } else {
      $router.push('/404')
    }
  }

  function getCurrentRouteMenu() {
    return getCurrentMenu($route.name)
  }

  return {
    navMenu,
    navMenuItems,
    addRouters,
    allMenuItems,
    getCurrentRouteMenu,
    getBreadcrumbData,
    getMenuItemNamePath,
    handleMenuSelect,
  }
}
