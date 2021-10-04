<template>
  <header-trigger icon="search" tooltip="搜索/ctrl+f" @click="toggleSearch" />
  <search-panel />
</template>

<script>
import HeaderTrigger from '@/layouts/header-trigger/index.vue'
import SearchPanel from '@/layouts/search/search-panel.vue'
import useSetting from '@/hooks/store/useSetting'

export default {
  name: 'Search',
  components: { SearchPanel, HeaderTrigger },
  setup() {
    const { toggleSearch } = useSetting()

    return {
      toggleSearch,
    }
  },
}
</script>
