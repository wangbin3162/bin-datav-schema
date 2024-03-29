import { deepMerge } from './util'

/**
 * 事件系统设计主要分为发送事件和监听事件，触发事件默认可以有三种类别
 * -----------------------------------------[触发事件类型]-----------------------------------------
 * init:{}      初始化事件
 * click:{}     点击事件，图表类型的为点击数据项事件
 * change:{}    改变事件，图表类型没有此类型的事件
 * -----------------------------------------[触发事件属性]-----------------------------------------
 * name:        触发事件名称，做显示使用，key值即为事件标识，这部分统一使用组件id来进行追加标识
 * params:      触发事件参数字段配置[]数组类型，里面存储 { desc: '参数描述', name: 'label', type: 'STRING' }
 * enable:      触发事件是否往外部抛出，用于判定哪些事件需要抛出的
 *
 * -----------------------------------------[监听事件属性]-----------------------------------------
 * onEvents:[]   数组类型，监听事件列表
 *
 * -----------------------------------------[动作事件属性]-----------------------------------------
 * actions: {},  动作列表，每个组件提供单独的动作，以供触发不同的动作
 */
export const defaultEvent = {
  init: {
    name: '初始化事件',
    enable: false,
  },
  click: {
    name: '点击事件',
    params: [],
    enable: false,
  },
  change: {
    name: '改变事件',
    params: [],
    enable: false,
  },
  onEvents: [],
  actions: {
    getData: { title: '更新数据', params: [] },
  },
}

export const baseEventsList = ['init', 'click', 'change']

// 获取基本的动作
export function getBaseActions(actions) {
  return deepMerge(
    {
      getData: { title: '更新数据', params: [] },
    },
    actions,
  )
}
