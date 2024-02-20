<template>
  <b-modal v-model="open" title="参数信息" width="800px" custom-class="schema-modal">
    <div style="margin: -16px; padding: 10px">
      <g-field-collapse label="请求参数信息" :defaultOpen="true">
        <div class="p10">
          <b-table :columns="reqCol" :data="reqParam" size="small">
            <template #isEmpty="{ row }">{{ row.isEmpty === 'Y' ? '是' : '否' }}</template>
          </b-table>
        </div>
      </g-field-collapse>
      <div class="p8"></div>
      <g-field-collapse label="响应参数信息" :defaultOpen="true">
        <b-table :columns="resCol" :data="resParam" size="small">
          <template #isEmpty="{ row }">{{ row.isEmpty === 'Y' ? '是' : '否' }}</template>
        </b-table>
      </g-field-collapse>
    </div>
  </b-modal>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  reqParam: {
    type: Array,
    default: () => [],
  },
  resParam: {
    type: Array,
    default: () => [],
  },
})
const open = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const reqCol = [
  {
    title: '参数标题',
    key: 'desc',
    align: 'center',
    tooltip: true,
    fixed: 'left',
    minWidth: 90,
  },
  {
    title: '参数名称',
    key: 'name',
    align: 'center',
    tooltip: true,
    minWidth: 90,
  },
  {
    title: '数据类型',
    key: 'typeName',
    align: 'center',
    tooltip: true,
    minWidth: 90,
  },
  {
    title: '参数必填',
    slot: 'isEmpty',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '默认值',
    key: 'default',
    align: 'center',
    tooltip: true,
    minWidth: 90,
  },
  {
    title: '字段长度',
    key: 'size',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '备注',
    key: 'bz',
    align: 'left',
    tooltip: true,
    minWidth: 90,
  },
]
const resCol = [
  {
    title: '参数标题',
    key: 'desc',
    align: 'center',
    tooltip: true,
    fixed: 'left',
    minWidth: 90,
  },
  {
    title: '参数名称',
    key: 'name',
    align: 'center',
    tooltip: true,
    minWidth: 90,
  },
  {
    title: '数据类型',
    key: 'typeName',
    align: 'center',
    tooltip: true,
    minWidth: 90,
  },
  {
    title: '参数必填',
    minWidth: 90,
    slot: 'isEmpty',
    align: 'center',
  },
  {
    title: '备注',
    minWidth: 90,
    key: 'bz',
    align: 'left',
    tooltip: true,
  },
]
</script>
