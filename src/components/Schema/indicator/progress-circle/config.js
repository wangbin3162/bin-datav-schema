// 基本饼图配置项
import { initApiData, ComType, CIRCLE as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'

export default {
  name: 'VProgressCircle',
  alias: '进度环',
  icon: 'redo',
  type: ComType.com,
  componentType: 'progress-circle',
  attr: { w: 200, h: 200 },
  config: {
    linecap: 'round',
    width: 6,
    color: '#2db7f5',
    trailWidth: 5,
    trailColor: '#eaeef2',
    dashboard: false,
    value: {
      show: true,
      fontSize: 24,
      color: '#fff',
    },
    title: {
      show: false,
      content: '我是标题',
      fontSize: 24,
      color: '#fff',
    },
    num: {
      show: false,
      fontSize: 24,
      color: '#fff',
    },
    numFormat: '{num}条',
  },
  apiData: initApiData({ staticPath: 'progress/progress', compType }),
  events: {
    onEvents: [],
    defaultAction: true,
    actions: getBaseActions(),
    click: {
      name: '点击数据项',
      params: [],
    },
    customScript: {
      augments: ['curComp', 'components'],
      enable: false,
    },
  },
}
