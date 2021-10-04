// 公共样式
export const commonStyle = {
  // rotate: 0,
  // opacity: 1,
}

export const commonAttr = {
  // animations: [],
  // events: {},
  // groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  // isLock: false, // 是否锁定组件
}

// 编辑器左侧组件列表
const list = [
  {
    component: 'v-cross-table',
    label: '交叉表',
    modelValue: '',
    type: 'cross-table',
    icon: 'background-position: 14px -877px',
    style: {},
  },
  {
    component: 'v-indicator-card',
    label: '指标看板',
    modelValue: '',
    type: 'indicator-card',
    icon: 'background-position: -64px -877px',
    style: {},
  },
  {
    component: 'v-line',
    label: '线图',
    modelValue: '',
    type: 'line',
    icon: 'background-position: -304px -1035px',
    style: {},
  },
  {
    component: 'v-bar',
    label: '柱图',
    modelValue: '',
    type: 'bar',
    icon: 'background-position: -144px -877px',
    style: {},
  },
  {
    component: 'v-pie',
    label: '饼图',
    modelValue: '',
    type: 'pie',
    icon: 'background-position: -544px -877px',
    style: {},
  },
  {
    component: 'v-bubble',
    label: '气泡图',
    modelValue: '',
    type: 'bubble',
    icon: 'background-position: -864px -877px',
    style: {},
  },
  {
    component: 'v-map',
    label: '地图',
    modelValue: '',
    type: 'map',
    icon: 'background-position: -624px -957px',
    style: {},
  },
]

// 图表分类
const chartsType = {
  common: ['cross-table', 'indicator-card', 'line', 'bar', 'pie', 'bubble', 'map'],
}

// 拼接通用的设置样式和属性
for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i]
  item.style = { ...commonStyle, ...item.style }
  list[i] = { ...commonAttr, ...item }
}

/**
 * 根据不同分组，获取列表
 * @param type
 */
export function getComponents(type) {
  if (!type) return []
  const filters = chartsType[type]
  if (!filters) return []
  const match = filters.map(i => `v-${i}`)
  return list.filter(v => match.includes(v.component))
}

export default list
