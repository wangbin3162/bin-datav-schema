<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <a
      v-if="config.urlConfig.url"
      :href="config.urlConfig.url"
      :target="config.urlConfig.ifBlank ? '_blank' : '_self'"
      style="display: block; width: 100%; height: 100%"
    ></a>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'VImage',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)

    const wrapperStyle = computed(() => {
      return {}
    })
    return {
      wrapperStyle,
      config,
    }
  },
}
</script>
