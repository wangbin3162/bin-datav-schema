import { createComponent } from '@/config/components-cfg'
import { ComType } from '@/config/data-source'
import { getComPath } from '@/utils/env'
import { deepMerge, deepCopy } from '@/utils/util'

export const imageConfig = {
  name: 'VImage',
  alias: '图片',
  icon: 'image',
  type: ComType.com,
  attr: { w: 500, h: 300, lockedRatio: true },
  config: {
    attr: { w: 500, h: 300 },
    imageType: 'image', // 取值为image和border
    src: getComPath('img.svg'),
    radius: 0,
    position: '0 0',
    size: '100% 100%',
    repeat: 'no-repeat',
    border: {
      width: '32px 37px',
      slice: '32 37 fill',
      outset: '0',
      repeat: 'stretch',
    },
    shadow: {
      show: false,
      size: '0 0 15px inset',
      color: '#003a8c',
    },
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apiData: {},
  events: {},
}

export default imageConfig

// 图片预设模式
export const ImageTypeOptions = [
  { value: 'image', label: '图片' },
  { value: 'border', label: '边框' },
]

export const RepeatTypeOptions = [
  { value: 'no-repeat', label: '不重复' },
  { value: 'repeat', label: '重复' },
  { value: 'repeat-x', label: '水平重复' },
  { value: 'repeat-y', label: '垂直重复' },
]

export const ImageSizeOptions = [
  { value: 'cover', label: '缩放图片以完全覆盖,会剪裁' },
  { value: 'contain', label: '缩放图片以完全装入,会留白' },
  { value: '100% 100%', label: '铺满' },
]

export const BorderRepeatOptions = [
  { value: 'stretch', label: '拉伸图片以填充边框' },
  { value: 'repeat', label: '平铺图片以填充边框' },
  { value: 'round', label: '平铺缩放填充边框' },
  { value: 'space', label: '平铺空白填充边框' },
]

// 获取一个默认的图片配置项
export function getDefaultImageConfig(img) {
  // 创建一个基础的图片组件
  const imageCfg = createComponent(imageConfig.name)
  const attr = img?.attr ? (typeof img.attr === 'object' ? img.attr : JSON.parse(img.attr)) : {}
  const imgCfg = img
    ? {
        alias: img.name,
        attr: attr,
        config: {
          imageType: img.group === 'box' ? 'border' : 'image',
          src: img.url ? img.url : img.src,
          border: img.border ?? {},
          attr: attr, // 原始对象的宽高属性
          css: img.css ?? {}, // 原始对象的css样式属性
          size: img.css?.size ?? '100% 100%',
          position: img.css?.position ?? '0 0',
        },
      }
    : {}
  return deepMerge(deepCopy(imageCfg), deepCopy(imgCfg))
}
