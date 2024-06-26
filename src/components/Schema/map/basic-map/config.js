// 基本漏斗图配置项
import { initApiData, ComType } from '@/config/data-source'

export default {
  name: 'VBasicMap',
  alias: '地图',
  icon: 'location',
  type: ComType.com,
  componentType: 'gauge',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      areaColor: {
        type: 'gradient',
        value: 'rgba(2, 20, 42, 1)',
        from: 'rgba(56, 96, 155, 1)',
        to: 'rgba(2, 20, 42, 1)',
      },
      borderColor: 'rgba(146, 193, 240, 1)',
      borderWidth: 1,
      borderType: 'solid',
      itemStyle: {
        areaColor: '#cfe7ff', //悬浮区域背景色
        borderColor: '#53D9FF', //悬浮边框颜色
        borderWidth: 1, //悬浮边框宽度
        borderType: 'solid',
      },
      shadowColor: 'rgba(0, 0, 0, 0.6)', //阴影颜色
      shadowOffsetX: 0, //水平偏移
      shadowOffsetY: 0, //垂直偏移
    },
    label: {
      //悬浮标识
      show: false,
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: 10,
      fontWeight: 'normal',
      position: 'top ',
      emphasis: {
        show: false,
        color: '#f75a00',
        fontSize: 14,
        fontWeight: 'bold',
        position: 'inside',
      },
    },
    tooltip: { trigger: 'item' },
    // 用于显示立体阴影与散点图坐标系
    geo: {
      map: 'china',
      aspectScale: 0.75, //长宽比
      zoom: 1.4,
      roam: false,
      center: [104, 33],
      regions: [
        {
          name: '南海诸岛',
          itemStyle: {
            opacity: 0,
          },
        },
      ],
    },
    series: [
      {
        map: 'china',
        tooltip: {
          show: false,
        },
        zoom: 1.4,
        type: 'map',
        roam: false,
        center: [104, 33],
        selectedMode: false,
        label: {
          // 处理悬浮高亮时label过度效果
          show: false,
          color: '#f75a00',
          fontSize: 12,
        },
        data: [],
      },
    ],
  },
  apiData: initApiData({ staticPath: '' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}
