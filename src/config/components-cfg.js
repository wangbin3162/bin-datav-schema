/**
 * 基础组件类
 */
import { getDefaultImageConfig } from '@/components/Schema/basic/image/config'
import { deepCopy, deepMerge, generateId, isEmpty } from '@/utils/util'
import { getPublicPath } from '@/utils/env'

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
    lockedRatio: false,
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
  // 判断当前的拖拽是否是VMainImg和VBorderBox，入是则需要获取图片专属配置并追加部分默认值
  if (name === 'VMainImg') {
    const imageCfg = getDefaultImageConfig()
    return imageCfg
  }
  if (name === 'VBorderBox') {
    const imageCfg = getDefaultImageConfig({
      name: '边框',
      group: 'box',
      src: getPublicPath('/images/box/box1.png'),
      border: {
        width: '32px 37px',
        slice: '32 37 fill',
        outset: '0',
        repeat: 'stretch',
      },
    })
    return imageCfg
  }

  const config = mergeConfig(name)
  console.log(`----------createComponent[${name}]: `, config)
  return config
}

/**
 * 获取组配置信息
 * @param areaData 组区域边界信息
 * @param components 组内数据
 */
export function createGroup(areaData, components) {
  const id = generateId()
  const config = deepMerge(deepCopy(DatavComponent), {
    id: `Group_${id}`,
    name: 'Group',
    type: 'group',
    alias: `组合_${id}`,
    icon: 'group',
    attr: {
      x: areaData.x,
      y: areaData.y,
      w: areaData.width,
      h: areaData.height,
    },
    components,
  })
  console.log('----------createGroup: ', config)
  return config
}
