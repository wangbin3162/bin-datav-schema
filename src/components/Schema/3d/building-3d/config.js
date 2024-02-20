import { ComType } from '@/config/data-source'

export default {
  name: 'VBuilding3d',
  alias: '建筑扫描',
  icon: 'bank',
  type: ComType.com,
  attr: { w: 800, h: 800, lockedRatio: true },
  config: {
    color: '#02204e',
    rotateSpeed: 1.5,
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
