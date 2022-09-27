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
        <b-scrollbar>
          <div class="setting-panel-gui">
            <TriggerConfig :events="events" />
          </div>
        </b-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'
import TriggerConfig from './trigger-config.vue'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)

const events = computed(() => selectedCom.value.events)
</script>
