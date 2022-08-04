import { defineStore } from 'pinia'
import { addRoutes, asyncRouterMap } from '@/router/routes'

const useMenu = defineStore('menu', {
  state: () => ({
    routes: [],
    addRouters: [], // 左侧菜单栏的缓存路由
    menu: [], // 原始菜单
    menuItems: [], // 平铺菜单
  }),
  getters: {
    navMenu() {
      return this.menu
    },
    navMenuItems() {
      return this.menuItems
    },
    allMenuItems() {
      const functions = this.menu
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
    },
  },
  actions: {
    generateRoutes(menuItems) {
      const accessedRouters = filterAsyncRoutes(asyncRouterMap, menuItems)
      this.addRouters = accessedRouters
      this.routes = addRoutes(accessedRouters)
      // console.log(accessedRouters)
      return accessedRouters
    },
    setRouterMenu(menus) {
      const menu = setMenu(menus)
      const menuItems = getMenuItems(menu)
      this.menu = setMenu(menus)
      this.menuItems = menuItems
      return { menu, menuItems }
    },
  },
})

export default useMenu

/**
 * 根据返回的树形菜单，递归筛选路由节点
 * @param routes
 * @param menuItems 所有平铺的菜单项
 * @returns {[]}
 */
function filterAsyncRoutes(routes, menuItems) {
  const all = []
  menuItems.forEach(menu => {
    const matchIndex = routes.findIndex(item => item.name.toUpperCase() === menu.name.toUpperCase())
    if (matchIndex > -1) {
      all.push(routes[matchIndex])
    }
  })
  return all
}

// 菜单树拼接子父级关系
function setMenu(menus) {
  const all = []
  const mapper = (route, parent) => {
    const parents = parent ? parent.split(',') : []
    parents.push(route.name)
    const child = []
    if (route.children) {
      route.children.forEach(item => {
        child.push(mapper(item, parents.join(',')))
      })
    }
    if (child.length === 0) {
      return {
        ...route,
        parents: parents,
      }
    }
    return {
      ...route,
      parents: parents,
      children: child,
    }
  }
  menus.forEach(item => {
    all.push(mapper(item))
  })
  return all
}

// 递归平铺菜单树
function getMenuItems(menus) {
  const all = []
  const mapper = menu => {
    if (menu.name && !menu.children) {
      all.push({ ...menu })
    }
    if (menu.children) {
      menu.children.forEach(item => {
        mapper(item)
      })
    }
  }
  menus.forEach(item => {
    mapper(item)
  })
  return all
}
