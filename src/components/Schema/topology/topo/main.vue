<template>
  <div class="dv-wrapper">
    <div class="image-box" :style="imageStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'VTopo',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)

const imageStyle = computed(() => getImgStyle())

function getImgStyle() {
  const cfg = config.value

  return {
    'background-size': cfg.size,
    'background-position': cfg.position,
    'background-repeat': cfg.repeat,
    'background-image': `url(${cfg.src})`,
    overflow: 'hidden',
  }
}
</script>

<style scoped>
.image-box {
  position: relative;
  width: 100%;
  height: 100%;
  .url-a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
