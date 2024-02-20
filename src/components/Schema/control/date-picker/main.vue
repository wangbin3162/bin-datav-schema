<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-date-picker
      v-model="date"
      :type="config.prop.type"
      :placeholder="config.prop.placeholder"
      :clearable="true"
      style="width: 100%"
      @change="handleChange"
    ></b-date-picker>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import dayjs from 'dayjs'
import { useEvent } from "@/components/Schema/control/date-picker/useEvent"

defineOptions({
  name: 'VDatePicker',
})
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
    required: true,
  }
})

// config 配置项
const config = computed(() => props.data.config)

const wrapperStyle = computed(() => {
  const { style } = config.value
  return {
    '--font-color': style.color,
    'font-size': `${style.fontSize}px`,
    'font-family': style.fontFamily,
    '--bg-color': style.background,
    '--bg-popper-color': style.bgPopperColor,
    '--border-color': style.borderColor,
    '--icon-color': style.iconColor,
    '--border-radius': `${style.borderRadius}px`,
    '--select-height': `${props.data.attr.h}px`,
  }
})

const date = ref(null)
// 事件系统触发
const { emitDateChange, emitDefault } = useEvent(props.data)

// 用于配置界面同步显示设置的默认值
watch(
  [() => config.value.prop.defaultValue, () => config.value.prop.defaultValueByCurrent],
  ([val, cur]) => {
    if (cur) {
      date.value = new Date()
    } else {
      date.value = val
    }
  },
  {
    immediate: true,
  },
)

emitDefault(handleData(date.value))

function handleData(val) {
  let res = val
  if (val) {
    const formatType = {
      year: 'YYYY',
      month: 'YYYY-MM',
      date: 'YYYY-MM-DD',
    }
    res = dayjs(val).format(formatType[config.value.type])
  }
  return res
}

// change回调
function handleChange(val) {
  const res = handleData(val)
  emitDateChange(res)
}
</script>
<style scoped>
.dv-wrapper {
  :deep(.bin-date-editor) {
    .bin-input {
      background-color: var(--bg-color);
      color: var(--font-color);
      font-size: var(--font-size);
      border-color: var(--border-color);
      border-radius: var(--border-radius);
      height: var(--select-height);
    }
    input::-webkit-input-placeholder{   /* 使用webkit内核的浏览器 */
      color: var(--font-color);
    }
    input:-moz-placeholder{    /* Firefox版本4-18 */
      color: var(--font-color);
    }
    input::-moz-placeholder{    /* Firefox版本19+ */
      color: var(--font-color);
    }
    input:-ms-input-placeholder{   /* IE浏览器 */
      color: var(--font-color);
    }
    .bin-input-prefix i ,.bin-input-suffix i {
      color: var(--icon-color);
    }
  }
}
</style>
