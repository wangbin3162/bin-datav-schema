<template>
  <div class="data-center-panel">
    <config-title :com-name="com.name" :com-alias="com.alias" />
    <div class="scroll-container">
      <b-scrollbar native>
        <source-panel
          v-for="dk in dataKeys"
          :key="dk"
          :api-name="dk"
          :active-name="dataKeys[0]"
          :collapse="dataKeys.length > 1"
        ></source-panel>
        <template v-if="dataKeys.length>0"></template>
        <div v-else style="min-height: 300px;" flex="main:center cross:center">
          <b-empty>该组件不需要配置数据</b-empty>
        </div>
      </b-scrollbar>
    </div>
  </div>
</template>

<script>
import ConfigTitle from '@/views/schema/screen-editor/config-panel/components/config-title.vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { computed } from 'vue'
import { loadAsyncComponent } from '@/utils/async-component'

export default {
  name: 'data-center-panel',
  components: {
    ConfigTitle,
    SourcePanel: loadAsyncComponent(() => import('./source-panel.vue')),
  },
  setup() {
    const { selectedCom: com } = useSchemaStore()
    const dataKeys = computed(() => Object.keys(com.value.apis))

    return {
      com,
      dataKeys,
    }
  },
}
</script>
