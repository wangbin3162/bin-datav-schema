// 基本柱图配置项
import { initApiData, ComType, BASE_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicBarConfig = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    // 扩展标签
    label: {
      show: false,
      position: 'top',
      fontSize: 12,
      color: '#fff',
    },
    barWidth: 'auto',
    barGap: 20, // 不同系列的柱间距离
    barCategoryGap: 30, // 同一系列的柱间距离
    showBackground: false,
    backgroundStyle: { color: 'rgba(255, 255, 255, 0.1)' },
    itemStyle: {
      type: 'solid', // gradient  动态的，如果是gardient，则需要扩展from，to
      from: 80,
      to: 20,
      borderRadius: [0, 0, 0, 0],
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis', // 这个无需配置，坐标轴使用axis，数据图形使用item
    axisPointer: {
      type: 'shadow', // 指示器样式
    },
  },
})

export default {
  name: 'VBasicBar',
  alias: '基本柱图',
  icon: 'barchart',
  type: ComType.com,
  componentType: 'bar',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicBarConfig,
  apiData: initApiData({ staticPath: 'bar/basic-bar', compType }),
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
