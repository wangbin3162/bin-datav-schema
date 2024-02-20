import { createRouter, createWebHashHistory } from 'vue-router'
import { LoadingBar, Notice } from 'bin-ui-design'
import { scrollBehavior } from './scrollBehavior'
import { constantRoutes } from './routes'
import { useStore } from '@/store'
import { ERROR_PATH_LIST } from './menus'
import cookies from '../utils/util.cookies'
import { ACCESS_TOKEN } from '@/config/token-const'
import { throwError } from '@/utils/util'

/**
 * @description 创建路由
 * @param {Array} routes 路由设置
 */
const initRouter = (routes = []) =>
  createRouter({
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

// 获取不同情况下的token
async function getAccessToken(to) {
  const token = cookies.get(ACCESS_TOKEN)
  // 如果是从第三方跳转过来的
  if (!token && to.query.token) {
    // 白名单中追加路由
    whiteList.push(to.path)
    console.log('whiteList', whiteList)
    // 设置新的token
    cookies.set(ACCESS_TOKEN, to.query.token, {})
    return to.query.token
  } else {
    await refreshToken()
    return cookies.get(ACCESS_TOKEN)
  }
}

router.beforeEach(async (to, from) => {
  LoadingBar.start()
  // 根据query中是否携带token判断是否是第三方跳转
  const token = await getAccessToken(to)
  // 没有登录的时候跳转到登录界面 // 携带上登陆成功之后需要跳转的页面完整路径
  if (whiteList.indexOf(to.path) !== -1) {
    // 在免登陆白名单中
    return true
  }
  if (token && token !== 'undefined') {
    // 确定用户是否通过getInfo获得了他的权限角色// 这里暂时默认获取了角色
    const { userStore } = useStore()
    const userInfo = userStore.userInfo
    if (userInfo) {
      return true
    }

    // 否则就去拉取用户信息
    try {
      await userStore.getUserInfo()
      if (from.name === 'Login') Message.success('登录成功!')
      return { path: to.path, query: to.query }
    } catch (e) {
      throwError('router/beforeEach', e, '初始化信息出错')
      return { name: 'Login', query: { redirect: to.fullPath } }
    }
  } else {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
})
router.afterEach(() => {
  LoadingBar.done()
})

export default router
