import { computed, reactive } from 'vue'
import { on, off } from '@/utils/util'
import { useStore } from '@/pinia'

const pos = reactive({
  x: 0,
  y: 0,
})

export default function useSchemaContextMenu(opts = {}) {
  const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
  const { contextMenu, selectedCom } = storeToRefs(schemaStore)

  const isLocked = computed(() => selectedCom.value?.locked)
  const isHided = computed(() => selectedCom.value?.hided)

  const contextMenuStyle = computed(() => {
    return {
      display: contextMenu.value.show ? 'block' : 'none',
      left: `${pos.x + 10}px`,
      top: `${pos.y + 10}px`,
      transform: document.documentElement.clientHeight - pos.y < 250 ? 'translate(0px, -100%)' : '',
    }
  })

  const showMenu = e => {
    e.preventDefault()
    if (selectedCom.value) {
      pos.x = e.clientX
      pos.y = e.clientY
      contextMenu.value.show = true

      on(document, 'click', hideMenu)
    }
  }
  const hideMenu = () => {
    off(document, 'click', hideMenu)
    if (opts && opts.beforeClose) {
      opts.beforeClose()
    }
    contextMenu.value.show = false
  }

  return {
    showMenu,
    isLocked,
    isHided,
    contextMenu,
    contextMenuStyle,
  }
}
