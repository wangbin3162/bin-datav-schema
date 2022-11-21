// 基本线图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'

export const BasicLineSeries = () => {
  return defaultColors.map(item => ({
    lineStyle: {
      width: 2,
      color: item,
      type: 'solid',
    },
  }))
}

export const basicLineConfig = {
  name: 'VBasicLine',
  alias: '基本线图',
  icon: 'linechart',
  type: ComType.com,
  componentType: 'line',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      margin: {
        top: 40,
        bottom: 50,
        left: 50,
        right: 10,
      },
      smooth: false,
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
    xAxis: {
      show: true,
      type: 'category',
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
        timeFormat: 'MM/DD',
        interval: 'auto',
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
        show: false,
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
        show: false,
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
          type: 'solid',
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
    series: BasicLineSeries(),
  },
  apiData: initApiData({ staticPath: 'line/basic-line' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}

export default basicLineConfig
