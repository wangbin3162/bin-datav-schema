<template>
  <div class="events-panel">
    <div class="events-panel-content">
      <template v-if="!isEmpty(events)">
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
      </template>
      <div v-else style="min-height: 300px" flex="main:center cross:center">
        <b-empty>该组件不需要配置事件</b-empty>
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
import { isEmpty } from '@/utils/util'

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
