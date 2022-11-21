// 基本梯度图配置项
import { initApiData, ComType } from '@/config/data-source'

export const basicMapEvo = {
  name: 'VBasicMapEvo',
  alias: '省份地图',
  icon: 'location',
  type: ComType.com,
  componentType: 'gauge',
  attr: { w: 500, h: 300 },
  config: {
    itemStyle: {
      // 区域样式
      areaColor: '#bddffd',
      borderType: 'solid',
      borderColor: '#0E95F1',
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
      color: '#333',
      fontSize: 10,
      fontWeight: 'normal',
      position: 'top',
    },
  },
  apiData: initApiData({ staticPath: '' }),
  events: {
    click: {
      name: '点击数据项',
      params: [],
    },
  },
}
export default basicMapEvo
