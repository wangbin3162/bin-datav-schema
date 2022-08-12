// 基本梯度图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'
import { ColorHelper } from '@/utils/util'

export const BasicSeries = () => {
  return defaultColors.map(item => ({
    color: {
      type: 'solid',
      value: item,
      from: ColorHelper.alpha(item, 0.8),
      to: ColorHelper.alpha(item, 0.2),
    },
  }))
}

export const basicGauge = {
  name: 'VBasicGauge',
  alias: '仪表盘',
  icon: 'dashboard',
  type: ComType.com,
  componentType: 'gauge',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      center: ['50%', '50%'],
      radius: '75%',
      startAngle: 225,
      endAngle: -45,
      clockwise: true,
      splitNumber: 10,
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#999',
        fontWeight: 'bolder',
      },
      background: {
        padding: { h: 5, v: 5 },
        color: 'rgba(255, 255, 255, 0.65)',
      },
    },
    detail: {
      show: true,
      formatter: '{value}%',
      color: null,
      fontWeight: 'bolder',
      fontSize: 30,
      width: 100,
      overflow: 'truncate',
      offsetCenter: ['0%', '95%'],
      valueAnimation: true,
      unit: '%',
    },
    axisLine: {
      show: true,
      roundCap: true,
      lineStyle: {
        color: [[1, '#E6EBF8']], //仪表盘的轴线可以被分成不同颜色的多段。每段的结束位置和颜色可以通过一个数组来表示。
        width: 10,
      },
    },
    progress: {
      show: true,
      overlap: true, //多组数据时进度条是否重叠
      width: 10, //进度条宽度
      roundCap: true,
      clip: false, //是否裁掉超出部分
    },
    splitLine: {
      show: true,
      length: '5%',
      distance: 10, //分隔线与轴线的距离
      lineStyle: {
        color: '#63677A',
        width: 3,
        type: 'solid',
      },
    },
    axisTick: {
      show: true,
      splitNumber: 5,
      length: 6,
      distance: 10,
      lineStyle: {
        color: '#fff',
        width: 1,
        type: 'solid',
      },
    },
    axisLabel: {
      show: true,
      distance: 15,
      color: '#fff',
      fontWeight: 'normal',
      fontSize: 12,
      width: 100,
      overflow: 'truncate',
    },
    pointer: {
      show: true,
      showAbove: true,
      icon: 'triangle', //标记类型包括'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      offsetCenter: [0, 0],
      length: '60%',
      width: 6,
    },
    anchor: {
      show: false,
      showAbove: true,
      size: 6,
      offsetCenter: [0, 0],
      icon: 'circle', //标记类型包括'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none',
      itemStyle: {
        color: '#fff',
        opacity: 1,
      },
    },
    title: {
      show: true,
      offsetCenter: ['0%', '70%'],
      color: '#fff',
      fontWeight: 'normal',
      fontSize: 16,
      width: 100,
      overflow: 'truncate',
    },
    series: BasicSeries(),
  },
  apiData: initApiData({ staticPath: 'funnel/basic-funnel' }),
  events: {
    click: {
      description: '当点击数据项时',
      fields: [],
    },
  },
}

export default basicGauge
