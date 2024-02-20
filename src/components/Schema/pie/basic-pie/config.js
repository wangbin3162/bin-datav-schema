// 基本饼图配置项
import { initApiData, ComType, BASE_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicPieConfig = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    // 扩展标签
    label: {
      show: true,
      position: 'outside',
      fontSize: 12,
      color: '#fff',
      formatter: '{b}',
    },
    center: ['50%', '50%'],
    radius: ['0', '75%'],
    roseType: false,
    itemStyle: {
      borderRadius: 5,
    },
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
  name: 'VBasicPie',
  alias: '基本饼图',
  icon: 'piechart',
  type: ComType.com,
  componentType: 'pie',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicPieConfig,
  apiData: initApiData({ staticPath: 'pie/basic-pie', compType }),
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
