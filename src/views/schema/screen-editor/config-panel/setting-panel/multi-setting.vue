<template>
  <div class="setting-panel">
    <config-title com-alias="多选区域"><span></span></config-title>
    <div class="setting-panel-content">
      <div class="scroll-container">
        <b-scrollbar>
          <!-- <basic-setting :key="`${selectedCom.id}'_basic-setting`" :attr="selectedCom.attr"></basic-setting> -->
        </b-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup>
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'
import BasicSetting from '@/views/schema/screen-editor/config-panel/components/basic-setting.vue'
</script>
