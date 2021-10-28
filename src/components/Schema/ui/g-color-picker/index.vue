<template>
  <div
    class="dv-gui g-color-picker"
    :class="[
    {
      'is-inline': !!inline,
      'is-single': inline === 'inline-single',
    }
  ]"
  >
    <div class="g-color-picker__inner">
      <b-input
        :model-value="modelValue"
        :size="size"
        @update:model-value="handleInput"
      />
      <b-color-picker
        :model-value="modelValue"
        :size="size"
        :show-alpha="showAlpha"
        :colors="colors"
        popper-class="is-dark"
        @update:model-value="handleInput"
      />
    </div>
    <span v-if="label" class="g-input__caption">
      {{ label }}
    </span>
  </div>
</template>

<script>
import { defaultColors, colorsOther } from '@/config/colors'

export default {
  name: 'g-color-picker',
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
    colors: {
      type: Array,
      default() {
        return defaultColors.concat(colorsOther)
      },
    },
    showAlpha: {
      type: Boolean,
      default: true,
    },
    inline: {
      type: [Boolean, String],
      default: false,
    },
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
  &.g-color-picker {
    width: 100%;
    margin-bottom: 4px;
    :deep(.bin-color-picker ) {
      margin-left: -28px;
      display: inline-block;
      vertical-align: top;
      .bin-color-picker__trigger {
        padding: 5px;
      }
    }
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
