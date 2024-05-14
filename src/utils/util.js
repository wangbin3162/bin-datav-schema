import { Utils, Notice } from 'bin-ui-design'
import { camelize, isObject } from '@vue/shared'

export const generateId = Utils.helper.generateId

export const uuid = Utils.util.uuid

export const logger = Utils.log

export const copyText = Utils.util.copy

export const typeOf = Utils.util.typeOf

export const deepCopy = Utils.util.deepCopy

export const deepMerge = Utils.util.deepMerge

export const isEqual = Utils.util.isEqual

export const getRandomInt = Utils.util.getRandomInt

export const throttle = Utils.util.throttle

export const debounce = Utils.util.debounce

export const isEmpty = Utils.helper.isEmpty

export const windowOpen = Utils.util.open

export const on = Utils.dom.on

export const off = Utils.dom.off

export const addClass = Utils.dom.addClass

export const removeClass = Utils.dom.removeClass

export const hasClass = Utils.dom.hasClass

export const addResizeListener = Utils.resize.addResizeListener

export const removeResizeListener = Utils.resize.removeResizeListener

export const ColorHelper = Utils.color

export function isColor(str) {
  let type = ''
  if (/^rgb\(/.test(str)) {
    //如果是rgb开头，200-249，250-255，0-199
    type =
      '^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]$'
  } else if (/^rgba\(/.test(str)) {
    //如果是rgba开头，判断0-255:200-249，250-255，0-199 判断0-1：0 1 1.0 0.0-0.9
    type =
      '^[rR][gG][Bb][Aa][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[)]$'
  } else if (/^#/.test(str)) {
    //六位或者三位
    type = '^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$'
  } else if (/^hsl\(/.test(str)) {
    //判断0-360 判断0-100%(0可以没有百分号)
    type =
      '^[hH][Ss][Ll][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[)]$'
  } else if (/^hsla\(/.test(str)) {
    type =
      '^[hH][Ss][Ll][Aa][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[)]$'
  }

  let re = new RegExp(type)
  return str.match(re) !== null
}

/**
 * arraybuffer 流文件转换为base64图像
 * @param data
 */
export function arraybuffer2Base64(data) {
  return (
    'data:image/png;base64,' +
    window.btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
  )
}

/**
 * 抛异常公共函数，用于请求接口或其他异常捕捉错误信息
 * @param callFun 调用函数，用于记录错误调用来源 ，一般复制当前啊函数名称，或者填入说明信息 login/getVerifyCode
 * @param e 错误消息
 * @param title alert和notice模块选填，错误标题
 * @param log 是否打印到控制台
 */
export function throwError(callFun, e, title, log = true) {
  console.log('.........................', e)
  if (e.statusCode === 401 || e.code === '416') {
    Notice.warning({ title: title || '提示', message: e.message || '操作错误！' })
  } else {
    Notice.error({ title: title || '错误', message: e.message || '操作错误！' })
  }
  if (log) {
    const str = callFun.split('/')
    if (str && str.length >= 2) {
      Utils.log.pretty(str[0], str[1], 'danger')
    }
    console.log(e)
    Utils.log.danger('----------------------------------------------------------')
  }
}

/**
 * 数组转对象值
 */
export function arrToObj(arr = [], keyCode = 'key', valueCode = 'value') {
  const map = new Map()
  if (arr.length === 0) return {}
  arr.forEach(item => {
    map.set(item[keyCode], item[valueCode])
  })
  const obj = {}
  for (const [k, v] of map) {
    obj[k] = v
  }
  return obj
}

/**
 * 处理拉平树结构
 * @param stateTree
 * @returns {*[]}
 */
export function compileFlatState(stateTree) {
  let keyCounter = 0
  let childrenKey = 'children'
  const flatTree = []

  const flattenChildren = (node, parent, parentKeys) => {
    if (isEmpty(node)) return
    node.nodeKey = keyCounter++
    flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey }
    if (typeof parent !== 'undefined') {
      flatTree[node.nodeKey].parent = parent.nodeKey
      flatTree[parent.nodeKey][childrenKey].push(node.nodeKey)
    }
    let parents = parentKeys ? parentKeys.split(',').map(i => +i) : []
    // 拼接parents
    if (typeof parentKeys !== 'undefined') {
      parents.push(parent.nodeKey)
      flatTree[node.nodeKey].parents = parents
    }

    if (node[childrenKey]) {
      flatTree[node.nodeKey][childrenKey] = []
      node[childrenKey].forEach(child => flattenChildren(child, node, parents.join(',')))
    }
  }

  flattenChildren(stateTree)

  return flatTree
}

/**
 * 转换为json对象
 * @param data
 * @param defaultValue
 * @returns {any}
 */
export function toJson(data, defaultValue) {
  try {
    if (!data) {
      return defaultValue
    }
    if (typeOf(data) === 'string') {
      return JSON.parse(data)
    }
    return data
  } catch {
    return defaultValue
  }
}

// 设置dom style
export function setStyle(element, styleName, value) {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    Object.keys(styleName).forEach(prop => {
      setStyle(element, prop, styleName[prop])
    })
  } else {
    styleName = camelize(styleName)
    element.style[styleName] = value
  }
}

// 查找索引
export function findIndex(data, value, key = 'id') {
  return data.findIndex(i => i[key] === value)
}

// 简单计算字符串宽度
let TextCanvas = null
export const calcStrWidth = (str, font) => {
  if (!TextCanvas) {
    TextCanvas = document.createElement('canvas')
  }
  const ctx = TextCanvas.getContext('2d')
  ctx.font = font
  return ctx.measureText(str).width
}
// 判断是否存在一个属性
export function hasProperty(obj, property) {
  // eslint-disable-next-line no-prototype-builtins
  return obj ? obj.hasOwnProperty(property) : false
}
