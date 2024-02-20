// 基本散点线图配置项
import { initApiData, ComType, SCATTER_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const lineBasicScatterConfig = mergeChartOptions({
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
    line: {
      show: true,
      label: {
        show: true,
        position: 'left',
        offset: [0, -20],
        color: 'rgba(255,255,255,0.7)',
        fontWeight: 'normal',
        fontSize: 16,
      },
      smooth: true,
      lineEcStat: 'exponential',
    },
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
    boundaryGap: ['0', '0'],
  },
  yAxis: {
    type: 'value',
  },
})

export default {
  name: 'VLineBasicScatter',
  alias: '散点线图',
  icon: 'pointmap',
  type: ComType.com,
  componentType: 'scatter',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: lineBasicScatterConfig,
  apiData: initApiData({ staticPath: 'scatter/line-basic-scatter', compType }),
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
