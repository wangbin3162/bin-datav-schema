import { emitEventIfAllowed, generateEventParams } from '@/hooks/schema/useEventBus'

export function useEvent(props) {
  /**
   * 发送默认事件
   * @param {*} date
   */
  function emitDefault(date) {
    const { name } = props.events.default
    const params  = generateEventParams(props.events.default.params)
    params.date = date
    emitEventIfAllowed(props.id, name, props.events.default, params)
  }
  /**
   * 发送日期变更事件，如果允许的话
   * @param {*} date
   */
  function emitDateChange(date) {
    const { name } = props.events.change
    const params  = generateEventParams(props.events.change.params)
    params.date = date
    emitEventIfAllowed(props.id, name, props.events.change, params)
  }
  return {
    emitDateChange,
    emitDefault
  }
}
