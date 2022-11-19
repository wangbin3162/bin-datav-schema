<template>
  <div class="dv-gui g-slider" :class="{ inline }">
    <b-slider
      v-model="inputValue"
      :min="min"
      :max="max"
      :step="step"
      :input-size="inputSize"
      :show-tooltip="false"
      :class="{ 'is-controls-right': controlsPosition === 'right' }"
    />
    <span v-if="label" class="g-input__caption">{{ label }}</span>
    <span v-if="suffix" class="g-input-number__suffix">{{ suffix }}</span>
    <span class="g-input-number__number">
      <input v-model="inputValue" type="number" />
    </span>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'g-slider',
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'small',
    },
    inputSize: {
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
    controlsPosition: {
      type: String,
      default: 'right',
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
.g-slider {
  position: relative;
  width: 100%;
  &.has-suffix {
    position: relative;
    :deep(.bin-input-number) {
      .bin-input-number-input {
        padding-right: 42px;
      }
    }
  }
  :deep(.bin-slider ) {
    .bin-slider__runway {
      width: 154px;
      margin: 12px 0;
    }
  }
  .g-input-number__number {
    position: absolute;
    top: 0;
    right: 0;
    line-height: 24px;
    > input {
      width: 50px;
      font-size: 12px;
      text-align: left;
      background: #262c33;
      border: 1px solid #0b0c0d;
      color: #bcc9d4;
      padding: 0 10px 0 4px;
    }
  }
  .g-input-number__suffix {
    position: absolute;
    font-size: 12px;
    color: var(--schema-ui-color);
    top: 0;
    right: 2px;
    line-height: 26px;
    width: 20px;
    text-align: right;
    z-index: 1;
  }
}
</style>
