import { useStore } from 'vuex'
import { computed, reactive } from 'vue'
import { on, off } from '@/utils/util'

const pos = reactive({
  x: 0,
  y: 0,
})

export default function useSchemaContextMenu(opts = {}) {
  const $store = useStore()

  const $schema = computed(() => $store.state.schema)

  const contextMenu = computed(() => $schema.value.contextMenuInfo)
  const selectedCom = computed(() => $schema.value.selectedCom)
  const isLocked = computed(() => selectedCom.value?.locked)
  const isHided = computed(() => selectedCom.value?.hided)

  const renamingId = computed(() => $schema.value.renamingId)

  const contextMenuStyle = computed(() => {
    return {
      display: contextMenu.value.show ? 'block' : 'none',
      left: `${pos.x + 10}px`,
      top: `${pos.y + 10}px`,
      transform: document.documentElement.clientHeight - pos.y < 250
        ? 'translate(0px, -100%)'
        : '',
    }
  })

  const showMenu = (e) => {
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
  const renamingCom = (id) => {
    $store.dispatch('schema/renamingCom', id)
  }
  return {
    contextMenu,
    showMenu,
    renamingId,
    renamingCom,
    selectedCom,
    isLocked,
    isHided,
    contextMenuStyle,
  }
}
