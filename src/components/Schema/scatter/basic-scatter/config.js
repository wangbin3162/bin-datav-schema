// 基本散点图配置项
import { initApiData, ComType, SCATTER_ECHART_BASE as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicScatterConfig = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    // 扩展标签
    label: {
      show: false,
      position: 'top',
      fontSize: 12,
      color: '#fff',
    },
    symbol: 'rect', //形状
    symbolSize: 10, //大小
    symbolRotate: 7, //旋转弧度
    symbolOffset: [0, 0], //偏移量
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 这个无需配置，坐标轴使用axis，数据图形使用item
    axisPointer: {
      type: 'line', // 指示器样式
    },
  },
  xAxis: {
    type: 'category',
    // min: 140,
    // max: null,
    boundaryGap: ['0', '0'],
  },
  yAxis: {
    type: 'value',
    min: 'dataMin',
    max: null,
  },
})

export default {
  name: 'VBasicScatter',
  alias: '基本散点图',
  icon: 'pointmap',
  type: ComType.com,
  componentType: 'scatter',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicScatterConfig,
  apiData: initApiData({ staticPath: 'scatter/basic-scatter', compType }),
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
