import { ComType } from '@/config/data-source'

export const earth3dConfig = {
  name: 'VCube3d',
  alias: '3d盒子',
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

export default earth3dConfig
