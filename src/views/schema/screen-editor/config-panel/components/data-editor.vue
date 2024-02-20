<template>
  <div class="data-editor">
    <span class="data-refresh" @click="handleChange">刷新数据</span>
    <b-ace-editor
      v-model="jsonData"
      theme="tomorrow_night"
      wrap
      :styles="{ border: 'none' }"
      :height="height"
    ></b-ace-editor>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

defineOptions({
  name: 'DataEditor',
})
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '260px',
  },
})

const jsonData = ref('')

const handleChange = () => {
  //  转换对象并更新数据
  try {
    const obj = JSON.parse(jsonData.value)
    const value = JSON.stringify(obj)
    emit('update:modelValue', value)
    emit('change', value)
  } catch (e) {
    // console.log(e)
  }
}

watch(
  () => props.modelValue,
  val => {
    // 转换为对象
    try {
      const obj = JSON.parse(val)
      jsonData.value = JSON.stringify(obj, null, 2)
    } catch (e) {
      // console.log(e)
    }
  },
  { immediate: true, deep: true },
)
</script>

<style>
.data-refresh {
  cursor: pointer;
}
</style>
