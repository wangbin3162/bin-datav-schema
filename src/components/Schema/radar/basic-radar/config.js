// 基本饼图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'

export const basicRadarConfig = {
  alias: '基本雷达图',
  icon: 'radarchart',
  type: ComType.com,
  componentType: 'pie',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      fontFamily: 'Microsoft Yahei',
      center: ['50%', '50%'],
      radius: '75%',
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
    label: {
      show: false,
      position: 'top',
      textStyle: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.6)',
        fontWeight: 'normal',
      },
      formatter: '',
    },
    legend: {
      show: false,
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
    tooltip: {
      show: false,
      textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal',
      },
      background: {
        padding: { h: 5, v: 5 },
        color: 'rgba(0, 0, 0, 0.65)',
      },
    },
    color: defaultColors,
  },
  apiData: initApiData({ staticPath: 'radar/basic-radar' }),
  events: {
    click: {
      description: '当点击数据项时',
      fields: [],
    },
  },
}
