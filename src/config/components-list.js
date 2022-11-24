/**
 * 所有组件列表
 */
import { getComPath } from '@/utils/env'

// -------------------------柱图-------------------------//
// 柱图-柱图
const VBasicBar = {
  name: 'VBasicBar',
  alias: '柱图',
  img: getComPath('basic-bar.svg'),
}
// 柱图-条形图
const VHorizontalBar = {
  name: 'VHorizontalBar',
  alias: '条形图',
  img: getComPath('hori-basic-bar.svg'),
}
// 柱图-胶囊柱图
const VCapsuleBar = {
  name: 'VCapsuleBar',
  alias: '胶囊柱图',
  img: getComPath('capsule-bar.svg'),
}
// -------------------------线图-------------------------//
// 线图-线图
const VBasicLine = {
  name: 'VBasicLine',
  alias: '折线图',
  img: getComPath('basic-line.svg'),
}
// 线图-区域图
const VBasicArea = {
  name: 'VBasicArea',
  alias: '区域图',
  img: getComPath('basic-area.svg'),
}
// -------------------------饼图-------------------------//
// 饼图-饼图
const VBasicPie = {
  name: 'VBasicPie',
  alias: '饼图',
  img: getComPath('basic-pie.svg'),
}
// 饼图-环图
const VBasicRing = {
  name: 'VBasicRing',
  alias: '环图',
  img: getComPath('basic-ring.svg'),
}
// -------------------------雷达图-------------------------//
// 地图-雷达图
const VBasicRadar = {
  name: 'VBasicRadar',
  alias: '雷达图',
  img: getComPath('basic-radar.svg'),
}
// -------------------------地图-------------------------//
// 地图-地图
const VBasicMap = {
  name: 'VBasicMap',
  alias: '中国地图',
  img: getComPath('2d-china.svg'),
}
// 地图-省份地图
const VBasicMapEvo = {
  name: 'VBasicMapEvo',
  alias: '河北省地图',
  img: getComPath('basic-map-evo.svg'),
}

// -------------------------散点图-------------------------//
// 散点图
const VBasicScatter = {
  name: 'VBasicScatter',
  alias: '散点图',
  img: getComPath('basic-scatter.svg'),
}
// 散点图
const VLineBasicScatter = {
  name: 'VLineBasicScatter',
  alias: '散点线图',
  img: getComPath('line-basic-scatter.svg'),
}

// -------------------------其他-------------------------//
// 盒须图
const VBasicBoxplot = {
  name: 'VBasicBoxplot',
  alias: '盒须图',
  img: getComPath('basic-boxplot.svg'),
}
// 梯度图
const VBasicFunnel = {
  name: 'VBasicFunnel',
  alias: '梯度图',
  img: getComPath('basic-funnel.svg'),
}
// 词云图
const VBasicWordCloud = {
  name: 'VBasicWordCloud',
  alias: '词云图',
  img: getComPath('basic-wordcloud.svg'),
}
// 仪表盘
const VBasicGauge = {
  name: 'VBasicGauge',
  alias: '仪表盘',
  img: getComPath('basic-gauge.svg'),
}

// -------------------------指标-------------------------//
// 进度环
const VProgressCircle = {
  name: 'VProgressCircle',
  alias: '进度环',
  img: getComPath('pie-one-value.svg'),
}
// 信息-数字指标
const VNumberTitleFlop = {
  name: 'VNumberTitleFlop',
  alias: '数字指标',
  img: getComPath('number-title-flop.svg'),
}
// -------------------------控件-------------------------//
// 信息-时间器
const VTimer = {
  name: 'VTimer',
  alias: '时间器',
  img: getComPath('timer.svg'),
}
// 下拉框组件
const VSelect = {
  name: 'VSelect',
  alias: '下拉控件',
  img: getComPath('select.svg'),
}
// -------------------------基础-------------------------//
// 信息-通用标题
const VMainTitle = {
  name: 'VMainTitle',
  alias: '标题',
  img: getComPath('main-title.svg'),
}
// 媒体-背景块
const VBgBox = {
  name: 'VBgBox',
  alias: '背景块',
  img: getComPath('bg-box.svg'),
}
// 媒体-边框
const VBorderBox = {
  name: 'VBorderBox',
  alias: '边框',
  img: getComPath('border-box.svg'),
}
// 媒体-图片
const VMainImg = {
  name: 'VImage',
  alias: '单张图片',
  img: getComPath('img.svg'),
}
// -------------------------表格-------------------------//
// 表格-基础滚动表格
const VScrollTable = {
  name: 'VScrollTable',
  alias: '滚动表格',
  img: getComPath('scroll-table.svg'),
}

// 组件列表
export const componentList = [
  {
    type: 'basic',
    name: '基础',
    icon: 'block',
    group: [],
    comps: [VMainTitle, VBgBox, VMainImg, VBorderBox],
  },
  {
    type: 'analysis',
    name: '分析',
    icon: 'barchart',
    group: [
      {
        name: '指标',
        comps: [VNumberTitleFlop, VProgressCircle],
      },
      {
        name: '柱图',
        comps: [VBasicBar, VHorizontalBar, VCapsuleBar],
      },
      {
        name: '线图',
        comps: [VBasicLine, VBasicArea],
      },
      {
        name: '饼图',
        comps: [VBasicPie, VBasicRing],
      },
      {
        name: '散点图',
        comps: [VBasicScatter, VLineBasicScatter],
      },
      {
        name: '雷达图',
        comps: [VBasicRadar],
      },
      {
        name: '地图',
        comps: [VBasicMap, VBasicMapEvo],
      },
      {
        name: '其他图表',
        comps: [VBasicBoxplot, VBasicFunnel, VBasicWordCloud, VBasicGauge],
      },
    ],
    comps: [],
  },
  {
    type: 'control',
    name: '控件',
    icon: 'edit-square',
    group: [],
    comps: [VSelect, VTimer],
  },
  {
    type: 'table',
    name: '表格',
    icon: 'table',
    group: [],
    comps: [VScrollTable],
  },
  {
    type: 'images',
    name: '图片',
    icon: 'image',
    group: [],
    comps: [],
  },
  {
    type: 'comps',
    name: '组件',
    icon: 'CodeSandbox',
    group: [],
    comps: [],
  },
]

/**
 * 根据组件名称获取组件信息
 * @param name
 */
export function findComByName(name) {
  const comps = []
  componentList.forEach(item => {
    comps.push(...item.comps)
    item.group.forEach(i => {
      comps.push(...i.comps)
    })
  })
  return comps.find(i => i.name === name)
}
