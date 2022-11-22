import { emitEventIfAllowed, generateEventParams } from '@/hooks/schema/useEventBus'

export function useEvent(data) {
  /**
   * 发送change事件，如果允许的话
   */
  function emitChange(label, value) {
    const params = generateEventParams(data.events.change.params)
    params.value = value
    params.label = label

    emitEventIfAllowed(data.id, 'change', data.events, params)
  }
  return {
    emitChange,
  }
}
