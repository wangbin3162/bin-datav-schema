<template>
  <div :class="['api-editor', { '--disable-fold': !collapse, '--fold': collapse && visible }]">
    <div class="api-editor-title">
      <div class="api-desc">
        {{ apiConfig.description || '数据接口' }}
      </div>
      <div class="api-status success">
        <display-api-status :status="totalStatus" success-text="配置完成" />
      </div>
    </div>
    <div v-show="visible" class="attr-source-wp">
      <div class="data-attr-table-container">
        <table class="data-attr-table">
          <thead class="table-head">
          <tr class="table-head-row">
            <th class="th-item column-item attr-name">字段</th>
            <th class="th-item column-item attr-value">映射</th>
            <th class="th-item column-item attr-status">状态</th>
          </tr>
          </thead>
          <tbody class="table-body">
          <template v-if="Object.keys(apiConfig.fields).length > 0">
            <tr
              v-for="(fc, fn) in apiConfig.fields"
              :key="fn"
              class="table-body-row"
            >
              <td class="column-item attr-name">
                <b-tooltip :content="fc.description">
                  <span class="ellipsis2">{{ fn }}</span>
                </b-tooltip>
              </td>
              <td class="column-item attr-value">
                <g-input
                  :model-value="fc.map"
                  placeholder="可自定义"
                  class="attr-input"
                  size="mini"
                  @change="val => fc.map = val"
                  style="margin: 0;"
                />
              </td>
              <td class="column-item attr-status">
                <display-api-status :status="fieldsStatus[fn]" :optional="fc.optional" />
              </td>
            </tr>
          </template>
          <tr v-else class="table-body-row">
            <td class="column-item attr-name">
              <span>任意</span>
            </td>
            <td class="column-item attr-value"></td>
            <td class="column-item attr-status">
              <display-api-status status="completed" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="data-source">
        <div class="data-result-title">数据源配置</div>
        <div class="data-source-config">
          <g-field label="数据来源">
            <b-radio-group v-model="apiDataConfig.type" type="button" size="mini">
              <b-radio v-for="(val,key) in ApiTypeMap" :key="key" :label="key">{{ val }}</b-radio>
            </b-radio-group>
          </g-field>
          <!--静态编辑器-->
          <template v-if="apiDataConfig.type === ApiType.static">
            <data-editor :model-value="apiDataConfig.config.data" @change="updateData" />
          </template>
          <div v-if="apiDataConfig.type === ApiType.api" class="p16">
            <b-button type="primary" size="small" @click="openSourceDrawer">配置数据源</b-button>
          </div>
        </div>
      </div>
    </div>
    <source-drawer ref="sourceDrawerRef" />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import useApiStore from '@/hooks/schema/useApiStore'
import { ApiStatus, FieldStatus, createDataSources, ApiType } from '@/config/data-source'
import { loadAsyncComponent } from '@/utils/async-component'
import DisplayApiStatus from '@/views/schema/screen-editor/config-panel/components/display-api-status.vue'
import SourceDrawer from '@/views/schema/screen-editor/config-panel/data-center-panel/source-drawer.vue'

export default {
  name: 'source-panel',
  components: {
    SourceDrawer,
    DisplayApiStatus,
    DataEditor: loadAsyncComponent(() => import('../components/data-editor.vue')),
  },
  props: {
    apiName: {
      type: String,
      required: true,
    },
    activeName: String,
    collapse: Boolean,
  },
  setup(props) {
    const { selectedCom: com } = useSchemaStore()
    const { apiFieldStatusMap } = useApiStore()
    const sourceDrawerRef = ref(null)

    const visible = computed(() => props.apiName === props.activeName)
    const apiConfig = computed(() => com.value.apis[props.apiName])
    const apiDataConfig = computed(() => com.value.apiData[props.apiName])

    const fieldsStatus = computed(() => {
      const comFields = apiFieldStatusMap.value[com.value.id]
      return comFields ? comFields[props.apiName] : {}
    })
    const totalStatus = computed(() => {
      const list = Object.values(fieldsStatus.value)
      if (list.includes(FieldStatus.loading)) {
        return ApiStatus.loading
      }
      if (list.includes(FieldStatus.failed)) {
        return ApiStatus.incomplete
      }
      return ApiStatus.completed
    })

    const updateData = (data) => {
      apiDataConfig.value.config.data = data
    }

    const openSourceDrawer = () => {
      sourceDrawerRef.value?.open()
    }

    return {
      sourceDrawerRef,
      ApiType,
      ApiTypeMap: createDataSources(),
      visible,
      apiConfig,
      apiDataConfig,
      fieldsStatus,
      totalStatus,
      updateData,
      openSourceDrawer,
    }
  },
}
</script>

<style scoped lang="stylus">

</style>
