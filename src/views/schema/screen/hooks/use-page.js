import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'
import { Message } from 'bin-ui-next'
import useSchemaStore from '@/hooks/schema-store/useSchemaStore'

export default function useCubePage() {
  const route = useRoute()
  const { setPageInfo } = useSchemaStore()
  const dashboard = reactive({
    pageId: '',
    workspaceId: '',
    sourceId: '',
    sourceType: '',
    dashboardName: '未命名', // 面板名称
  })

  const getBaseInfo = () => {
    const { pageId, workspaceId, sourceId, sourceType } = route.query
    dashboard.pageId = pageId
    dashboard.workspaceId = workspaceId
    dashboard.sourceId = sourceId
    dashboard.sourceType = sourceType
    dashboard.dashboardName = dashboard.pageId === 'page-screen-0001' ? '仪表板（空）' : '仪表板'

    setPageInfo(dashboard)
  }

  watch(() => route.path, (path) => {
    if (path !== '/schema/screen') return
    const { workspaceId } = route.query
    if (workspaceId) {
      getBaseInfo()
    }
  }, { immediate: true })

  onMounted(() => {
    document.title = dashboard.dashboardName
  })

  return {
    dashboard,
  }
}
