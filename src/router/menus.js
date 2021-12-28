// default menu list
export default [
  {
    name: 'DataCenter',
    title: '数据中心',
    icon: 'database',
  },
]

// 基础
export const HOME_PATH = 'Dashboard'
export const HOME_NAME = '我的看板'
export const ERROR_PATH_LIST = ['403', '404', '500']
export const DASHBOARD_MENUS = [
  {
    name: HOME_PATH,
    title: HOME_NAME,
    icon: 'laptop',
  },
]

/**
 * 静态的临时的menus，不受接口返回影响
 *  {{children: [{name: string, title: string}], name: string, icon: string, title: string}[]}
 */
export const staticMenu = []

/**
 * 组装menus菜单
 * @param menus 接口返回的menus
 */
export function getFilterMenus(menus = []) {
  return [
    ...DASHBOARD_MENUS,
    ...menus,
    ...staticMenu,
  ]
}
