// 基本漏斗图配置项
import { initApiData, ComType } from '@/config/data-source'

export default {
  name: 'VBasicMapEvo',
  alias: '省份地图',
  icon: 'location',
  type: ComType.com,
  componentType: 'gauge',
  attr: { w: 500, h: 300 },
  config: {
    geo: {
      itemStyle: {
        // 区域样式
        areaColor: 'rgba(2, 20, 42, 1)',
        borderType: 'solid',
        borderColor: 'rgba(146, 193, 240, 1)',
        borderWidth: 1,
      },
      emphasis: {
        // 区域高亮样式
        itemStyle: {
          areaColor: '#FFD181',
          borderType: 'solid',
          borderColor: '#a3d0f8',
          borderWidth: 1,
        },
      },
      label: {
        // 标注
        show: true,
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 10,
        fontWeight: 'normal',
        position: 'top',
      },
    },
    province: '河北省',
    cityValue: '',
  },
  apiData: initApiData({ staticPath: '' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}
