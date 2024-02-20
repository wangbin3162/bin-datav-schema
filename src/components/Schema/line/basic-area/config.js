// 基本区域图配置项
import { initApiData, ComType, BASE_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicAreaConfig = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    // 扩展标签
    label: {
      show: false,
      position: 'top',
      fontSize: 12,
      color: '#fff',
    },
    smooth: false,
    areaStyle: {
      from: 70,
      to: 10,
      opacity: 70,
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
  name: 'VBasicArea',
  alias: '基本区域图',
  icon: 'linechart',
  type: ComType.com,
  componentType: 'line',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicAreaConfig,
  apiData: initApiData({ staticPath: 'line/basic-line', compType }),
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
