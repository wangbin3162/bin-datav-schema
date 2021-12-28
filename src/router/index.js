import { createRouter, createWebHashHistory } from 'vue-router'
import { LoadingBar, Notice } from 'bin-ui-next'
import { scrollBehavior } from './scrollBehavior'
import { constantRoutes } from './routes'
import store from '@/store'
import { ERROR_PATH_LIST, getFilterMenus } from './menus'
import cookies from '../utils/util.cookies'
import { ACCESS_TOKEN } from '@/config/token-const'
import { throwError } from '@/utils/util'
import menuList from './menus'

/**
 * @description 创建路由
 * @param {Array} routes 路由设置
 */
const initRouter = (routes = []) => createRouter({
  history: createWebHashHistory(),
  scrollBehavior,
  routes,
})

const router = initRouter(constantRoutes)

/**
 * @description 新增动态route
 * @param {Array} routes 额外追加的路由
 */
export function resetRoutes(routes = []) {
  routes.forEach(route => {
    router.addRoute('Root', route)
  })
}

// config router
export function setupRouter(app) {
  app.use(router)
}

// 权限白名单 no redirect whitelist
const whiteList = ['/login', ERROR_PATH_LIST.map(path => `/${path}`), '/error']
router.beforeEach(async (to, from) => {
  // set page title
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title}`
  }
  LoadingBar.start()
  // 没有登录的时候跳转到登录界面 // 携带上登陆成功之后需要跳转的页面完整路径
  if (whiteList.indexOf(to.path) !== -1) { // 在免登陆白名单中
    return true
  }
  const token = cookies.get(ACCESS_TOKEN)
  if (token && token !== 'undefined') {
    // 确定用户是否通过getInfo获得了他的权限角色// 这里暂时默认获取了角色
    const userInfo = store.state.user.userInfo
    if (userInfo) {
      return true
    } else { // 否则就去拉取用户信息
      try {
        const user = await store.dispatch('user/getUserInfo')
        if (from.name === 'Login') {
          Notice.success({
            title: '登录成功',
            message: `欢迎回来: ${user.realName || user.username}`,
            offset: 60,
          })
        }
        // 默认静态菜单
        const menus = getFilterMenus(menuList || [])
        // console.log('menus: ', menus)
        const { menuItems } = await store.dispatch('menu/setRouterMenu', menus)
        const asyncRoute = await store.dispatch('menu/generateRoutes', menuItems)
        // console.log('baseRoutes: ', router.getRoutes())
        // [ 路由 ] 计算路由
        // console.log('asyncRoutes: ', asyncRoute)
        // [ 路由 ] 重新设置路由
        resetRoutes(asyncRoute)
        // console.log('resultRoutes: ', router.getRoutes())
        return { path: to.path, query: to.query }
      } catch (e) {
        throwError('router/beforeEach', e, '初始化信息出错')
        return { name: 'Login', query: { redirect: to.fullPath } }
      }
    }
  } else {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})
router.afterEach(() => {
  LoadingBar.done()
})

export default router
