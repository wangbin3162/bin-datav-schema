import { ComType } from '@/config/data-source'
import { getBgPath } from '@/utils/env'

export const mainImgConfig = {
  alias: '单张图片',
  icon: 'image',
  type: ComType.com,
  attr: { w: 300, h: 180 },
  config: {
    backgroundImage: getBgPath('title.jpg'),
    repeat: 'no-repeat',
    radius: 2,
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apis: {},
  apiData: {},
  events: {},
  actions: {},
}
