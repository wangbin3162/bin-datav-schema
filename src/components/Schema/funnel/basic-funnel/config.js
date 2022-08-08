// 基本梯度图配置项
import { initApiData, ComType } from '@/config/data-source'
import { defaultColors } from '@/config/colors'
import { ColorHelper } from '@/utils/util'

export const BasicBarSeries = () => {
  return defaultColors.map((item,index) => ({
    color: {
      type: 'solid',
      value: item,
      from: ColorHelper.alpha(item, 0.8),
      to: ColorHelper.alpha(defaultColors[index + 1], 0.2),
    },
  }))
}

export const basicFunnel = {
  alias: '梯度图',
  icon: 'funnelchart',
  type: ComType.com,
  componentType: 'funnel',
  attr: { w: 500, h: 300 },
  config: {
    global: {
      minSize: '20%', //数据最小值min映射宽度
      maxSize: '80%', //数据最大值映射宽度
      orient: 'vertical', //vertical垂直分布/horizontal纵向分布
      sort: 'descending', //ascending从小到大/descending从大到小/none数组顺序
      gap: 5, //数据图形间距
      margin: {
        left: '20',
        top: '20',
        right: '20',
        bottom: '20',
      },
      funnelAlign: 'center', //水平方向对齐布局类型，默认居中 left/right/center
    },
    label: {
      show: true,
      position: 'left',
      textStyle: {
        fontSize: 12,
        color: '#90a0ae',
        fontWeight: 'normal',
      },
      formatter: '',
    },
    labelLine: {
      show: false,
      length: 30,
      lineStyle: {
        color: null,
        width: 1,
        type: 'solid',
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
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    legend: {
      show: false,
      position: 'middle-auto',
      orient: 'vertical',
      top: 'middle',
      right: '1%',
      bottom: 'auto',
      left: 'auto',
      symbol: {
        show: true,
        icon: 'circle',
        width: 25,
        height: 14,
        gap: 10,
      },
      textStyle: {
        fontSize: 12,
        color: '#90a0ae',
        fontWeight: 'normal',
        rich: {
          name: {
            width: 170,
            fontSize: 13,
          },
          per: {
            width: 50,
            fontSize: 13,
          },
          value: {
            width: 30,
            fontSize: 13,
            color: '#999',
            align: 'right',
          },
        },
      },
      formatter: '{name|自然人行政许可}{per|26%} {value|50}',
      selectedMode: true, //图例选择模式
      color: defaultColors,
    },
    series: BasicBarSeries(),
  },
  apiData: initApiData({ staticPath: 'funnel/basic-funnel' }),
  events: {
    click: {
      description: '当点击数据项时',
      fields: [],
    },
  },
}
