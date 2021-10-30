<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <a
      v-if="config.urlConfig.url"
      :href="config.urlConfig.url"
      :target="config.urlConfig.ifBlank ? '_blank' : '_self'"
      style="display: block; width: 100%; height: 100%;"
    ></a>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'VMainImg',
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
      let background = `url(${config.value.backgroundImage}) 0% 0% / `
      if (config.value.repeat === 'repeat') {
        background += 'auto repeat'
      } else if (config.value.repeat === 'repeat-x') {
        background += 'auto 100% repeat-x'
      } else if (config.value.repeat === 'repeat-y') {
        background += '100% repeat-y'
      } else if (config.value.repeat === 'no-repeat') {
        background += '100% 100% no-repeat'
      } else {
        background += 'auto no-repeat'
      }
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        'image-rendering': '-webkit-optimize-contrast',
        background,
        '-webkit-mask-image': 'none',
        '-webkit-mask-repeat': 'initial',
        '-webkit-mask-size': 'initial',
        'border-radius': `${config.value.radius}px`,
        cursor: config.value.urlConfig.url ? 'pointer' : 'default',
      }
    })
    return {
      wrapperStyle,
      config,
    }
  },
}
</script>
