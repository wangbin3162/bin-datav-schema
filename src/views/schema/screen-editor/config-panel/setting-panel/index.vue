<template>
  <div class="setting-panel">
    <config-title :com-name="selectedCom.name" :com-alias="selectedCom.alias"></config-title>
    <div class="setting-panel-content">
      <div class="scroll-container">
        <b-scrollbar>
          <basic-setting :key="`${selectedCom.id}'_basic-setting`" :attr="selectedCom.attr"></basic-setting>
          <component
            :is="selectedCom.name + 'Config'"
            :key="selectedCom.id"
            :data="selectedCom"
          />
        </b-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'
import BasicSetting from '@/views/schema/screen-editor/config-panel/components/basic-setting.vue'

export default {
  name: 'setting-panel',
  components: { BasicSetting, ConfigTitle },
  setup() {
    const { selectedCom } = useSchemaStore()
    return {
      selectedCom,
    }
  },
}
</script>
