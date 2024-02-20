<template>
  <div class="setting-panel">
    <config-title show-cfg></config-title>
    <basic-setting
      :key="`${selectedCom.id}'_basic-setting`"
      :attr="selectedCom.attr"
    ></basic-setting>
    <component :is="selectedCom.name + 'Config'" :key="selectedCom.id" :data="selectedCom" />
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'
import BasicSetting from '@/views/schema/screen-editor/config-panel/components/basic-setting.vue'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)
</script>

<style scoped>
.setting-panel {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.divider) {
    margin: 8px 10px 0;
    height: 1px;
    background: var(--s-border-color);
  }
}
</style>
