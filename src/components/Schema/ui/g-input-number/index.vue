<template>
  <div class="dv-gui g-input-number" :class="{ inline, 'has-suffix': !!suffix }">
    <b-input-number
      v-model="inputValue"
      :size="size"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      arrow-up-icon="plus"
      arrow-down-icon="minus"
      style="width: 100%"
      @change="handleChange"
    />
    <span v-if="suffix" class="g-input-number__suffix">{{ suffix }}</span>
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'g-input-number',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'small',
    },
    min: {
      type: Number,
      default: -Infinity,
    },
    max: {
      type: Number,
      default: Infinity,
    },
    step: {
      type: Number,
      default: 1,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    suffix: String,
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

<style scoped lang="stylus">
.g-input-number {
  width: 100%;
  &.has-suffix {
    position: relative;
    :deep(.bin-input-number) {
      .bin-input-number-input {
        padding-right: 42px;
      }
    }
  }

  .g-input-number__suffix {
    position: absolute;
    font-size: 12px;
    color: var(--schema-ui-color);
    top: 0;
    right: 26px;
    line-height: 26px;
    width: 20px;
    text-align: right;
  }
}
</style>
