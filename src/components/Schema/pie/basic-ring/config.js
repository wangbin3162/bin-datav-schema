// 基本饼图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'

export const basicRingConfig = {
  name: 'VBasicRing',
  alias: '基本环图',
  icon: 'piechart',
  type: ComType.com,
  componentType: 'pie',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      center: ['50%', '50%'],
      radius: ['50%', '75%'],
      roseType: false,
      borderRadius: 5,
    },
    label: {
      show: true,
      position: 'outside',
      textStyle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'normal',
      },
      formatter: '',
      alignTo: 'none',
      bleedMargin: 10,
      distanceToLabelLine: 5,
    },
    legend: {
      show: true,
      position: 'bottom-center',
      orient: 'horizontal',
      textStyle: {
        fontSize: 12,
        color: '#90a0ae',
        fontWeight: 'normal',
      },
      symbol: {
        show: true,
        icon: 'auto',
        width: 25,
        height: 14,
        gap: 10,
      },
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
      },
      background: {
        padding: { h: 5, v: 5 },
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
    color: defaultColors,
  },
  apiData: initApiData({ staticPath: 'pie/basic-pie' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}
export default basicRingConfig
