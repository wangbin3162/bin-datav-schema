import { createComponent } from '@/config/components-cfg'
import { ComType } from '@/config/data-source'
import { getPublicPath } from '@/utils/env'
import { deepMerge, deepCopy } from '@/utils/util'

export const imageConfig = {
  name: 'VImage',
  alias: '图片',
  icon: 'image',
  type: ComType.com,
  attr: { w: 300, h: 135 },
  config: {
    attr: { w: 300, h: 135 },
    imageType: 'image', // 取值为image和border
    src: getPublicPath('/images/com/img.svg'),
    radius: 0,
    position: '0 0',
    size: '100% 100%',
    repeat: 'no-repeat',
    border: {
      slice: '32 37 fill',
      width: '32px 37px',
      outset: '0',
      repeat: 'no-repeat',
    },
    shadow: {
      show: false,
      x: 0,
      y: 0,
      blur: 5, // 模糊值不能为负
      spread: 0,
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
export const imageTypes = [
  { value: 'image', label: '图片' },
  { value: 'border', label: '边框' },
]

export const repeatTypes = [
  { value: 'no-repeat', label: '不重复' },
  { value: 'repeat', label: '重复' },
  { value: 'repeat-x', label: '水平重复' },
  { value: 'repeat-y', label: '垂直重复' },
]

// 获取一个默认的图片配置项
export function getDefaultImageConfig(img = {}) {
  // 创建一个基础的图片组件
  const imageCfg = createComponent(imageConfig.name)
  const imgCfg = {
    alias: img.name,
    attr: img.attr ?? {},
    config: {
      imageType: img.group === 'box' ? 'border' : 'image',
      src: img.src,
      border: img.border ?? {},
      attr: img.attr ?? {}, // 原始对象的宽高属性
      css: img.css ?? {}, // 原始对象的css样式属性
    },
  }
  // 判定原始css有无参数，如有则追加一下
  if (img?.css?.size) imgCfg.config.size = img?.css?.size
  if (img?.css?.position) imgCfg.config.position = img?.css?.position

  return deepMerge(deepCopy(imageCfg), deepCopy(imgCfg))
}
