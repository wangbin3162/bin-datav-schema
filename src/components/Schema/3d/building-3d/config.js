import { ComType } from '@/config/data-source'

export const building3dConfig = {
  name: 'VBuilding3d',
  alias: '3d盒子',
  icon: 'CodeSandbox',
  type: ComType.com,
  attr: { w: 800, h: 800, lockedRatio: true },
  config: {
    color: '#024144',
    rotateSpeed: 2,
    scale: 0.016,
    cameraPos: '0, 0.5, 4.5',
    // 发光属性
    threshold: 0.8,
    strength: 0.8,
    radius: 0.2,
    control: false,
  },
  apiData: {},
  events: {},
}

export default building3dConfig
