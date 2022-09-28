<template>
  <g-field-collapse v-if="hasTriggerEvent" label="触发事件" default-open>
    <template v-for="key in eventList" :key="key">
      <g-field v-if="config[key]" :label="config[key].name">
        <div flex="main:justify cross:center">
          <b-checkbox v-model="config[key].enable" />
          <b-button type="text" title="查看事件参数" @click="handleViewParams(config[key].params)">
            查看
          </b-button>
        </div>
      </g-field>
    </template>

    <EventParamsModal v-model="openEventParamsModal" :params="curEventParams" />
  </g-field-collapse>
</template>

<script setup>
import { computed, ref } from 'vue'
import { baseEventsList } from '@/utils/events'
import { isEmpty } from '@/utils/util'
import EventParamsModal from './EventParamsModal.vue'

const props = defineProps({
  eventList: {
    type: Array,
    default: () => baseEventsList,
  },
  events: {
    type: Object,
    default: () => ({}),
  },
})

const config = computed(() => props.events)
// 判断是否有触发事件
const hasTriggerEvent = computed(() => {
  let flag = false
  props.eventList.forEach(key => {
    if (!isEmpty(config.value[key])) {
      flag = true
      return
    }
  })
  return flag
})

// 缓存当前事件参数
const curEventParams = ref([])
// 打开事件参数弹框
const openEventParamsModal = ref(false)
// 查看事件参数
function handleViewParams(params) {
  curEventParams.value = params
  openEventParamsModal.value = true
}
</script>
