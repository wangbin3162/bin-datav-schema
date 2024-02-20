<template>
  <div class="dv-gui g-switch" :class="{ inline }">
    <b-switch v-model="inputValue" :size="size" :disabled="disabled" />
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'GSwitch',
})

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
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
.dv-gui.g-switch {
  line-height: 28px;
  .g-input__caption {
    line-height: 1;
  }
}
</style>
