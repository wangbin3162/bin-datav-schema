import Cookies from 'js-cookie'

const cookies = {}
const KEY = 'bin-datav-schema'

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param cookieSetting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  const currentCookieSetting = {
    expires: 1,
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`${KEY}-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`${KEY}-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`${KEY}-${name}`)
}

export default cookies
