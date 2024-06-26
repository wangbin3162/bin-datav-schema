import { defineAsyncComponent } from 'vue'
import AsyncLoading from '@/components/GUI/g-loading/async-loading.vue'

export const loadAsyncComponent = loader =>
  defineAsyncComponent({
    loader,
    loadingComponent: AsyncLoading,
    delay: 20,
  })
