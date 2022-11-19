<template>
  <div class="dv-gui g-color-picker" :class="{ inline }">
    <div class="g-color-picker__inner">
      <b-input v-model="inputColor" :size="size" @input="debounceChange" />
      <b-color-picker
        v-model="inputColor"
        :size="size"
        :show-alpha="showAlpha"
        :colors="colors"
        popper-class="is-dark"
        @change="change"
      />
    </div>
    <span v-if="label" class="g-input__caption">{{ label }}</span>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { defaultColors, colorsOther } from '@/config/colors'
import { ColorHelper, debounce } from '@/utils/util'

export default {
  name: 'g-color-picker',
  props: {
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
      default() {
        return defaultColors.concat(colorsOther)
      },
    },
    showAlpha: {
      type: Boolean,
      default: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const inputColor = ref('')

    watch(
      () => props.modelValue,
      val => {
        inputColor.value = val
      },
      { immediate: true },
    )

    function emitValue(val) {
      inputColor.value = val
      emit('update:modelValue', val)
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
    return {
      inputColor,
      debounceChange,
      change,
    }
  },
}
</script>

<style scoped lang="stylus">
.g-color-picker {
  width: 100%;
  :deep(.bin-color-picker) {
    margin-left: -28px;
    display: inline-block;
    vertical-align: top;
    .bin-color-picker__trigger {
      padding: 4px;
    }
  }
}
</style>
