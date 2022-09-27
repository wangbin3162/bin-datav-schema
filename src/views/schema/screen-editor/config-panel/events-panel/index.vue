<template>
  <div class="events-panel">
    <config-title
      :com-name="selectedCom.name"
      :com-alias="selectedCom.alias"
      :com="selectedCom"
    ></config-title>
    <div class="events-panel-content">
      <div class="data-result-title">事件配置</div>
      <div class="scroll-container">
        <b-scrollbar>事件配置项</b-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)
</script>
