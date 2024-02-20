<template>
  <div class="data-center-panel">
    <template v-if="apiData?.config?.data">
      <source-panel></source-panel>
    </template>
    <div v-else style="min-height: 300px" flex="main:center cross:center">
      <b-empty>该组件不需要配置数据</b-empty>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils/async-component'

const SourcePanel = loadAsyncComponent(() => import('./source-panel.vue'))
defineOptions({
  name: 'DataCenterPanel',
})

const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)
const apiData = computed(() => selectedCom.value.apiData)
</script>
