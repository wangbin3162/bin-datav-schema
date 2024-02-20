// 基本饼图配置项
import { initApiData, ComType, BOXPLOT_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicBoxplotConfig = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    boxWidth: [7, '50'],
    itemStyle: {
      color: 'rgba(255,255,255,0.2)',
      borderColor: 'rgba(14, 123, 230, 1)',
      borderWidth: 1,
      borderType: 'solid',
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 这个无需配置，坐标轴使用axis，数据图形使用item
    axisPointer: {
      type: 'line', // 指示器样式
    },
  },
})

export default {
  name: 'VBasicBoxplot',
  alias: '盒须图',
  icon: 'boxplot',
  type: ComType.com,
  componentType: 'boxplot',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicBoxplotConfig,
  apiData: initApiData({ staticPath: 'boxplot/basic-boxplot', compType }),
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
