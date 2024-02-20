<template>
  <div class="top" style="width: 100%">
    <div flex>
      <b-input
        :size="size"
        :placeholder="placeholder"
        :model-value="name"
        readonly
        clearable
        @clear="handleClear"
      ></b-input>
      <b-button :size="size" background @click="handleOpen" style="margin-left: 2px">选择</b-button>
    </div>

    <ModelSelectModal v-model="openModelModal" @select="handleSelect" />
  </div>
</template>

<script setup>
import {ref} from "vue";
import ModelSelectModal from './ModelSelectModal.vue'

const emit = defineEmits(['update:modelValue', 'update:name', 'closeEdit', 'select', 'clear'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    // 存储显示名称
    type: String,
    default: '',
  },
  compType: {
    // 组件数据类型
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择模型',
  },
  size: String,
})

const openModelModal = ref(false)

function handleSelect(row) {
  emit('select', row)
}

function handleClear() {
  emit('clear')
}

function handleOpen() {
  openModelModal.value = true
}
</script>

<style scoped>

</style>
