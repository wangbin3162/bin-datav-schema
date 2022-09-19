<template>
  <div class="data-editor">
    <a class="data-refresh" @click="handleChange">刷新数据</a>
    <b-ace-editor
      v-model="jsonData"
      theme="tomorrow_night"
      wrap
      :styles="{ border: 'none' }"
      :height="height"
    ></b-ace-editor>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'data-editor',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '260px',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const jsonData = ref('')

    const handleChange = () => {
      //  转换对象并更新数据
      try {
        const obj = JSON.parse(jsonData.value)
        const value = JSON.stringify(obj)
        ctx.emit('update:modelValue', value)
        ctx.emit('change', value)
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
    return {
      jsonData,
      handleChange,
    }
  },
}
</script>
