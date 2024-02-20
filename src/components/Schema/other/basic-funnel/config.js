// 基本漏斗图配置项
import { initApiData, ComType, TRAPEZIUM_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicFunnel = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    // 扩展标签
    label: {
      show: false,
      position: 'left',
      fontSize: 12,
      color: '#fff',
      formatter: '{b}',
    },
    labelLine: {
      show: false,
      length: 30,
      lineStyle: {
        color: null,
        width: 1,
        type: 'solid',
      },
    },
    minSize: '20%', //数据最小值min映射宽度
    maxSize: '80%', //数据最大值映射宽度
    orient: 'vertical', //vertical垂直分布/horizontal纵向分布
    sort: 'descending', //ascending从小到大/descending从大到小/none数组顺序
    gap: 2, //数据图形间距
    funnelAlign: 'center', //水平方向对齐布局类型，默认居中 left/right/center
  },
  grid: {
    left: 20,
    top: 40,
    right: 20,
    bottom: 50,
  },
  legend: {
    show: true,
    top: 'middle',
    left: 'right',
    orient: 'vertical',
  },
  tooltip: {
    show: true,
    trigger: 'item', // 这个无需配置，坐标轴使用axis，数据图形使用item
    axisPointer: {
      type: 'none', // 指示器样式
    },
  },
  xAxis: { show: false },
  yAxis: { show: false },
})

export default {
  name: 'VBasicFunnel',
  alias: '漏斗图',
  icon: 'funnelplot',
  type: ComType.com,
  componentType: 'funnel',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicFunnel,
  apiData: initApiData({ staticPath: 'funnel/basic-funnel', compType }),
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
