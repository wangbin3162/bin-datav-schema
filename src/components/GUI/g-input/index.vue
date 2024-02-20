<template>
  <div class="dv-gui g-input" :class="{ inline }">
    <b-input
      v-model="inputValue"
      :size="size"
      :placeholder="placeholder"
      :readonly="readonly"
      :type="type"
      :autosize="autosize"
      :rows="rows"
      :clearable="clearable"
      @change="handleChange"
    />
    <span v-if="label" class="g-input__caption" :title="tooltip">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'GInput',
})

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入',
  },
  size: {
    type: String,
    default: 'small',
  },
  tooltip: {
    type: String,
    default: '',
  },
  type: {
    type: String,
  },
  autosize: {
    type: Object,
  },
  rows: {
    type: Number,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
})

const inputValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const handleChange = (currentValue, oldValue) => {
  emit('change', currentValue, oldValue)
}
</script>
