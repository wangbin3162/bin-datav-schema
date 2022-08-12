/**
 * 基础组件类
 */
import { deepCopy, deepMerge, generateId, isEmpty } from '@/utils/util'

const cfgs = import.meta.globEager('../components/Schema/*/*/config.js')
const configMap = new Map()
// 便利执行
Object.keys(cfgs).forEach(key => {
  const config = cfgs[key].default
  if (config?.name) {
    configMap.set(config.name, config)
  }
})

// 基础配置项
const DatavComponent = {
  id: '',
  name: '',
  alias: '',
  type: '',
  locked: false,
  hided: false,
  attr: {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    rotate: 0,
    opacity: 1,
  },
  apiData: {},
  events: {},
}

function mergeConfig(name) {
  const config = configMap.get(name) || {}
  const mergeObj = deepMerge(deepCopy(DatavComponent), config)
  mergeObj.id = `${name}_${generateId()}`
  if (!isEmpty(mergeObj.apiData)) {
    mergeObj.apiData.comId = mergeObj.id
  }
  return mergeObj
}

/**
 * 创建组件
 * @param name
 */
export function createComponent(name) {
  const config = mergeConfig(name)
  console.log(`----------createComponent[${name}]: `, config)
  return config
}
