<template>
  <div class="dv-gui g-input" :class="[
    {
        'is-inline': !!inline,
        'is-single': inline === 'inline-single',
      }
  ]">
    <b-input
      :model-value="modelValue"
      :size="size"
      :placeholder="placeholder"
      :readonly="readonly"
      :type="type"
      :autosize="autosize"
      :rows="rows"
      @update:model-value="handleInput"
      @change="handleChange"
    />
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script>
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
      type: [Boolean, String],
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
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
  &.g-input {
    width: 100%;
    margin-bottom: 4px;
  }
  &.is-inline {
    display: inline-block;
    width: 50%;
    padding-right: 8px;
  }
  &.is-single {
    display: inline-block;
    width: 100%;
    padding-right: 8px;
  }
}
</style>
