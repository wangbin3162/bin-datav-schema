import mitt from 'mitt'

const emitter = mitt()

export const EventBus = emitter

// 事件名称
export const EventMap = {
  CompMove: 'move', // 组件移动
  CompUnMove: 'unmove', // 组件抬起移动
  HideArea: 'hide-area', // 隐藏框选区域
  SaveCompSuccess: 'save-comp-success', // 保存组件成功
}
