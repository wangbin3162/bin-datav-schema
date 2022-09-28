<template>
  <div
    class="dv-gui g-select"
    :class="[
      {
        'is-inline': !!inline,
        'is-single': inline === 'inline-single',
        'is-disabled': disabled,
      },
    ]"
  >
    <b-select
      :model-value="modelValue"
      :size="size"
      :disabled="disabled"
      clearable
      @update:model-value="handleInput"
      @change="handleChange"
    >
      <b-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
    </b-select>
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'GSelect',
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
  setup(props, ctx) {
    const handleInput = value => {
      ctx.emit('update:modelValue', value)
    }

    const handleChange = currentValue => {
      ctx.emit('change', currentValue)
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
  &.g-select {
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
