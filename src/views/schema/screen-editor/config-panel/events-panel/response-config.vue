<template>
  <g-field-collapse v-if="hasRespEvent" label="响应事件" default-open>
    <template #add>
      <b-button type="text" title="新增一个响应事件" @click="handleAddOnEvent">
        <b-icon name="plus" size="16"></b-icon>
      </b-button>
    </template>

    <template v-for="(event, index) in config.onEvents" :key="index">
      <g-field label="事件" label-width="85px" flat>
        <template #label>
          <div class="series-title" style="top: -8px">
            <span>事件{{ index + 1 }}</span>
          </div>
        </template>
        <g-select
          v-model="event.eventSource"
          :data="eventSourceListNoHasSelf"
          :disabled="event.register"
          inline="inline-single"
          label="事件源"
        />

        <template v-if="event.eventSource !== ''">
          <g-select
            v-model="event.eventName"
            :data="emitListAllFilter(event.eventSource)"
            :disabled="event.register"
            inline
            label="绑定事件"
          />
          <g-select
            v-model="event.actionName"
            :data="eventActions"
            :disabled="event.register"
            inline
            label="绑定动作"
            @change="handleActionNameChange(event.actionName, event)"
          />
        </template>
        <span style="width: 50%; padding-right: 8px">
          <b-button
            size="small"
            style="width: 100%"
            type="primary"
            :disabled="event.register"
            @click="handleRegOnEvent(event)"
          >
            注册事件
          </b-button>
        </span>
        <span style="width: 50%; padding-right: 8px">
          <b-button
            size="small"
            style="width: 100%"
            @click="handleDelOrCancelOnEvent(index, event)"
          >
            {{ event.register ? '取消' : '删除' }}
          </b-button>
        </span>
      </g-field>
    </template>

    <div
      v-if="config.onEvents.length === 0"
      style="min-height: 80px"
      flex="main:center cross:center"
    >
      暂无响应事件
    </div>
    <b-ace-editor
      :model-value="JSON.stringify(config, null, 2)"
      theme="tomorrow_night"
      wrap
      :styles="{ border: 'none' }"
    ></b-ace-editor>
  </g-field-collapse>
</template>

<script setup>
import { deepCopy, isEmpty } from '@/utils/util'
import { computed, ref } from 'vue'
import { emitList, eventSourceList } from '@/hooks/schema/useEventBus'
import { Message } from 'bin-ui-next'

const props = defineProps({
  compId: {
    type: String,
    default: '',
  },
  events: {
    type: Object,
    default: () => ({}),
  },
})

const config = computed(() => props.events)
// 判断是否有响应事件
const hasRespEvent = computed(() => Object.keys(config.value).includes('onEvents'))

// 可选的事件源（不包含自身）
const eventSourceListNoHasSelf = computed(() =>
  eventSourceList.value
    .filter(item => item.compId !== props.compId)
    .map(item => ({ value: item.compId, label: item.compName })),
)

const eventActions = computed(() => {
  const actions = config.value.actions
  return Object.keys(actions).map(key => ({ value: key, label: actions[key].title }))
})

// 用于只显示对应组件的可选事件列表
function emitListAllFilter(eventSource) {
  return emitList.value
    .filter(item => item.eventName.includes(eventSource))
    .map(item => ({ value: item.eventName, label: item.title }))
}

// 添加按钮，添加一个用于描述绑定事件的对象
function handleAddOnEvent() {
  config.value.onEvents.push({
    eventSource: '', // 选择的事件源(组件indexId)
    eventName: '', // 选择的事件名(组成规则：indexId-eventName)
    actionName: '', // 选择的动作名称
    actionParams: [], // 动作参数
    register: false, // 是否注册事件
  })
}
// 注册按钮回调
function handleRegOnEvent(event) {
  if (event.eventSource === '') {
    Message.warning('请选择事件源！')
    return
  }
  if (event.eventName === '') {
    Message.warning('请绑定事件！')
    return
  }
  if (event.actionName === '') {
    Message.warning('请绑定动作！')
    return
  }
  event.register = true
}
// 删除/取消按钮
function handleDelOrCancelOnEvent(index, item) {
  if (item.register) {
    item.register = false
  } else {
    config.value.onEvents.splice(index, 1)
  }
}

// 切换绑定动作
function handleActionNameChange(actionName, onEvent) {
  // 填充动作参数
  const action = config.value.actions[actionName]
  if (action) {
    onEvent.actionParams = deepCopy(action.params)
  }
}
</script>
