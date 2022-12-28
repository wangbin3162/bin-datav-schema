import { ComType } from '@/config/data-source'

export const earth3dConfig = {
  name: 'VEarth3d',
  alias: '3d点阵地球',
  icon: 'earth',
  type: ComType.com,
  attr: { w: 500, h: 500, lockedRatio: true },
  config: {
    radius: 100,
    dotColor: '#079cd1',
    blintSpeed: 5,
    rotateSpeed: 5,
  },
  apiData: {},
  events: {},
}

export default earth3dConfig
