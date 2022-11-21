// 基本饼图配置项
import { initApiData, ComType } from '@/config/data-source'

export const lineBasicScatterConfig = {
  name: 'VLineBasicScatter',
  alias: '散点线图',
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
        left: 30,
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
      color: 'rgba(163, 161, 161, 1)',
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
      type: 'category',
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
    series: [],
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
  apiData: initApiData({ staticPath: 'scatter/line-basic-scatter' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}

export default lineBasicScatterConfig
