<template>
  <div class="dv-gui g-input-number" :class="[
      {
        'is-inline': !!inline,
        'is-single': inline === 'inline-single',
        'has-suffix': !!suffix,
      }
  ]">
    <b-input-number
      :model-value="modelValue"
      :size="size"
      :min="min"
      :max="max"
      :step="step"
      arrow-up-icon="plus"
      arrow-down-icon="minus"
      @update:model-value="handleInput"
      style="width: 100%;"
      @change="handleChange"
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
      type: [Boolean, String],
      default: false,
    },
    suffix: String,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const handleInput = (value) => {
      ctx.emit('update:modelValue', value)
    }

    const handleChange = (currentValue, oldValue) => {
      ctx.emit('change', currentValue, oldValue)
    }

    return {
      handleInput,
      handleChange,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-input-number {
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
  &.is-inline {
    display: inline-block;
    width: 50%;
    padding-right: 8px;
    .g-input-number__suffix {
      right: 34px;
    }
  }
  &.is-single {
    display: inline-block;
    width: 100%;
    padding-right: 8px;
  }
}
</style>
