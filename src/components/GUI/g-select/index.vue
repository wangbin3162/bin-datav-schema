<template>
  <div class="dv-gui g-select" :class="{ inline }">
    <b-select
      v-model="inputValue"
      :size="size"
      :disabled="disabled"
      :clearable="clearable"
      @change="handleChange"
      append-to-body
    >
      <b-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
    </b-select>
    <span v-if="label" class="g-input__caption" :title="tooltip">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'GSelect',
})

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: 0,
  },
  data: {
    type: Object,
    default: () => {},
  },
  label: {
    type: String,
    default: '',
  },
  tooltip: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: 'small',
  },
  inline: {
    type: Boolean,
    default: false,
  },
  clearable: Boolean,
  disabled: Boolean,
})

const inputValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const handleChange = (currentValue, oldValue) => {
  emit('change', currentValue, oldValue)
}
</script>

<style scoped>
.dv-gui.g-select {
  width: 100%;
}
</style>
