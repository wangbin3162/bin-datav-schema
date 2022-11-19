<template>
  <div class="dv-gui g-select" :class="{ inline }">
    <b-select
      v-model="inputValue"
      :size="size"
      :disabled="disabled"
      clearable
      @change="handleChange"
    >
      <b-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
    </b-select>
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'g-select',
  props: {
    modelValue: {
      type: [String, Number],
      default: 0,
    },
    data: {
      type: Array,
      default: () => [],
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
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    })

    const handleChange = (currentValue, oldValue) => {
      emit('change', currentValue, oldValue)
    }

    return {
      inputValue,
      handleChange,
    }
  },
}
</script>
