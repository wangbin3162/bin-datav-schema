import { ComType } from '@/config/data-source'

export const borderBoxConfig = {
  name: 'VBorderBox',
  alias: '边框',
  icon: 'gateway',
  type: ComType.com,
  attr: { w: 300, h: 180 },
  config: {
    img: 'box1',
  },
  apiData: {},
  events: {},
}
export default borderBoxConfig
