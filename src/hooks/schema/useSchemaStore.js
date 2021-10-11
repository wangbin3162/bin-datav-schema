import { useStore } from 'vuex'
import { computed } from 'vue'

export default function useSchemaStore() {
  const $store = useStore()
  const $schema = computed(() => $store.state.schema)
  const pageInfo = computed(() => $schema.value.pageInfo)
  const pageConfig = computed(() => $schema.value.pageConfig)
  const selectedCom = computed(() => $schema.value.selectedCom)

  // toggle图层面板
  async function toggleLayerPanel(visible) {
    await $store.dispatch('schema/toggleLayerPanel', visible)
  }

  // toggle组件面板
  async function toggleCompsPanel(visible) {
    await $store.dispatch('schema/toggleCompsPanel', visible)
  }

  // toggle配置面板
  async function toggleConfigPanel(visible) {
    await $store.dispatch('schema/toggleConfigPanel', visible)
  }

  // toggle配置面板
  async function toggleToolbox(visible) {
    await $store.dispatch('schema/toggleToolbox', visible)
  }

  async function setPageInfo(info) {
    await $store.dispatch('schema/setPageInfo', info)
  }

  return {
    pageInfo,
    pageConfig,
    selectedCom,
    setPageInfo,
    toggleLayerPanel,
    toggleCompsPanel,
    toggleConfigPanel,
    toggleToolbox,
  }
}
