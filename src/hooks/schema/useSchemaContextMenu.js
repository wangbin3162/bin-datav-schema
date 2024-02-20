import { computed, reactive } from 'vue'
import { on, off } from '@/utils/util'
import { useStore } from '@/store'

const pos = reactive({
  x: 0,
  y: 0,
})

export default function useSchemaContextMenu(opts = {}) {
  const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
  const { contextMenu, selectedCom, selectedComIds } = storeToRefs(schemaStore)

  const isLocked = computed(() => selectedCom.value?.locked)
  const isHided = computed(() => selectedCom.value?.hided)

  const contextMenuStyle = computed(() => {
    return {
      left: `${pos.x + 10}px`,
      top: `${pos.y + 10}px`,
      transform: document.documentElement.clientHeight - pos.y < 370 ? 'translate(0px, -100%)' : '',
    }
  })

  const showMenu = async e => {
    e.preventDefault()

    if (selectedCom.value || selectedComIds.value.length > 1) {
      pos.x = e.clientX
      pos.y = e.clientY
      contextMenu.value.show = true

      // console.log('-show-menu-inside-', contextMenu.value.show)

      on(document, 'click', hideMenu)
    }
    // 右键没有单选或者框选时
    else {
      // console.log('-contentmenu-outside-', contextMenu.value.show)
      hideMenu()
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
