import { createComponent } from '@/config/components-cfg'
import { ComType } from '@/config/data-source'
import { deepMerge, deepCopy } from '@/utils/util'

export const imageConfig = {
  name: 'VIcon',
  alias: '图标',
  icon: 'icon',
  type: ComType.com,
  attr: { w: 100, h: 100, lockedRatio: true },
  config: {
    attr: { w: 100, h: 100 },
    pointerType: 'other', // 取值为image和border
    src: 'smile',
    color: '#fff',
    size: 180,
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apiData: {},
  events: {},
}
export default imageConfig

// 图标预设模式
export const pointerType = [
  { value: 'other', label: '图标' },
  { value: 'btn', label: '按钮' },
]

// 获取一个默认的图片配置项
export function getDefaultImageConfig(icon) {
  // 创建一个基础的图片组件
  const imageCfg = createComponent(imageConfig.name)
  const attr = icon?.attr
    ? typeof icon.attr === 'object'
      ? icon.attr
      : JSON.parse(icon.attr)
    : { w: 100, h: 100 }
  const iconCfg = icon
    ? {
        alias: icon.name,
        attr: attr,
        config: {
          pointerType: icon.group === 'btn' ? 'pointer' : null,
          src: icon.src,
          attr: attr, // 原始对象的宽高属性
          radius: icon.radius,
          color: icon.color,
          size: icon.size,
          bg: icon.bg,
        },
      }
    : {}
  return deepMerge(deepCopy(imageCfg), deepCopy(iconCfg))
}
