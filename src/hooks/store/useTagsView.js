import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { HOME_NAME, HOME_PATH } from '@/router/menus'

export default function useTagsView() {
  const $store = useStore()
  const $router = useRouter()
  const cachedViews = computed(() => $store.state.tagsView.cachedViews)
  const visitedViews = computed(() => $store.state.tagsView.visitedViews)
  const viewTags = computed(() => {
    const visitedTabs = visitedViews.value.map(i => ({ key: i.name, title: i.title }))
    return [{ key: HOME_PATH, title: HOME_NAME, noClose: true, icon: '' }, ...visitedTabs]
  })

  // 刷新当前view
  async function refreshCurrentPage() {
    await $store.dispatch('tagsView/refreshCurrentPage', $router)
  }

  return {
    cachedViews,
    visitedViews,
    viewTags,
    refreshCurrentPage,
  }
}
