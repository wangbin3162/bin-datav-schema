<template>
  <div class="dv-wrapper">
    <div :style="imgBoxStyle"></div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { decorationImages } from '@/components/Schema/images-cfg/decoration'

export default {
  name: 'VDecoration',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)

    const imgBoxStyle = computed(() => {
      const gif = decorationImages.find(v => v.id === config.value.img)
      return {
        width: '100%',
        height: '100%',
        'background-image': `url(${gif.src})`,
        'background-size': '100%',
        'background-repeat': 'no-repeat',
        'background-position': 'center',
        ...gif.css,
      }
    })

    return {
      imgBoxStyle,
    }
  },
}
</script>
