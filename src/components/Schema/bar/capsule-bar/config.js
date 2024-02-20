// 胶囊柱图配置项
import { initApiData, ComType, CAPSULE_BAR_ECHART as compType } from '@/config/data-source'

import { getBaseActions } from '@/utils/events'

export default {
  name: 'VCapsuleBar',
  alias: '胶囊柱图',
  icon: 'barchart',
  type: ComType.com,
  componentType: 'bar',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      label: {
        show: false,
        fontSize: 12,
        color: '#fff',
        position: 'right',
      },
      borderRadius: [5, 5, 5, 5],
      barHeight: 15,
      barMargin: 5,
      barBg: null,
      shadow: '0 0 3px',
      shadowColor: '#999',
      unit: '',
    },
    grid: {
      top: 20,
      bottom: 10,
      left: 30,
      right: 30,
    },
    xAxis: {
      show: true,
      color: '#fff',
    },
    yAxis: {
      show: true,
      color: '#fff',
    },
  },
  apiData: initApiData({ staticPath: 'bar/capsule-bar', compType }),
  events: {
    onEvents: [],
    defaultAction: true,
    actions: getBaseActions(),
    click: {
      name: '点击数据项',
      params: [],
    },
    customScript: {
      augments: ['curComp','components'],
      enable: false,
    },
  },
}
