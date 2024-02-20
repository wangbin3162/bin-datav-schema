<template>
  <div class="dv-gui g-date-picker" :class="{ inline }">
    <b-date-picker
      v-model="inputValue"
      :type="type"
      placeholder="可选择默认值"
      :size="size"
      style="width: 100%"
      :disabled="disabled"
    ></b-date-picker>
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'GDatePicker',
})

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: Date,
    default: null,
  },
  type: {
    type: String,
    default: 'date',
  },
  label: {
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
  disabled: {
    type: Boolean,
    default: false,
  },
})

const inputValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
</script>

<style scoped>
.dv-gui.g-date-picker {
  line-height: 28px;
  .g-input__caption {
    line-height: 1;
  }
}
</style>
