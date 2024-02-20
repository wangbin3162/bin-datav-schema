<template>
  <g-field label="服务接口">
    <service-select
      v-model="apiDataConfig.config.serviceId"
      v-model:name="apiDataConfig.config.serviceName"
      v-model:compType="apiDataConfig.compType"
      size="small"
      @select="handleSelect"
    />
  </g-field>
  <g-field label="参数信息" v-if="apiDataConfig.config.serviceId">
    <b-button style="width: 100%" @click="openInfoModal = true" size="small">查看</b-button>
  </g-field>
  <g-field label="请求参数" v-if="apiDataConfig.config.reqParam.length > 0">
    <template v-for="(item, index) in apiDataConfig.config.reqParam" :key="index">
      <g-input
        v-model="item.default"
        :label="item.desc"
        placeholder="默认值"
        :style="
          apiDataConfig.config.reqParam.length % 2 === 1 &&
          index === apiDataConfig.config.reqParam.length - 1
            ? { width: '100%' }
            : { width: '48%' }
        "
      />
    </template>

  </g-field>
  <ParamInfo
    v-model="openInfoModal"
    :reqParam="apiDataConfig.config.reqParam"
    :resParam="apiDataConfig.config.resParam"
  />
  <!-- 雷达图专有的配置 -->
  <ConfigRader
    v-if="apiDataConfig.config.serviceId && apiDataConfig.compType === RADAR_ECHART"
  />

  <!-- 其他图表的转悠字段 -->
  <OtherEchartField
    v-if="apiDataConfig.config.serviceId && otherEchart.includes(apiDataConfig.compType)"
    :is-word="apiDataConfig.compType === OTHER_ECHART"
    :is-select="apiDataConfig.compType === FORM_SELECT"
    :is-circle="apiDataConfig.compType === CIRCLE || apiDataConfig.compType === INDICATOR"
    v-model:mapping="apiDataConfig.config.mappingFields"
    :dimension-fields="apiDataConfig.config.resParam"
    :measure-fields="apiDataConfig.config.resParam"
  />

  <g-field
    label="配置"
    v-if="apiDataConfig.config.serviceId && lineConfig.includes(apiDataConfig.compType)"
  >
    <b-button type="primary" style="width: 100%" @click="handleOpen" size="small">
      {{ apiDataConfig.compType === SCROLL_TABLE ? '配置字段列' : '配置轴线' }}
    </b-button>

    <ServiceFieldConfig
      v-model="openConfigModel"
      v-model:axisFields="apiDataConfig.config.axisFields"
      :fields="apiDataConfig.config.resParam"
    />

    <FieldConfigLeged
      v-model="openAxisFieldConfig"
      v-model:axisFields="apiDataConfig.config.boxFields"
      :is-box="apiDataConfig.compType === BOXPLOT_ECHART"
      :fields="apiDataConfig.config.resParam"
    />
    <FieldConfigTable
      v-model="openTableFieldConfig"
      v-model:axisFields="apiDataConfig.config.tableFields"
      :fields="apiDataConfig.config.resParam"
    />
  </g-field>

  <g-field label="测试">
    <b-button
      size="small"
      type="primary"
      transparent
      style="width: 100%"
      @click="handleFlush"
      :disabled="!apiDataConfig.config.serviceId"
    >
      发送请求
    </b-button>
  </g-field>
</template>

<script setup>
import { computed, ref } from 'vue'

import {useStore} from "@/store"
import {clearOnListActionAndTips} from "@/hooks/schema/useEventBus";
import {
  BASE_ECHART,
  RADAR_ECHART,
  BOXPLOT_ECHART, CAPSULE_BAR_ECHART, CIRCLE, DASHBOARD_ECHART, FORM_SELECT, INDICATOR,
  OTHER_ECHART,
  SCATTER_ECHART,
  SCATTER_ECHART_BASE,
  SCROLL_TABLE, TRAPEZIUM_ECHART
} from "@/config/data-source";
import ServiceSelect from '../components/service-select.vue'

import ParamInfo from '../components/param-info.vue'
import ServiceFieldConfig from '../components/service-field-config.vue'
import ConfigRader from '../components/configRader.vue'
import OtherEchartField from '../components/other-echart-field.vue'
import FieldConfigLeged from '../components/FieldConfigLeged.vue'
import FieldConfigTable from '../components/FieldConfig.vue'

const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)
const eventConfig = computed(() => selectedCom.value.events)
const apiDataConfig = computed(() => selectedCom.value.apiData)
const lineConfig = [BASE_ECHART, SCATTER_ECHART, SCATTER_ECHART_BASE, BOXPLOT_ECHART, SCROLL_TABLE]
const legendEchart = [SCATTER_ECHART, SCATTER_ECHART_BASE, BOXPLOT_ECHART]
const otherEchart = [
  OTHER_ECHART,
  CIRCLE,
  INDICATOR,
  TRAPEZIUM_ECHART,
  DASHBOARD_ECHART,
  FORM_SELECT,
  CAPSULE_BAR_ECHART,
]

const openInfoModal = ref(false)
const openConfigModel = ref(false)
const openAxisFieldConfig = ref(false)
const openTableFieldConfig = ref(false)

function handleSelect(row) {
  if (row) {
    if (apiDataConfig.value.interfaceUrl !== row.interfaceUrl && eventConfig.value.onEvents) {
      // 接口变动，清理已配置的拥有根据接口变动参数的action，并进行提示
      clearOnListActionAndTips(eventConfig.value.onEvents, 'getData')
    }
    apiDataConfig.value.config.serviceId = row.id
    apiDataConfig.value.interfaceUrl = row.interfaceUrl
    apiDataConfig.value.config.reqParam = row.reqParam
    apiDataConfig.value.config.resParam = row.resParam
    if (eventConfig.value.actions) {
      eventConfig.value.actions.getData.params = row.reqParam
    }
  } else {
    apiDataConfig.value.config.serviceId = ''
    apiDataConfig.value.interfaceUrl = ''
    apiDataConfig.value.config.reqParam = []
    apiDataConfig.value.config.resParam = []
    if (eventConfig.value.actions) {
      eventConfig.value.actions.getData.params = []
    }
    if (eventConfig.value.onEvents) {
      eventConfig.value.onEvents = []
    }
  }
  handleUpdate()
}


function handleOpen() {
  if (legendEchart.includes(apiDataConfig.value.compType)) {
    openAxisFieldConfig.value = true
  } else if (apiDataConfig.value.compType === SCROLL_TABLE) {
    openTableFieldConfig.value = true
  } else {
    openConfigModel.value = true
  }
}

// 重置配置字段
function handleUpdate() {
  apiDataConfig.value.config.axisFields.x = []
  apiDataConfig.value.config.axisFields.y = []
  apiDataConfig.value.config.dimension = ''
  apiDataConfig.value.config.boxFields.y = []
  apiDataConfig.value.config.boxFields.x = []
  apiDataConfig.value.config.boxFields.nAmE = []
  apiDataConfig.value.config.tableFields.header = []
  apiDataConfig.value.config.mappingFields = {}
}

function handleFlush() {
  apiDataConfig.value.flushFlag = !apiDataConfig.value.flushFlag
}
</script>

<style scoped>

</style>
