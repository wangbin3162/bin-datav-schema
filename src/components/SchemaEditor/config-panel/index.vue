<template>
  <div class="config-panel-wp" :class="{'is-hide':!pageConfig.configExpand}">
    <div class="config-panel">
      <page-config v-if="!selectedCom"></page-config>
      <options-config v-else></options-config>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema-store/useSchemaStore'
import PageConfig from '@/components/SchemaEditor/config-panel/page-config.vue'
import OptionsConfig from '@/components/SchemaEditor/config-panel/options-config.vue'

export default {
  name: 'config-panel',
  components: { OptionsConfig, PageConfig },
  setup() {
    const { pageConfig, selectedCom, toggleConfigPanel } = useSchemaStore()
    return {
      pageConfig,
      selectedCom,
      toggleConfigPanel,
    }
  },
}
</script>

