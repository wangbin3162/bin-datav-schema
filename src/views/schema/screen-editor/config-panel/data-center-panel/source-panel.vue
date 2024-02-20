<template>
  <div class="api-editor">
    <div style="padding: 0 10px">
      <g-field label="数据来源" style="padding-top: 8px">
        <b-radio-group v-model="apiDataConfig.type" type="button" size="small">
          <b-radio v-for="(val, key) in ApiTypeMap" :key="key" :label="key">{{ val }}</b-radio>
        </b-radio-group>
      </g-field>
      <g-field label="轮询间隔">
        <g-input-number
          v-model="apiDataConfig.config.pollingInterval"
          :min="1000"
          :step="1000"
          :disabled="apiDataConfig.config.polling"
          suffix="ms"
        />
      </g-field>
      <g-field label="启用轮询">
        <b-switch v-model="apiDataConfig.config.polling" size="small" />
      </g-field>
    </div>
    <!--静态编辑器-->
    <DataEditor
      v-if="apiDataConfig.type === ApiType.static"
      :model-value="apiDataConfig.config.data"
      :height="staticEditorHeight"
      @change="updateData"
    />

    <!--接口服务-->
    <div v-if="apiDataConfig.type === ApiType.service" style="padding: 0 10px">
      <b-divider style="margin: 0 0 16px"></b-divider>
      <ServiceData></ServiceData>
    </div>
    <!-- 分析模型 -->
    <div v-if="apiDataConfig.type === ApiType.model" style="padding: 0 10px">
      <b-divider style="margin: 0 0 16px"></b-divider>
      <ModelData></ModelData>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {createDataSources, ApiType, }from '@/config/data-source'
import { loadAsyncComponent } from '@/utils/async-component'
import { useStore } from '@/store'
import { on, off } from '@/utils/util'
import ServiceData from './ServiceData.vue'
import ModelData from './ModelData.vue'

const DataEditor = loadAsyncComponent(() => import('../components/data-editor.vue'))
defineOptions({
  name: 'SourcePanel',
})

const staticEditorHeight = ref('260px')

const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)
const apiDataConfig = computed(() => selectedCom.value.apiData)

const ApiTypeMap = createDataSources(apiDataConfig.value.compType)

const updateData = data => {
  apiDataConfig.value.config.data = data
  handleFlush()
}

const calcEdit = () => {
  staticEditorHeight.value = `${document.body.clientHeight - 260}px`
}

function handleFlush() {
  apiDataConfig.value.flushFlag = !apiDataConfig.value.flushFlag
}

onMounted(() => {
  calcEdit()
  on(window, 'resize', calcEdit)
})
onBeforeUnmount(() => {
  off(window, 'resize', calcEdit)
})
</script>

<style scoped></style>
