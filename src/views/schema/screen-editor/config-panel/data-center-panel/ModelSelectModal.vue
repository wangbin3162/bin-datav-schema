<template>
  <b-modal
    v-model="open"
    title="选择模型"
    width="1000px"
    :mask-closable="false"
    @open="handleOpen"
    @closed="handleClosed"
    draggable
  >
    <div style="margin: -16px; padding: 8px">
      <SelectModel v-if="open" @select="handleSelect" @open="handleView"/>
<!--      <ModelDetail v-if="showDetail" :data="curData" @close="handleClose" />-->
    </div>
  </b-modal>
</template>

<script setup>
import { computed, ref } from 'vue'
import SelectModel from './SelectModel.vue'
// import ModelDetail from './ModelDetail.vue'

const emit = defineEmits(['update:modelValue', 'select'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const open = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
const showDetail = ref(false)
const curData = ref({})

function handleOpen() {
  showDetail.value = false
}

function handleClosed() {}

function handleView(row) {
  curData.value = row
  showDetail.value = true
}

// 详情组件close事件
function handleClose() {
  showDetail.value = false
}

function handleSelect(row) {
  emit('select', row)
  open.value = false
}
</script>
