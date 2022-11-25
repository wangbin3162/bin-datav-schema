import mitt from 'mitt'
import { ref, provide, inject, computed } from 'vue'

// 注入事件发送
export function useCollapse() {
  const collapseMitt = mitt()
  const activeGroupKey = ref('')

  function collapseClick(key) {
    if (activeGroupKey.value === key) activeGroupKey.value = ''
    else activeGroupKey.value = key
  }

  collapseMitt.on('item-click', collapseClick)

  provide('collapse', {
    activeGroupKey,
    collapseMitt,
  })
}

// 子元素注入事件发送
export function useCollapseItem(props) {
  const collapse = inject('collapse')
  const collapseMitt = collapse?.collapseMitt

  const isActive = computed(() => collapse?.activeGroupKey.value === props.name)

  function triggerClick(key) {
    collapseMitt?.emit('item-click', key)
  }

  return {
    isActive,
    triggerClick,
  }
}
