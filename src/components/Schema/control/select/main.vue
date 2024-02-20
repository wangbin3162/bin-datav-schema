<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-select v-model="select" clearable @change="handleChange">
      <b-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></b-option>
    </b-select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { useEventBus } from '@/hooks/schema/useEventBus'
import { useEvent } from './useEvent'

defineOptions({
  name: 'VSelect',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { dvData } = useDataCenter(props.data)
// config 配置项
const config = computed(() => props.data.config)

const select = ref(config.value.default)

const options = computed(() => dvData.value ?? config.value.options)

const wrapperStyle = computed(() => {
  const { background, bgPopperColor, color, fontSize, borderColor, arrowColor, borderRadius } =
    config.value

  return {
    '--font-color': color,
    '--font-size': `${fontSize}px`,
    '--bg-color': background,
    '--bg-popper-color': bgPopperColor,
    '--border-color': borderColor,
    '--arrow-color': arrowColor,
    '--border-radius': `${borderRadius}px`,
    '--select-height': `${props.data.attr.h}px`,
  }
})

watch(
  () => config.value.default,
  val => (select.value = val),
)

// 事件系统增加
useEventBus(props.data)
// 事件系统触发
const { emitChange } = useEvent(props.data)

// 下拉框change事件
function handleChange(value) {
  const label = options.value.find(item => item.value === value)?.label
  emitChange(label, value)
}
</script>

<style scoped>
.dv-wrapper {
  :deep(.bin-select) {
    .bin-input-wrapper .bin-input-with-suffix{
      border-radius: var(--border-radius);
    }
    .bin-input {
      background-color: var(--bg-color);
      color: var(--font-color);
      font-size: var(--font-size);
      border-color: var(--border-color);
      border-radius: var(--border-radius);
      height: var(--select-height);
    }
    .bin-select__caret.b-iconfont.b-icon-down {
      color: var(--arrow-color);
    }
    .bin-select__caret.b-iconfont.is-show-close {
      color: var(--arrow-color);
      background: transparent;
    }
  }
}
</style>
