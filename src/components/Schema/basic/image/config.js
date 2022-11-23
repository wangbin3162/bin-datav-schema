import { ComType } from '@/config/data-source'
import { getPublicPath } from '@/utils/env'

export const imageConfig = {
  name: 'VImage',
  alias: '图片',
  icon: 'image',
  type: ComType.com,
  attr: { w: 500, h: 300 },
  config: {
    imageType: 'image', // 取值为image和border
    src: getPublicPath('/images/com/img.svg'),
    repeat: 'no-repeat',
    radius: 2,
    borderImg: {
      source: '',
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
  { value: 'background', label: '背景' },
  { value: 'border', label: '边框' },
]
