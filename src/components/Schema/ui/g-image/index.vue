<template>
  <div class="dv-gui g-select-image-wrap">
    <div class="g-img">
      <img v-if="imgUrl" :src="imgUrl" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'GImage',
  props: {
    modelValue: {
      // 存储的就是src图片名称
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const visible = ref(false)
    const imgUrl = computed({
      get: () => props.modelValue,
      set: val => emit('update:modelValue', val),
    })

    const onSelectImg = img => {
      visible.value = false
      // ctx.emit('update:modelValue', img[props.valueKey])
      // ctx.emit('change', img)
    }

    return {
      visible,
      imgUrl,
      onSelectImg,
    }
  },
}
</script>

<style scoped lang="stylus">
.dv-gui {
  &.g-select-image-wrap {
    .g-img {
      position: relative;
      display: inline-block;
      width: 80px;
      height: 26px;
      border-radius: 2px;
      border: 1px solid #000;
      overflow: hidden;
      cursor: pointer;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        max-width: 100%;
      }
    }
  }
}
</style>
