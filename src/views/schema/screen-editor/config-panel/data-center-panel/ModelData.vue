<template>
  <g-field label="选择模型">
    <ModelSelect
      v-model="apiDataConfig.config.modelId"
      v-model:name="apiDataConfig.config.modelName"
      size="small"
      @clear="handleClear"
      @select="handleSelect"
    />
  </g-field>

  <g-field
    label="配置"
    v-if="apiDataConfig.config.modelId && baseList.includes(apiDataConfig.compType)"
  >
    <b-button type="primary" style="width: 100%" @click="handleOpen" size="small">
      {{ apiDataConfig.compType === SCROLL_TABLE ? '配置字段列' : '配置轴线' }}
    </b-button>
  </g-field>

  <OtherEchartField
    v-if="apiDataConfig.config.modelId && otherEchart.includes(apiDataConfig.compType)"
    :is-word="apiDataConfig.compType === OTHER_ECHART"
    :is-select="apiDataConfig.compType === FORM_SELECT"
    :show-agg="apiDataConfig.compType === TRAPEZIUM_ECHART || apiDataConfig.compType === CAPSULE_BAR_ECHART"
    :is-circle="apiDataConfig.compType === CIRCLE || apiDataConfig.compType === INDICATOR"
    v-model:mapping="apiDataConfig.config.mappingFieldsModel"
    :dimension-fields="apiDataConfig.config.modelFields.dimension"
    :measure-fields="apiDataConfig.config.modelFields.measure"
  />

  <!-- 雷达图专有的配置 -->
  <RaderModel
    v-if="apiDataConfig.config.modelId && apiDataConfig.compType === RADAR_ECHART"
    v-model:dimensionModel="apiDataConfig.config.dimensionModel"
    v-model:axisFieldsModel="apiDataConfig.config.axisFieldsModel"
    :dimension-fields="apiDataConfig.config.modelFields.dimension"
    :measure-fields="apiDataConfig.config.modelFields.measure"
  />

  <FieldConfigTable
    v-model="openTableFieldConfig"
    v-model:axisFields="apiDataConfig.config.tableModelFields"
    :fields="apiDataConfig.config.modelFields.fields"
  />

  <source-drawer
    ref="sourceDrawerRef"
    :is-box="apiDataConfig.compType === BOXPLOT_ECHART"
    :enable-legend="componentConfig.componentType !== 'pie'"
  />

  <g-field label="测试">
    <b-button
      size="small"
      type="primary"
      transparent
      style="width: 100%"
      @click="handleFlush"
      :disabled="!apiDataConfig.config.modelId"
    >
      发送请求
    </b-button>
  </g-field>

</template>

<script setup>
import {computed, ref} from "vue"
import {getCubeById} from "@/api/modules/analysis-dashboard.api"
import {throwError} from "@/utils/util"
import {
  BASE_ECHART, RADAR_ECHART,
  BOXPLOT_ECHART, CAPSULE_BAR_ECHART,
  CIRCLE, DASHBOARD_ECHART,
  FORM_SELECT, INDICATOR,
  OTHER_ECHART, SCATTER_ECHART,
  SCATTER_ECHART_BASE,
  SCROLL_TABLE, TRAPEZIUM_ECHART
} from "@/config/data-source"
import {useStore} from "@/store"
import SourceDrawer from './source-drawer.vue'
import FieldConfigTable from '../components/FieldConfig.vue'

import ModelSelect from './ModelSelect.vue'
import RaderModel from '../components/RaderModel.vue'
import OtherEchartField from '../components/other-echart-field.vue'

const sourceDrawerRef = ref(null)
const openTableFieldConfig = ref(false)
const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)
const componentConfig = computed(() => selectedCom.value)
const otherEchart = [
  OTHER_ECHART,
  CIRCLE,
  INDICATOR,
  TRAPEZIUM_ECHART,
  DASHBOARD_ECHART,
  FORM_SELECT,
  CAPSULE_BAR_ECHART,
]

const apiDataConfig = computed(() => selectedCom.value.apiData)

const baseList = [BASE_ECHART, SCATTER_ECHART, SCATTER_ECHART_BASE, BOXPLOT_ECHART, SCROLL_TABLE]

function handleClear() {
  apiDataConfig.value.config.modelId = ''
  apiDataConfig.value.config.modelName = ''
  apiDataConfig.value.config.modelFields = {
    dimension: [],
    measure: [],
    fields: [],
  }
  clearConfig()
}

function handleOpen() {
  if (apiDataConfig.value.compType === SCROLL_TABLE){
    openTableFieldConfig.value = true
  } else {
    sourceDrawerRef.value?.open({ modelId: apiDataConfig.value.config.modelId, modelName: apiDataConfig.value.config.modelName })
  }
}

async function handleSelect(row) {
  try {
    apiDataConfig.value.config.modelId = row.id
    apiDataConfig.value.config.modelName = row.name
    const res = await getCubeById(row.id)
    apiDataConfig.value.config.modelFields = {
      dimension: res.dimension.children.map(item => ({
        name: item.fieldId,
        desc: item.title,
        dataType: item.dataType,
      })),
      measure: res.measure.children.map(item => ({
        name: item.fieldId,
        desc: item.title,
        dataType: item.dataType,
      })),
      fields: res.fields.map(item => ({
        name: item.fieldId,
        desc: item.title,
        dataType: item.dataType,
      })),
    }
    clearConfig()
  }catch (error) {
    throwError('refresh/refreshToken', error)
  }
}

function clearConfig() {
  apiDataConfig.value.config.dimensionModel = ''
  apiDataConfig.value.config.mappingFieldsModel = {}
  apiDataConfig.value.config.axisFieldsModel = {
    x: [],
    y: [],
  }
  apiDataConfig.value.config.drill = []
  apiDataConfig.value.config.x = []
  apiDataConfig.value.config.y = []
  apiDataConfig.value.config.legend = []
  apiDataConfig.value.config.tableModelFields = {
    header: [],
  }
}

function handleFlush() {
  apiDataConfig.value.flushFlag = !apiDataConfig.value.flushFlag
}
</script>

<style scoped>

</style>
