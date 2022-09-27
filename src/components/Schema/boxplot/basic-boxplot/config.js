// 基本饼图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'
import { ColorHelper } from '@/utils/util'

const BasicBarSeries = () => {
  return defaultColors.map(item => ({
    borderColor: item,
    color: {
      type: 'solid',
      value: 'rgba(255,255,255,0.2)',
      from: ColorHelper.alpha(item, 0.8),
      to: ColorHelper.alpha(item, 0.2),
    },
  }))
}

export const basicBoxplotConfig = {
  name: 'VBasicBoxplot',
  alias: '盒须图',
  icon: 'boxplot',
  type: ComType.com,
  componentType: 'boxplot',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      boxWidth: [7, '50'],
      itemStyle: {
        color: '#fff',
        borderColor: 'rgba(14, 123, 230, 1)',
        borderWidth: 1,
        borderType: 'solid',
      },
      margin: {
        top: 40,
        bottom: 40,
        left: 50,
        right: 20,
      },
      layout: 'horizontal',
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
      type: 'category',
      boundaryGap: true,
      nameGap: 15,
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
      grid: {
        show: false,
        line: {
          type: 'dashed',
          width: 1,
          color: 'rgba(233, 228, 228, 0.1)',
          dashedLength: 4,
          dashedSpace: 4,
        },
      },
      splitArea: {
        show: false,
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
        formatter: '',
        interval: 'auto',
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
    },
    yAxis: {
      type: 'value',
      show: true,
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
        formatter: '',
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
      splitArea: {
        show: false,
        color: ['rgba(13, 42, 66, 1)', 'rgba(255, 255, 255, 0.2)'],
      },
    },
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
      },
      background: {
        padding: {
          h: 5,
          v: 5,
        },
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
    series: BasicBarSeries(),
  },
  apiData: initApiData({ staticPath: 'boxplot/basic-boxplot' }),
  events: {
    click: {
      name: '当点击数据项时',
      params: [],
    },
  },
}

export default basicBoxplotConfig
