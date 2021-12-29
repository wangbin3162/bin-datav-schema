import { ComType } from '@/config/data-source'
import { getCDNPath } from '@/utils/env'

export const mainImgConfig = {
  alias: '单张图片',
  icon: 'image',
  type: ComType.com,
  attr: { w: 300, h: 180 },
  config: {
    backgroundImage: getCDNPath('/background/bg1.jpg'),
    repeat: 'no-repeat',
    radius: 2,
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apiData: {},
  events: {},
}
