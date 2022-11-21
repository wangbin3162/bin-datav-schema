// 基本饼图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'
import { ColorHelper } from '@/utils/util'

const BasicBarSeries = () => {
  return defaultColors.map(item => ({
    color: {
      type: 'solid',
      value: item,
      from: ColorHelper.alpha(item, 0.8),
      to: ColorHelper.alpha(item, 0.2),
    },
  }))
}

export const basicScatterConfig = {
  name: 'VBasicScatter',
  alias: '基本散点图',
  icon: 'pointmap',
  type: ComType.com,
  componentType: 'scatter',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 35,
        bottom: 35,
        left: 20,
        right: 30,
        containLabel: true,
      },
      symbol: 'rect', //形状
      symbolSize: 10, //大小
      symbolRotate: 7, //旋转弧度
      symbolOffset: [0, 0], //偏移量
      itemStyle: {
        color: null,
        opacity: 0.8,
      },
      background: {
        show: true,
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    label: {
      show: false,
      position: 'top',
      offset: [2.5, -3.5],
      color: '#fff',
      fontWeight: 'normal',
      fontSize: 12,
    },
    legend: {
      show: true,
      position: 'top-center',
      orient: 'horizontal',
      textStyle: {
        fontSize: 12,
        color: '#90a0ae',
        fontWeight: 'normal',
      },
      symbol: {
        show: true,
        icon: 'auto',
        width: 25,
        height: 14,
        gap: 10,
      },
    },
    xAxis: {
      show: true,
      type: 'value',
      scale: true,
      boundaryGap: true,
      title: {
        show: false,
        name: 'X轴',
        location: 'center',
        display: {
          rotate: 0,
          offset: 30,
        },
        textStyle: {
          fontSize: 12,
          color: '#90a0ae',
          fontWeight: 'normal',
        },
      },
      axisLine: {
        show: true,
        type: 'solid',
        width: 1,
        color: '#90a0ae',
      },
      axisTick: {
        show: true,
        type: 'solid',
        width: 1,
        color: '#90a0ae',
        interval: 'auto',
      },
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: 'cm',
        display: {
          rotate: 0,
          margin: 10,
        },
        align: 'center',
        textStyle: {
          fontSize: 12,
          color: '#90a0ae',
          fontWeight: 'normal',
        },
      },
      grid: {
        show: true,
        line: {
          type: 'dashed',
          width: 1,
          color: 'rgba(233, 228, 228, 0.1)',
          dashedLength: 4,
          dashedSpace: 4,
        },
      },
    },
    yAxis: {
      type: 'value',
      show: true,
      scale: true,
      extent: {
        min: 'auto',
        max: 'auto',
      },
      splitNumber: 0,
      title: {
        show: false,
        name: 'Y轴',
        location: 'end',
        display: {
          rotate: 0,
          offset: 20,
        },
        textStyle: {
          fontSize: 12,
          color: '#90a0ae',
          fontWeight: 'normal',
        },
      },
      axisLine: {
        show: true,
        type: 'solid',
        width: 1,
        color: '#90a0ae',
      },
      axisTick: {
        show: true,
        type: 'solid',
        width: 1,
        color: '#90a0ae',
      },
      axisLabel: {
        show: true,
        formatter: 'kg',
        boundaryGap: 0,
        display: {
          rotate: 0,
          margin: 10,
        },
        align: 'right',
        textStyle: {
          fontSize: 12,
          color: '#90a0ae',
          fontWeight: 'normal',
        },
      },
      grid: {
        show: true,
        line: {
          type: 'dashed',
          width: 1,
          color: 'rgba(233, 228, 228, 0.1)',
          dashedLength: 4,
          dashedSpace: 4,
        },
      },
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'normal',
      },
      background: {
        padding: {
          h: 5,
          v: 5,
        },
        color: '#fff',
      },
      pointer: {
        show: true,
        line: {
          type: 'dashed',
          width: 1,
          color: '#f5dc69',
          dashedLength: 4,
          dashedSpace: 4,
        },
      },
    },
    series: BasicBarSeries(),
  },
  apiData: initApiData({ staticPath: 'scatter/basic-scatter' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}

export default basicScatterConfig
