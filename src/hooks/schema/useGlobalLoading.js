import { useStore } from '@/store'

// 全局loading设置
export function setGlobalLoading(loading) {
  const { schemaStore } = useStore() // 执行获取schema专属store
  if (loading) {
    schemaStore.setGlobalLoading(loading)
  } else {
    setTimeout(() => schemaStore.setGlobalLoading(loading), 300)
  }
}
