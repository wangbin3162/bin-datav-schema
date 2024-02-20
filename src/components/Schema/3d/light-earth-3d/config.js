import { ComType } from '@/config/data-source'

export default {
  name: 'VLightEarth3d',
  alias: '发光地球',
  icon: 'earth',
  type: ComType.com,
  attr: { w: 500, h: 500, lockedRatio: true },
  config: {
    rotateSpeed: 2,
    radius: 100,
    control: false,

    showLightEarth: true,
    lightOffset: 2,

    lightLine: true,
    lightSize: 30,

    showGlow: true,
    innerGlowRatio: 2.65,
  },
  apiData: {},
  events: {},
}
