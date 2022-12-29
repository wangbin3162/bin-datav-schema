import { ComType } from '@/config/data-source'

export const lightEarth3dConfig = {
  name: 'VLightEarth3d',
  alias: '3d立方体',
  icon: 'CodeSandbox',
  type: ComType.com,
  attr: { w: 500, h: 500, lockedRatio: true },
  config: {
    color: '#079cd1',
    rotateSpeed: 5,
  },
  apiData: {},
  events: {},
}

export default lightEarth3dConfig
