<template>
  <div class="dv-gui g-slider" :class="[
    {
        'is-inline': !!inline,
        'is-single': inline === 'inline-single',
        'has-suffix': !!suffix,
      }
  ]">
    <b-slider
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :show-input="showInput"
      :input-size="inputSize"
      :show-tooltip="false"
      :class="{ 'is-controls-right': controlsPosition === 'right' }"
      @update:model-value="handleInput"
    />
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
    <span v-if="suffix" class="g-input-number__suffix">
      {{ suffix }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GSlider',
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
    showInput: {
      type: Boolean,
      default: true,
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
      type: [Boolean, String],
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
  setup(props, ctx) {
    const handleInput = (value) => {
      ctx.emit('update:modelValue', value)
    }
    return {
      handleInput,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-slider {
    width: 100%;
    margin-bottom: 4px;
    &.has-suffix {
      position: relative;
      :deep(.bin-input-number) {
        .bin-input-number-input {
          padding-right: 42px;
        }
      }
    }
    :deep(.bin-slider ) {
      .bin-input-number {
        width: 95px;
      }
      .bin-slider__runway {
        width: 92px;
        margin: 12px 0;
      }
      .bin-input-number-handler-up-inner:before {
        content: "\e9a8";
      }
      .bin-input-number-handler-down-inner:before {
        content: "\e88c";
      }
    }
  }
  &.is-inline {
    display: inline-block;
    width: 50%;
    padding-right: 8px;
  }
  .g-input-number__suffix {
    position: absolute;
    font-size: 12px;
    color: var(--schema-ui-color);
    top: 0;
    right: 26px;
    line-height: 24px;
    width: 20px;
    text-align: right;
  }
}
</style>
