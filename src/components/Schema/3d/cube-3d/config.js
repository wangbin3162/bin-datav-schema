import { ComType } from '@/config/data-source'

export default {
  name: 'VCube3d',
  alias: '3d盒子',
  icon: 'CodeSandbox',
  type: ComType.com,
  attr: { w: 500, h: 500, lockedRatio: true },
  config: {
    color: '#079cd1',
    rotateSpeed: 2,
  },
  apiData: {},
  events: {},
}
