import { useStore } from 'vuex'
import { computed } from 'vue'

export default function useSchemaStore() {
  const store = useStore()
  const status = store.state.schema

  // page
  const pageConfig = computed(() => status.pageConfig)
  const canvasRange = computed(() => status.canvasRange)
  const optionsExpand = computed(() => status.optionsExpand)
  // canvas
  const canvasData = computed(() => status.canvasData)
  const curComponent = computed(() => status.curComponent)
  const curComponentIndex = computed(() => status.curComponentIndex)
  // contextmenu
  const contextMenuInfo = computed(() => status.contextMenuInfo)

  // custom computed

  return {
    pageConfig,
    canvasData,
    curComponent,
    curComponentIndex,
  }
}
