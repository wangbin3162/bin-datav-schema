// 基本饼图配置项
import { initApiData, ComType, RADAR_ECHART as compType } from '@/config/data-source'
import { getBaseActions } from '@/utils/events'
import { mergeChartOptions } from '@/theme'

export const basicRadarConfig = mergeChartOptions({
  // global为全局配置，主要用于给seris进行扩展工作
  global: {
    // 扩展标签
    label: {
      show: false,
      position: 'top',
      fontSize: 12,
      color: '#fff',
      formatter: '{c}',
    },
    center: ['50%', '50%'],
    radius: '70%',
    startAngle: 90,
    shape: 'polygon',
    splitNumber: 4,
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(211, 253, 250, 0.8)',
      },
    },
    axisName: {
      show: true,
      color: 'rgba(211, 253, 250, 0.8)',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['rgba(211, 253, 250, 0.8)'],
      },
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
      },
    },
    symbolSize: 2,
    areaStyle: {
      opacity: 0.1,
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
  name: 'VBasicRadar',
  alias: '基本雷达图',
  icon: 'radarchart',
  type: ComType.com,
  componentType: 'radar',
  attr: { w: 500, h: 300, chartThemeColor: '' },
  config: basicRadarConfig,
  apiData: initApiData({ staticPath: 'radar/basic-radar', compType }),
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
