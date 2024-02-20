import dayjs from 'dayjs'

/**
 * 用于组件数据配置，构建接口请求参数
 * @param {*} reqParam 接口请求参数配置
 * @param {*} pageParams 页面参数，父子页面传递参数时使用
 * @returns
 */
export function buildReqParams(reqParam = [], pageParams = null) {
  const res = {}
  reqParam.forEach(item => {
    if (item.funcStr) {
      // 兼容性处理，存在自定义函数则优先使用自定义函数生成默认值
      const fun = new Function('pageParams', 'util', item.funcStr)
      try {
        res[item.name] = fun(pageParams, { dayjs }) || '' // 没有返回值则赋默认值
      } catch (error) {
        console.error(error)
        // 自定义函数语法错误时也赋默认值
        res[item.name] = ''
      }
    } else {
      res[item.name] = item.default
    }
  })
  return res
}
