import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, watch } from 'vue'
import { Message } from 'bin-ui-next'

export default function useCubePage() {
  const router = useRouter()
  const route = useRoute()

  const dashboard = reactive({
    pageId: '',
    workspaceId: '',
    sourceId: '',
    sourceType: '',
    dashboardName: '未命名', // 面板名称
  })

  // 返回
  const handleBack = (backUrl) => {
    router.push(backUrl || '/')
  }

  // 保存
  const handleSave = () => {
    Message.success('保存成功')
  }

  const getBaseInfo = () => {
    const { pageId, workspaceId, sourceId, sourceType } = route.query
    dashboard.pageId = pageId
    dashboard.workspaceId = workspaceId
    dashboard.sourceId = sourceId
    dashboard.sourceType = sourceType
    dashboard.dashboardName = dashboard.pageId === 'page-screen-0001' ? '仪表板（空）' : '仪表板'
  }

  watch(() => route.path, (path) => {
    if (path !== '/schema/screen') return
    const { workspaceId } = route.query
    if (workspaceId) {
      getBaseInfo()
    } else {
      Message.error({
        message: '没有请求参数，即将关闭此页面！',
        onClose: window.close,
      })
    }
  }, { immediate: true })

  onMounted(() => {
    document.title = dashboard.dashboardName
  })

  return {
    dashboard,
    handleSave,
    handleBack,
  }
}
