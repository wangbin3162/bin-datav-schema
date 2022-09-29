/**
 * 所有组件列表
 */
import { getComPath } from '@/utils/env'

// 柱图-基本柱图
export const VBasicBar = {
  name: 'VBasicBar',
  alias: '基本柱图',
  img: getComPath('basic-bar.svg'),
  type: 'bar',
  used: true,
}
// 柱图-基本条形图
export const VHorizontalBar = {
  name: 'VHorizontalBar',
  alias: '基本条形图',
  img: getComPath('hori-basic-bar.svg'),
  type: 'bar',
  used: true,
}
// 柱图-胶囊柱图
export const VCapsuleBar = {
  name: 'VCapsuleBar',
  alias: '胶囊柱图',
  img: getComPath('capsule-bar.svg'),
  type: 'bar',
  used: true,
}
// 线图-基本线图
export const VBasicLine = {
  name: 'VBasicLine',
  alias: '基本折线图',
  img: getComPath('basic-line.svg'),
  type: 'line',
  used: true,
}
// 线图-区域图
export const VBasicArea = {
  name: 'VBasicArea',
  alias: '基本区域图',
  img: getComPath('basic-area.svg'),
  type: 'line',
  used: true,
}
// 饼图-基本饼图
export const VBasicPie = {
  name: 'VBasicPie',
  alias: '基本饼图',
  img: getComPath('basic-pie.svg'),
  type: 'pie',
  used: true,
}
// 饼图-基本环图
export const VBasicRing = {
  name: 'VBasicRing',
  alias: '基本环图',
  img: getComPath('basic-ring.svg'),
  type: 'pie',
  used: true,
}
// 地图-基本雷达图
export const VBasicRadar = {
  name: 'VBasicRadar',
  alias: '基本雷达图',
  img: getComPath('basic-radar.svg'),
  type: 'radar',
  used: true,
}
// 地图-基本地图
export const VBasicMap = {
  name: 'VBasicMap',
  alias: '基本地图',
  img: getComPath('2d-china.svg'),
  type: 'map',
  used: true,
}
// 地图-省份地图
export const VBasicMapEvo = {
  name: 'VBasicMapEvo',
  alias: '省份地图',
  img: getComPath('basic-map-evo.svg'),
  type: 'map',
  used: true,
}
// 基本散点图
export const VBasicScatter = {
  name: 'VBasicScatter',
  alias: '基本散点图',
  img: getComPath('basic-scatter.svg'),
  type: 'scatter',
  used: true,
}
// 散点图
export const VLineBasicScatter = {
  name: 'VLineBasicScatter',
  alias: '散点线图',
  img: getComPath('line-basic-scatter.svg'),
  type: 'scatter',
  used: true,
}
// 盒须图
export const VBasicBoxplot = {
  name: 'VBasicBoxplot',
  alias: '盒须图',
  img: getComPath('basic-boxplot.svg'),
  type: 'boxplot',
  used: true,
}
// 基本梯度图
export const VBasicFunnel = {
  name: 'VBasicFunnel',
  alias: '基本梯度图',
  img: getComPath('basic-funnel.svg'),
  type: 'funnel',
  used: true,
}
// 基本词云图
export const VBasicWordCloud = {
  name: 'VBasicWordCloud',
  alias: '基本词云图',
  img: getComPath('basic-wordcloud.svg'),
  type: 'wordcloud',
  used: true,
}
// 基本仪表盘
export const VBasicGauge = {
  name: 'VBasicGauge',
  alias: '基本仪表盘',
  img: getComPath('basic-gauge.svg'),
  type: 'gauge',
  used: true,
}
// 进度环
export const VProgressCircle = {
  name: 'VProgressCircle',
  alias: '进度环',
  img: getComPath('pie-one-value.svg'),
  type: 'circle',
  used: true,
}
// 信息-通用标题
export const VMainTitle = {
  name: 'VMainTitle',
  alias: '通用标题',
  img: getComPath('main-title.svg'),
  type: 'info',
  used: true,
}
// 信息-数字指标
export const VNumberTitleFlop = {
  name: 'VNumberTitleFlop',
  alias: '数字指标',
  img: getComPath('number-title-flop.svg'),
  type: 'info',
  used: true,
}
// 信息-时间器
export const VTimer = {
  name: 'VTimer',
  alias: '时间器',
  img: getComPath('timer.svg'),
  type: 'info',
  used: true,
}
// 下拉框组件
export const VSelect = {
  name: 'VSelect',
  alias: '下拉控件',
  img: getComPath('select.svg'),
  type: 'control',
  used: true,
}
// 媒体-背景块
export const VBgBox = {
  name: 'VBgBox',
  alias: '背景块',
  img: getComPath('bg-box.svg'),
  type: 'media',
  used: true,
}
// 媒体-边框
export const VBorderBox = {
  name: 'VBorderBox',
  alias: '边框',
  img: getComPath('border-box.svg'),
  type: 'media',
  used: true,
}
// 媒体-装饰器
export const VDecoration = {
  name: 'VDecoration',
  alias: '装饰器',
  img: getComPath('decoration.svg'),
  type: 'media',
  used: true,
}
// 媒体-图片
export const VMainImg = {
  name: 'VMainImg',
  alias: '单张图片',
  img: getComPath('img.svg'),
  type: 'media',
  used: true,
}
// 表格-基础滚动表格
export const VScrollTable = {
  name: 'VScrollTable',
  alias: '基础表格',
  img: getComPath('scroll-table.svg'),
  type: 'table',
  used: true,
}
// 表格-交叉表
export const VCrossTable = {
  name: 'VCrossTable',
  alias: '交叉表',
  img: getComPath('carousel-table.svg'),
  type: 'table',
  used: false,
}
/**
 * 组件列表
 * 上方的组件分配至组件列表中，回渲染值screen-editor中components-panel面板中进行渲染
 */
