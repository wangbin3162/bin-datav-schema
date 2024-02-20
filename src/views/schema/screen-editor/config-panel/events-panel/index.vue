<template>
  <div class="events-panel">
    <div class="events-panel-content">
      <div class="scroll-container">
        <b-scrollbar>
          <div class="setting-panel-gui">
            <DefaultAction :events="events" />
            <TriggerConfig :events="events" />
            <ResponseConfig
              :events="events"
              :comp-id="selectedCom.id"
              :paramsDesc="paramsDesc"
              :exampleDesc="exampleDesc"
            />
          </div>
        </b-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import TriggerConfig from './trigger-config.vue'
import ResponseConfig from './response-config.vue'
import DefaultAction from './DefaultAction.vue'
import { useParamsDesc } from '@/components/Common/CustomScripts/customScriptsUtil'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom, comps } = storeToRefs(schemaStore)
const events = computed(() => selectedCom.value.events)
const { paramsDesc, exampleDesc } = useParamsDesc(comps.value, selectedCom.value)
</script>

<style scoped>
.events-panel {
  height: 100%;

  .events-panel-content {
    color: var(--s-text-color);
    height: calc(100% - 60px);
  }

  .scroll-container {
    height: calc(100% - 36px);
  }
}
</style>
