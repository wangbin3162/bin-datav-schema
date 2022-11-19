<template>
  <div class="dv-gui g-select">
    <b-select v-model="inputValue" :size="size" :disabled="disabled" @change="handleChange">
      <b-option-group v-for="item in data" :key="item.group" :label="item.group">
        <b-option
          v-for="item in item.data"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span>{{ item.label }}</span>
          <span style="float: right; color: #666">{{ item.value }}</span>
        </b-option>
      </b-option-group>
    </b-select>

    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'g-group-select',
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
      type: [Boolean, String],
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

    const handleChange = currentValue => {
      emit('change', currentValue)
    }

    return {
      inputValue,
      handleChange,
    }
  },
}
</script>
