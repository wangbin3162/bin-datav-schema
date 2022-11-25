<template>
  <div class="dv-wrapper">
    <div class="image-box" :style="imageStyle">
      <a
        class="url-a"
        v-if="config.urlConfig.url"
        :href="config.urlConfig.url"
        :target="config.urlConfig.ifBlank ? '_blank' : '_self'"
      ></a>
    </div>
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

    const imageStyle = computed(() =>
      config.value.imageType === 'image' ? getImgStyle() : getBorderStyle(),
    )

    function getImgStyle() {
      const cfg = config.value
      return {
        'background-size': cfg.size,
        'background-position': cfg.position,
        'background-repeat': cfg.repeat,
        'background-image': `url(${cfg.src})`,
        'border-radius': `${cfg.radius}px`,
        overflow: 'hidden',
      }
    }

    function getBorderStyle() {
      const { border } = config.value
      return {
        'border-radius': `${config.value.radius}px`,
        'border-style': 'solid',
        'border-width': `1px`,
        background: 'none',
        'border-image': `url(${config.value.src}) ${border.slice} / ${border.width} / ${border.outset} ${border.repeat}`,
      }
    }

    return {
      imageStyle,
      config,
    }
  },
}
</script>

<style lang="stylus" scoped>
.image-box{
  position: relative;
  width: 100%;
  height: 100%;
  .url-a {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
  }
}
</style>
