/**
 * 基础组件类
 */
import { deepCopy, deepMerge, generateId } from '@/utils/util'
import { basicBarConfig } from '@/components/Schema/bar/basic-bar/config'
import { mainTitleConfig } from '@/components/Schema/text/main-title/config'
import { numberTitleFlopConfig } from '@/components/Schema/text/number-title-flop/config'
import { decorationConfig } from '@/components/Schema/media/decoration/config'
import { borderBoxConfig } from '@/components/Schema/media/border-box/config'
import { mainImgConfig } from '@/components/Schema/media/main-img/config'
import { timerConfig } from '@/components/Schema/text/timer/config'
import { bgBoxConfig } from '@/components/Schema/media/bg-box/config'
import { horiBasicBarConfig } from '@/components/Schema/bar/hori-basic-bar/config'
import { basicLineConfig } from '@/components/Schema/line/basic-line/config'

const DatavComponent = {
  id: '',
  name: '',
  alias: '',
  type: '',
  locked: false,
  hided: false,
  attr: {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    rotate: 0,
    opacity: 1,
  },
  apiData: {},
  apis: {},
  events: {},
}

function mergeConfig(name, config) {
  const mergeObj = deepMerge(deepCopy(DatavComponent), config || {})
  mergeObj.id = `${name}_${generateId()}`
  mergeObj.name = `V${name}`
  if (mergeObj.apiData.source) {
    mergeObj.apiData.source.comId = mergeObj.id
  }
  return mergeObj
}

/**
 * 创建组件
 * @param name
 */
export function createComponent(name) {
  switch (name.substr(1)) {
    case 'BasicBar':
      return mergeConfig('BasicBar', basicBarConfig)
    case 'HorizontalBar':
      return mergeConfig('HorizontalBar', horiBasicBarConfig)
    case 'BasicLine':
      return mergeConfig('BasicLine', basicLineConfig)
    case 'MainTitle':
      return mergeConfig('MainTitle', mainTitleConfig)
    case 'NumberTitleFlop':
      return mergeConfig('NumberTitleFlop', numberTitleFlopConfig)
    case 'Timer':
      return mergeConfig('Timer', timerConfig)
    case 'BgBox':
      return mergeConfig('BgBox', bgBoxConfig)
    case 'BorderBox':
      return mergeConfig('BorderBox', borderBoxConfig)
    case 'Decoration':
      return mergeConfig('Decoration', decorationConfig)
    case 'MainImg':
      return mergeConfig('MainImg', mainImgConfig)
    default:
      throw Error(`Unknown component type: ${name}.`)
  }
}
