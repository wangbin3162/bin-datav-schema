// default menu list

// 基础
export const HOME_PATH = 'Dashboard'
export const HOME_NAME = '分析设计'
export const ERROR_PATH_LIST = ['403', '404', '500']

export const DEFAULT_MENUS = [
  {
    name: HOME_PATH,
    title: HOME_NAME,
    icon: 'linechart',
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
  return [...DEFAULT_MENUS, ...menus, ...staticMenu]
}

export default DEFAULT_MENUS
