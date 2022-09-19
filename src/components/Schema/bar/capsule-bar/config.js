// 基本柱图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'

export const capsuleBarConfig = {
  name: 'VCapsuleBar',
  alias: '胶囊柱图',
  icon: 'barchart',
  type: ComType.com,
  componentType: 'bar',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 10,
        bottom: 10,
        left: 30,
        right: 30,
      },
      borderRadius: [5, 5, 5, 5],
      barHeight: 10,
      barMargin: 5,
      barBg: null,
      shadow: '0 0 3px',
      shadowColor: '#999',
      unit: '',
    },
    label: {
      show: false,
      color: '#fff',
      position: 'right',
    },
    xAxis: {
      show: true,
      color: '#fff',
    },
    yAxis: {
      show: true,
      color: '#fff',
    },
    color: defaultColors,
  },
  apiData: initApiData({ staticPath: 'bar/capsule-bar' }),
  events: {
    click: {
      description: '当点击数据项时',
      fields: [],
    },
  },
}

export default capsuleBarConfig
