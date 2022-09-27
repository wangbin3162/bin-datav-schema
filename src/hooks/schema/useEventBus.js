import mitt from 'mitt'
import { reactive, watch, computed, onUnmounted, nextTick } from 'vue'

/**
 * 事件总线
 */
const eventBus = mitt()

/**
 * 待触发的事件map，组件id作为key存入相关配置
 * 主要用于生成可绑定事件列表
 * 目前仅编辑模式时（mode = 'edit'）会使用
 */
const emitMap = reactive(new Map())

/**
 * 事件源列表
 */
const eventSourceList = computed(() => {
  // 组件id作为key，值的结构需要调整，需要添加组件名称，用于下拉框选择
  const res = []
  const map = [...emitMap]
  map.forEach(([key, value]) => {
    res.push({
      compId: key,
      compName: value.compName,
      events: value.events,
    })
  })
  return res
})

/**
 * 向待触发事件列表(map)添加一个待触发事件
 * @param {*} indexId 组件id
 * @param {*} events 组件启用的触发事件
 */
function addEmitEvent(indexId, events) {
  emitMap.set(indexId, events)
}

/**
 * 从待触发事件列表(map)删除一个对应组件的所属事件
 * @param {*} indexId 组件id
 */
function delEmitEvent(indexId) {
  emitMap.delete(indexId)
}

/**
 * 在事件总线上绑定事件
 * @param {*} eventName
 * @param {*} callback
 */
function bindEvent(eventName, callback) {
  eventBus.on(eventName, callback)
}

/**
 * 在事件总线上触发事件
 * @param {*} eventName
 * @param {*} params
 */
function emitEvent(eventName, params = undefined) {
  eventBus.emit(eventName, params)
}

/**
 * 删除事件总线上注册的处理器
 * @param {*} eventName
 * @param {*} handler
 */
function deleteEvent(eventName, handler = undefined) {
  eventBus.off(eventName, handler)
}

/**
 * 清理所有已注册的事件
 */
function clearEvent() {
  eventBus.all.clear()
}

/**
 *  每个组件中都需要添加的事件hook
 */
function useEventBus(data) {
  console.log('-----事件系统hook-----', data)
  onUnmounted(() => {
    delEmitEvent(data.id)
  })

  // 当配置项中事件配置事件项变化和别名 更改时触发监听，并注册事件
  watch(
    [() => data.events, () => data.alias],
    async ([events, alias]) => {
      // 很有趣，目前来看，watch内使用nextTick，比watch自身的flush选项设置为post执行的实际更靠后
      await nextTick()
      registerEvents(events, alias, data.id)
    },
    { immediate: true, deep: true },
  )
}

// 批量注册事件至缓存emitMap
function registerEvents(events, alias, id, list = ['init', 'click', 'change']) {
  if (!list || list.length === 0) return
  const eventList = []
  list.forEach(key => {
    const eventName = id + '-' + key
    const eventItem = events[key]
    if (eventItem) {
      const title = eventItem.name
      // 如果当前事件启用，则向事件总线待触发列表添加事件
      if (eventItem.enable) {
        eventList.push({
          title,
          eventName,
          params: eventItem.params,
        })
      }
    }
  })
  console.log(eventList)
  addEmitEvent(id, {
    compName: alias,
    events: eventList,
  })

  console.log(eventSourceList.value)
}

export { useEventBus }
