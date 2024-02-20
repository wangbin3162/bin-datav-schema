import { createComponent } from '@/config/components-cfg'
import { ComType } from '@/config/data-source'
import { getComPath } from '@/utils/env'
import { deepMerge, deepCopy } from '@/utils/util'

export const topoConfig = {
  name: 'VTopo',
  alias: '组态',
  icon: 'cluster',
  type: ComType.com,
  attr: { w: 300, h: 300, lockedRatio: true },
  config: {
    attr: { w: 300, h: 300 },
    src: getComPath('img.svg'),
    position: '0 0',
    size: '100% 100%',
    repeat: 'no-repeat',
  },
  apiData: {},
  events: {},
}

export default topoConfig

// 获取一个默认的图片配置项
export function getDefaultTopoConfig(img) {
  // 创建一个基础的图片组件
  const imageCfg = createComponent(topoConfig.name)
  const attr = img?.attr ? (typeof img.attr === 'object' ? img.attr : JSON.parse(img.attr)) : {}
  const imgCfg = img
    ? {
        alias: img.name,
        attr: attr,
        config: {
          src: img.url ? img.url : img.src,
          attr: attr, // 原始对象的宽高属性
        },
      }
    : {}
  return deepMerge(deepCopy(imageCfg), deepCopy(imgCfg))
}
