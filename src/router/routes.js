import { HOME_NAME, HOME_PATH } from '@/router/menus'
import layouts from '@/layouts/index.vue'

/**
 * @description 创建在 layout 中显示的路由设置
 * @param {Array} routes 动态路由设置
 */
export function createRoutesInLayout(routes = []) {
  return [
    {
      path: '/',
      redirect: { name: 'Dashboard' },
      name: 'Root',
      component: layouts,
      children: [
        {
          // 分析大屏列表
          path: HOME_PATH,
          name: HOME_PATH,
          meta: { title: HOME_NAME },
          component: () => import('@/views/dashboard/index.vue'),
        },
        // 刷新页面 必须保留
        {
          path: 'redirect/:path(.*)',
          name: 'Redirect',
          component: () => import('@/views/system/redirect/index.vue'),
        },
        ...routes,
      ],
    },
  ]
}
// 新增动态route
export function addRoutes(routes = []) {
  return createRoutesInLayout(routes).concat(routesOutLayout)
}

// 在 layout 之外显示的路由
export const routesOutLayout = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login.vue'),
  },
  // 大屏编辑，后面跟大屏id
  {
    path: '/schema/screen',
    name: 'ScreenEditor',
    component: () => import('@/views/schema/screen-editor/index.vue'),
  },
  // 大屏查看界面
  {
    path: '/screen/:screenId',
    name: 'Screen',
    component: () => import('@/views/schema/screen/index.vue'),
  },
  // 大屏预览界面
  {
    path: '/screen/preview/:screenId',
    name: 'Preview',
    component: () => import('@/views/schema/screen/index.vue'),
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: () => import('@/views/system/error/index.vue'),
  },
  // 错误页面
  {
    path: '/:path(.*)*',
    name: 'ErrorPage',
    component: () => import('@/views/system/error/index.vue'),
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
