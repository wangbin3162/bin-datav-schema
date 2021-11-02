// 基本条形图配置项
import { createField, initApiConfig, initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'

const fields = [
  createField('x', { description: '值' }),
  createField('y', { description: '类目' }),
]

export const BasicHoriBarSeries = (name) => {
  return {
    type: 'bar',
    name: name || '系列',
    color: {
      type: 'solid',
      value: defaultColors[0],
      from: defaultColors[0],
      to: defaultColors[1],
    },
  }
}

export const horiBasicBarConfig = {
  alias: '基本条形图',
  icon: 'menu',
  type: ComType.com,
  attr: { w: 500, h: 300 },
  config: {
    color: defaultColors,
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 40,
        bottom: 50,
        left: 60,
        right: 10,
      },
      innerPadding: 20,
      outerPadding: 30,
      barWidth: 'auto',
      borderRadius: 0,
      background: { show: true, color: 'rgba(255, 255, 255, 0.1)' },
    },
    label: {
      show: false,
      position: 'top',
      textStyle: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'normal',
      },
      offsetX: 0,
      offsetY: 0,
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
    yAxis: {
      show: true,
      type: 'category',
      boundaryGap: true,
      title: {
        show: false,
        name: 'Y轴',
        location: 'center',
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
        color: 'rgba(255, 255, 255, 0.5)',
      },
      axisTick: {
        show: false,
        type: 'solid',
        width: 1,
        color: 'rgba(255, 255, 255, 0.5)',
      },
      axisLabel: {
        show: true,
        timeFormat: 'MM/DD',
        interval: 'auto',
        display: {
          rotate: 0,
          margin: 20,
        },
        align: 'center',
        textStyle: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.6)',
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
    xAxis: {
      show: true,
      extent: {
        min: 'auto',
        max: 'auto',
      },
      splitNumber: 0,
      title: {
        show: false,
        name: 'X轴',
        location: 'end',
        display: {
          rotate: 0,
          offset: 12,
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
        color: 'rgba(255, 255, 255, 0.5)',
      },
      axisTick: {
        show: true,
        type: 'solid',
        width: 1,
        color: 'rgba(255, 255, 255, 0.5)',
      },
      axisLabel: {
        show: true,
        valueFormat: 'auto',
        boundaryGap: 0,
        display: {
          rotate: 0,
          margin: 10,
        },
        align: 'center',
        textStyle: {
          fontSize: 12,
          color: 'rgba(255, 255, 255, 0.6)',
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
        color: '#fff',
        fontWeight: 'normal',
      },
      background: {
        padding: { h: 5, v: 5 },
        color: 'rgba(0, 0, 0, 0.65)',
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
    series: [
      BasicHoriBarSeries('系列一'),
    ],
  },
  apis: initApiConfig({
    fields: Object.assign({}, ...fields),
    description: '基本条形图接口',
  }),
  apiData: initApiData({ staticPath: 'bar/hori-basic-bar' }),
  events: {
    click: {
      description: '当点击数据项时',
      fields: Object.assign({}, ...fields),
    },
  },
  actions: {},
}