export const list = [
  {
    type: 'bar',
    name: '柱图',
    icon: 'barchart',
    data: [VBasicBar, VHorizontalBar, VCapsuleBar],
  },
  {
    type: 'line',
    name: '线图',
    icon: 'linechart',
    data: [VBasicLine, VBasicArea],
  },
  {
    type: 'pie',
    name: '饼图',
    icon: 'piechart',
    data: [VBasicPie, VBasicRing],
  },
  {
    type: 'radar',
    name: '雷达图',
    icon: 'radarchart',
    data: [VBasicRadar],
  },
  {
    type: 'scatter',
    name: '散点图',
    icon: 'pointmap',
    data: [VBasicScatter, VLineBasicScatter],
  },
  {
    type: 'map',
    name: '地图',
    icon: 'location',
    data: [VBasicMap, VBasicMapEvo],
  },
  {
    type: 'other',
    name: '其他图表',
    icon: 'ungroup',
    data: [VBasicBoxplot, VBasicFunnel, VBasicWordCloud, VBasicGauge, VProgressCircle],
  },
  {
    type: 'table',
    name: '表格',
    icon: 'table',
    data: [VScrollTable],
  },
  {
    type: 'info',
    name: '信息',
    icon: 'info-circle',
    data: [VMainTitle, VNumberTitleFlop, VTimer, VSelect],
  },
  {
    type: 'media',
    name: '媒体',
    icon: 'Youtube',
    data: [VBgBox, VBorderBox, VDecoration, VMainImg],
  },
]

/**
 * 根据组件名称获取组件信息
 * @param name
 */
export function findComByName(name) {
  for (let i = 0; i < list.length; i++) {
    const classification = list[i]
    for (let j = 0; j < classification.data.length; j++) {
      const category = classification.data[j]
      if (category.name === name) {
        return {
          classification,
          com: category,
        }
      }
    }
  }

  return null
}
