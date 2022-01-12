/**
 * 所有组件列表
 */
import { getComPath } from '@/utils/env'

// 柱图-基本柱图
export const VBasicBar = {
  name: 'VBasicBar',
  alias: '基本柱图',
  img: getComPath('basic-bar.png'),
  type: 'bar',
  used: true,
}
// 柱图-基本条形图
export const VHorizontalBar = {
  name: 'VHorizontalBar',
  alias: '基本条形图',
  img: getComPath('hori-basic-bar.png'),
  type: 'bar',
  used: true,
}
// 线图-基本线图
export const VBasicLine = {
  name: 'VBasicLine',
  alias: '基本折线图',
  img: getComPath('basic-line.png'),
  type: 'line',
  used: true,
}
// 线图-区域图
export const VBasicArea = {
  name: 'VBasicArea',
  alias: '基本区域图',
  img: getComPath('basic-area.png'),
  type: 'line',
  used: true,
}
// 饼图-基本饼图
export const VBasicPie = {
  name: 'VBasicPie',
  alias: '基本饼图',
  img: getComPath('basic-pie.png'),
  type: 'pie',
  used: true,
}
// 地图-基本地图
export const VBasicMap = {
  name: 'VBasicMap',
  alias: '基本地图',
  img: getComPath('2d-china.png'),
  type: 'map',
  used: false,
}
// 信息-通用标题
export const VMainTitle = {
  name: 'VMainTitle',
  alias: '通用标题',
  img: getComPath('main-title.png'),
  type: 'info',
  used: true,
}
// 信息-数字指标
export const VNumberTitleFlop = {
  name: 'VNumberTitleFlop',
  alias: '数字指标',
  img: getComPath('number-title-flop.png'),
  type: 'info',
  used: true,
}
// 信息-时间器
export const VTimer = {
  name: 'VTimer',
  alias: '时间器',
  img: getComPath('timer.png'),
  type: 'info',
  used: true,
}
// 媒体-背景块
export const VBgBox = {
  name: 'VBgBox',
  alias: '背景块',
  img: getComPath('bg-box.png'),
  type: 'media',
  used: true,
}
// 媒体-边框
export const VBorderBox = {
  name: 'VBorderBox',
  alias: '边框',
  img: getComPath('border-box.png'),
  type: 'media',
  used: true,
}
// 媒体-装饰器
export const VDecoration = {
  name: 'VDecoration',
  alias: '装饰器',
  img: getComPath('decoration.png'),
  type: 'media',
  used: true,
}
// 媒体-图片
export const VMainImg = {
  name: 'VMainImg',
  alias: '单张图片',
  img: getComPath('img.png'),
  type: 'media',
  used: true,
}
// 表格-基础滚动表格
export const VScrollTable = {
  name: 'VScrollTable',
  alias: '基础表格',
  img: getComPath('carousel-table.png'),
  type: 'table',
  used: true,
}
// 表格-交叉表
export const VCrossTable = {
  name: 'VCrossTable',
  alias: '交叉表',
  img: getComPath('carousel-table.png'),
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
    data: [VBasicBar, VHorizontalBar],
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
    data: [VBasicPie],
  },
  // {
  //   type: 'map',
  //   name: '地图',
  //   icon: 'location',
  //   data: [VBasicMap],
  // },
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
    data: [VMainTitle, VNumberTitleFlop, VTimer],
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
