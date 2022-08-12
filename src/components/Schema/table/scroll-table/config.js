import { ComType, initApiData } from '@/config/data-source'

export const scrollTableConfig = {
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
  apiData: initApiData({ staticPath: 'table/scroll-table' }),
  events: {},
}

export default scrollTableConfig
