<template>
  <div class="setting-panel">
    <config-title com-alias="多选区域" />
    <div class="setting-panel-content">
      <div class="scroll-container">
        <b-scrollbar>
          <basic-setting :attr="attr" :readonly="isSelectAreaNoGroup"></basic-setting>
        </b-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'
import BasicSetting from '@/views/schema/screen-editor/config-panel/components/basic-setting.vue'
import { useStore } from '@/store'
import { computed } from 'vue'

const { schemaStore, storeToRefs } = useStore()
const { areaData } = storeToRefs(schemaStore)

const isSelectAreaNoGroup = computed(() => areaData.value.showArea)
const attr = computed(() => {
  return {
    x: areaData.value.x,
    y: areaData.value.y,
    w: areaData.value.width,
    h: areaData.value.height,
  }
})
</script>
