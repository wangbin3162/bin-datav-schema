<template>
  <div class="dv-gui g-slider" :class="{ inline, 'show-input': showInput }">
    <b-slider v-model="inputValue" :min="min" :max="max" :step="step" :show-tooltip="false" />
    <span v-if="label" class="g-input__caption">{{ label }}</span>
    <div v-if="showInput" class="g-input__caption-input">
      <span class="g-input-number__number">
        <input
          v-model="inputValueCopy"
          type="number"
          @keyup.enter="inputValue = inputValueCopy"
          @blur="inputValue = inputValueCopy"
        />
      </span>
      <span v-if="suffix" class="g-input-number__suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'

defineOptions({
  name: 'GSlider',
})

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
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
  showInput: {
    type: Boolean,
    default: true,
  },
  suffix: String,
  disabled: Boolean,
})

const inputValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const inputValueCopy = ref(0)

const handleChange = (currentValue, oldValue) => {
  emit('change', currentValue, oldValue)
}

watch(
  () => props.modelValue,
  val => {
    inputValueCopy.value = val
  },
  { immediate: true },
)
</script>

<style scoped>
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
  :deep(.bin-slider-wrapper) {
    padding: 0 6px 0 0;
    .bin-slider__runway {
      margin: 13px 0;
    }
  }
  .g-input__caption-input {
    display: flex;
    align-items: center;
  }
  .g-input-number__number {
    line-height: 22px;
    > input {
      width: 60px;
      font-size: 12px;
      color: var(--s-text-color);
      background: var(--s-color-1);
      border: 1px solid var(--s-border-color-3);
      border-radius: var(--bin-border-radius-default);
      outline: 0;
      padding: 0 10px 0 10px;
      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
        display: none;
      }
    }
  }
  .g-input-number__suffix {
    font-size: 12px;
    color: var(--s-text-color-2);
    line-height: 22px;
    width: 20px;
    padding-left: 8px;
    text-align: left;
  }
}
</style>
