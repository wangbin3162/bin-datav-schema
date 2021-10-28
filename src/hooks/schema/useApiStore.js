import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useApiStore() {
  const $store = useStore()
  const $schema = computed(() => $store.state.schema)
  // ApiModule
  const apiDataMap = computed(() => $schema.value.dataMap)
  const apiDataStatusMap = computed(() => $schema.value.dataStatusMap)
  const apiFieldStatusMap = computed(() => $schema.value.fieldStatusMap)
  return {
    apiDataMap,
    apiDataStatusMap,
    apiFieldStatusMap,
  }
}
