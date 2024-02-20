import { emitEventIfAllowed, generateEventParams } from '@/hooks/schema/useEventBus'

export function useEvent(data) {
  /**
   * 发送click事件，如果允许的话
   */
  function emitChange(name, id) {
    const params = generateEventParams(data.events.click.params)
    params.name = name
    params.id = id
    emitEventIfAllowed(data.id, 'click', data.events, params)
  }
  return {
    emitChange,
  }
}
