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
      clearable
      @change="handleChange"
    />
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'g-input',
  props: {
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
      default: '',
    },
    size: {
      type: String,
      default: 'small',
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
    readonly: {
      type: Boolean,
      default: false,
    },
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
