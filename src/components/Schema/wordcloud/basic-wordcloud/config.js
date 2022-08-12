// 基本梯度图配置项
import { initApiData, ComType } from '@/config/data-source'

export const basicWordCloud = {
  name: 'VBasicWordCloud',
  alias: '词云图',
  icon: 'cloud',
  type: ComType.com,
  componentType: 'other',
  attr: { w: 500, h: 300 },
  config: {
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 14,
        color: '',
        fontWeight: 'normal',
      },
    },
    series: [
      {
        type: 'wordCloud',
        sizeRange: [10, 45], //字体大小范围
        rotationRange: [0, 0], //文字旋转范围
        rotationStep: 45, //随机旋转步长
        gridSize: 13, //文本之间的距离
        shape: 'circle', //绘制词云的形状  circle  圆形 cardioid 心形 diamond  菱形 正方形 triangle-forward, triangle  三角形  pentagon 五边形 star 星形
        drawOutOfBound: false, //是否允许词云图在外界渲染
        grid: {
          left: 'center',
          top: 'middle',
        },
        width: '100%',
        height: '100%',
        textStyle: {
          color: '#fff',
          emphasis: {
            // 字高亮时显示的效果
            textStyle: {
              shadowBlur: 10, // 阴影距离
              shadowColor: '#ee6666', // 阴影颜色
            },
          },
        },
        data: [],
      },
    ],
  },
  apiData: initApiData({ staticPath: 'wordcloud/basic-wordcloud' }),
  events: {
    click: {
      description: '当点击数据项时',
      fields: [],
    },
  },
}

export default basicWordCloud
