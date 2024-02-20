import { ComType, initApiData, SCROLL_TABLE as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'

export default {
  name: 'VScrollTable',
  alias: '滚动表格',
  icon: 'table',
  type: ComType.com,
  componentType: 'scrollTable',
  attr: { w: 500, h: 260 },
  config: {
    rowNum: 5,
    headerBGC: '#00BAFF',
    oddRowBGC: '#003B51',
    evenRowBGC: '#0A2732',
    waitTime: 2000,
    headerHeight: 35,
    indexHeader: '#',
    carousel: 'single',
    hoverPause: false,
    index: true,
    indexWidth: 50, // 行号宽度
    indexAlign: 'center', // 行号对齐
    columnWidth: [],
    align: [],
  },
  apiData: initApiData({ staticPath: 'table/scroll-table', compType }),
  events: {
    onEvents: [],
    defaultAction: true,
    customScript: {
      augments: ['curComp', 'components'],
      enable: false,
    },
    actions: getBaseActions(),
  },
}
