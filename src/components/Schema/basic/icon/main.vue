<template>
  <div class="dv-wrapper">
    <div class="image-box">
      <iconfont
        :icon="config.src"
        :color="config.color"
        :size="config.size"
        :type="config.pointerType"
        @click="handleClick"
      ></iconfont>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'VIcon',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // config 配置项
    const config = computed(() => props.data.config)

    function handleClick() {
      window.open(config.value.url, config.value.ifBlank ? '_blank' : '_self')
    }

    return {
      config,
      handleClick,
    }
  },
}
</script>

<style lang="stylus" scoped>
.image-box{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
