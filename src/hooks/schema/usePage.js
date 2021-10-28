import { useRoute } from 'vue-router'
import { nextTick, watch, ref } from 'vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { loadScreen } from '@/api/database.api'

export default function useCubePage() {
  const route = useRoute()
  const { loadScreenData } = useSchemaStore()
  const loading = ref(false)

  const getBaseInfo = async (id) => {
    try {
      loading.value = true
      const res = await loadScreen(id)
      if (res.data) {
        await loadScreenData(res.data)
        await nextTick()
        document.title = res.data.pageInfo.name
      }
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }

  watch(() => route.path, async () => {
    const { id } = route.query
    if (id) {
      await getBaseInfo(id)
    }
  }, { immediate: true })

  return {
    loading,
  }
}
