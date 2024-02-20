<template>
  <div class="dv-gui g-color-picker" :class="{ inline }">
    <div class="g-color-picker__inner">
      <b-input v-model="inputColor" :size="size" @input="debounceChange" />
      <b-color-picker
        v-model="inputColor"
        :size="size"
        :show-alpha="showAlpha"
        :colors="colors"
        :show-label="false"
        popper-class="is-dark"
        color-format="hex"
        @change="change"
      />
    </div>
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ColorHelper, debounce } from '@/utils/util'

import { pickerColors } from '@/theme'

defineOptions({
  name: 'GColorPicker',
})

const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  modelValue: {
    type: String,
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
    default: () => [...pickerColors],
  },
  showAlpha: {
    type: Boolean,
    default: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
})

const inputColor = ref('')

watch(
  () => props.modelValue,
  val => {
    inputColor.value = val
  },
  { immediate: true },
)

function emitValue(val) {
  inputColor.value = val ? val : null
  emit('update:modelValue', inputColor.value)
}

function change(color) {
  if (color) {
    try {
      const colorObj = ColorHelper.toObject(color)
      let formatColor = color
      if (!colorObj.alpha || colorObj.alpha === 1) {
        // 说明当前的值是没有透明度的，此时需要转换成普通模式的颜色值
        formatColor = ColorHelper.toHex(color)
      }
      emitValue(formatColor)
    } catch (error) {
      // console.log('current is not right color')
    }
  } else {
    emitValue('')
  }
}

const debounceChange = debounce(change, 200)
</script>

<style scoped>
.g-color-picker {
  width: 100%;
  .g-color-picker__inner {
    position: relative;
  }
  :deep(.bin-input) {
    padding-right: 30px;
  }
  :deep(.bin-color-picker) {
    position: absolute;
    right: 0;
    border: 0;
    background-color: transparent;
    .bin-color-picker__trigger {
      padding: 2px;
    }
  }
}
</style>
