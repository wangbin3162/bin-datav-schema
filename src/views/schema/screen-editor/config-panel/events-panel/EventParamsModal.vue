<template>
  <b-modal v-model="open" title="参数信息" width="750px" append-to-body custom-class="schema-modal">
    <div style="margin: -16px; padding: 10px">
      <b-table :columns="columns" :data="params" size="small" border />
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
  params: {
    type: Array,
    default: () => [],
  },
})
const open = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const columns = [
  { title: '参数名', key: 'desc' },
  { title: '参数Key', key: 'name' },
  { title: '参数类型', key: 'type' },
]
</script>
