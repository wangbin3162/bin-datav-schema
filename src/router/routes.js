import layout from '@/layouts/index.vue'
import { HOME_NAME } from '@/router/menus'

/**
 * meta 为附带参数，title为默认路由标题，noCache为缓存标识，为true时开启tag-view时不缓存
 */
export const asyncRouterMap = [
  {
    path: 'pivotDemo',
    name: 'PivotDemo',
    component: () => import('@/views/demo/graph/pivot-demo/index.vue'),
    meta: { title: '交叉表' },
  },
  {
    path: 'datasetDemo',
    name: 'DatasetDemo',
    component: () => import('@/views/demo/graph/dataset-demo/index.vue'),
    meta: { title: '分析模型' },
  },
  {
    path: 'dashboardDemo',
    name: 'DashboardDemo',
    component: () => import('@/views/demo/graph/dashboard-demo/index.vue'),
    meta: { title: '仪表板' },
  },
]

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
      component: layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: HOME_NAME },
          component: () => import('@/views/dashboard/workbench/index.vue'),
        },
        // 刷新页面 必须保留
        {
          path: 'redirect/:path(.*)',
          name: 'Redirect',
          component: () => import('@/views/system/redirect/index.vue'),
        },
        // 错误页面
        {
          path: '/:path(.*)*',
          name: 'ErrorPage',
          component: () => import('@/views/system/error/index.vue'),
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
  // 分析看板
  {
    path: '/schema/cube',
    name: 'Cube',
    component: () => import('@/views/schema/cube/index.vue'),
  },
  {
    path: '/schema/screen',
    name: 'ScreenEditor',
    component: () => import('@/views/schema/screen-editor/index.vue'),
  },
  {
    path: '/screen/:screenId',
    name: 'Screen',
    component: () => import('@/views/schema/screen/index.vue'),
  },
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
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRoutes = createRoutesInLayout().concat(routesOutLayout)
