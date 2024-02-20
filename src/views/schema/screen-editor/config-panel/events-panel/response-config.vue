<template>
  <g-field-collapse v-if="hasRespEvent" label="响应事件" default-open>
    <template #add>
      <b-button type="text" title="新增一个响应事件" @click="handleAddOnEvent">
        <b-icon name="plus" size="16"></b-icon>
      </b-button>
    </template>

    <template v-for="(event, index) in config.onEvents" :key="index">
      <g-field label="事件" label-width="85px">
        <template #label>
          <div class="series-title">
            <span>事件{{ index + 1 }}</span>
          </div>
        </template>
        <g-select
          v-model="event.eventSource"
          :data="eventSourceListNoHasSelf"
          :disabled="event.register"
          label="事件源"
          style="width: 100%"
        />

        <template v-if="event.eventSource !== ''">
          <div flex="main:justify">
            <g-select
              v-model="event.eventName"
              :data="emitListAllFilter(event.eventSource)"
              :disabled="event.register"
              inline
              label="绑定事件"
              style="width: 49%"
            />
            <g-select
              v-model="event.actionName"
              :data="eventActions"
              :disabled="event.register"
              inline
              label="绑定动作"
              @change="handleActionNameChange(event.actionName, event)"
              style="width: 49%"
            />
          </div>
          <div style="width: 100%" flex="main:justify cross:center">
            <g-switch v-model="event.customScript.enable" label="是否执行脚本" />
            <g-button
              v-if="event.customScript.enable"
              icon="edit"
              title="编辑"
              label="脚本配置"
              :style="{ textAlign: 'right' }"
              @click="openEditor(index)"
            />
          </div>
        </template>
        <b-button
          v-if="!event.register"
          size="small"
          style="width: 100%; margin-bottom: 4px"
          @click="handleConfigParam(index)"
        >
          参数映射
        </b-button>
        <span style="width: 49%; margin-right: 2%; margin-top: 2px">
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
        <span style="width: 49%; margin-top: 2px">
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
    <b-drawer
      v-model="openParamsMap"
      title="参数映射"
      :width="550"
      :mask-closable="false"
      class-name="source-drawer"
      :styles="{ padding: 0 }"
      append-to-body
    >
      <params-map
        v-if="openParamsMap"
        :emitListAll="emitList"
        :onEvent="config.onEvents[curOnEventIndex]"
        @save="handleParamsMapSave"
      />
    </b-drawer>
    <CustomScriptsEditor
      ref="editorRef"
      v-model="customScriptStr"
      :title="label + '编辑器'"
      :funcExplain="funcExplain"
      :augments="config?.customScript?.augments"
      :paramsDesc="paramsDesc"
      :exampleDesc="exampleDesc"
      @success="handleSuccess"
    />
  </g-field-collapse>
</template>

<script setup>
import { deepCopy } from '@/utils/util'
import { computed, ref } from 'vue'
import { emitList, eventSourceList } from '@/hooks/schema/useEventBus'
import { Message } from 'bin-ui-design'
import ParamsMap from '../components/ParamsMap.vue'

const props = defineProps({
  compId: {
    type: String,
    default: '',
  },
  events: {
    type: Object,
    default: () => ({}),
  },
  // 标题显示标签
  label: {
    type: String,
    default: '自定义脚本',
  },
  // 函数说明
  funcExplain: {
    type: String,
    default: '通过提供的参数编写脚本，可以实现更灵活的组件配置。',
  },
  // 参数描述
  paramsDesc: {
    type: Array,
    default: () => [],
  },
  // 示例代码 {name,code} 的对象数组，name表示示例名称，code表示对应代码
  exampleDesc: {
    type: Array,
    default: () => [],
  },
})

const editorRef = ref(null)
const customScriptStr = ref('')

const config = computed(() => props.events)
// 判断是否有响应事件
const hasRespEvent = computed(() => Object.keys(config.value).includes('onEvents'))
// 当前需要处理的绑定事件描述对象的index
const curOnEventIndex = ref(null)
// 打开参数映射
const openParamsMap = ref(false)

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
    customScript: {
      enable: false,
      scriptStr: '', // 脚本
    },
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

// 参数映射组件save回调
function handleParamsMapSave(actionParams) {
  openParamsMap.value = false
  config.value.onEvents[curOnEventIndex.value].actionParams = actionParams
  curOnEventIndex.value = null
}

// 配置参数
function handleConfigParam(index) {
  const onEvent = config.value.onEvents[index]
  if (onEvent.eventName === '') {
    Message.warning('请绑定事件！')
    return
  }
  if (onEvent.actionName === '') {
    Message.warning('请绑定动作！')
    return
  }
  curOnEventIndex.value = index
  openParamsMap.value = true
}

// 切换绑定动作
function handleActionNameChange(actionName, onEvent) {
  // 填充动作参数
  const action = config.value.actions[actionName]
  if (action) {
    onEvent.actionParams = deepCopy(action.params)
  }
}

// 打开脚本编辑器
function openEditor(index) {
  const str = config.value.onEvents[index].customScript.scriptStr || ''
  editorRef.value && editorRef.value.open(str, index)
}

function handleSuccess(val, index) {
  config.value.onEvents[index].customScript.scriptStr = val
}
</script>
