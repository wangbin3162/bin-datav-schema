<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <div class="bg-inner" style="background: none; width: 100%; height: 100%;"></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { boxImages } from '@/components/Schema/images-cfg/box'

export default {
  name: 'VBorderBox',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)

    const wrapperStyle = computed(() => {
      const style = {
        transform: 'translateZ(0px)',
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        'border-radius': 0,
        'border-style': 'solid',
        'border-width': `1px`,
        background: 'none',
      }
      const img = boxImages.find(m => m.id === config.value.img)
      if (img) {
        style['border-image'] = `url(${img.src}) ${img.border.slice} / ${img.border.width} / ${img.border.outset} ${img.border.repeat}`
      }
      return style
    })

    return {
      wrapperStyle,
    }
  },
}
</script>
