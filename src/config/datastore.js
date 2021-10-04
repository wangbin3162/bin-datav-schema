import storage from 'good-storage'
import setting from './setting.cfg'
// 本地缓存库

// app系统设置内容
const KEY = '__bin_datav_schema_setting__'

export function getAdminSetting() {
  return storage.get(KEY, setting)
}

export function setAdminSetting(setting) {
  return storage.set(KEY, setting)
}

// 代办事项设置
const TODO_KEY = '__bin_datav_schema_todo__'

export function getTodoList() {
  return storage.get(TODO_KEY, [
    { done: false, text: '未完成任务事项' },
    { done: false, text: '实现代码更新' },
    { done: false, text: '更新组件库' },
    { done: true, text: '代办事项文字说明' },
    { done: false, text: '编写统一的说明文档' }
  ])
}

export function setTodoList(list) {
  return storage.set(TODO_KEY, list)
}

// 快捷链接操作
const LINK_KEY = '__bin_datav_schema_links__'

export function getLinks() {
  return storage.get(LINK_KEY, [
      { link: 'https://wangbin3162.gitee.io/bin-ui-next', text: 'bin-ui-next', newTab: true },
      { link: 'https://wangbin3162.gitee.io/bin-editor-next', text: 'bin-editor-next', newTab: true },
      { link: 'https://wangbin3162.gitee.io/bin-charts-next', text: 'bin-charts-next', newTab: true },
      { link: 'https://wangbin3162.gitee.io/bin-tree-org', text: 'bin-tree-org', newTab: true },
      { link: 'https://wangbin3162.gitee.io/bin-animation', text: 'bin-animation', newTab: true }
    ]
  )
}

export function setLinks(list) {
  return storage.set(LINK_KEY, list)
}
