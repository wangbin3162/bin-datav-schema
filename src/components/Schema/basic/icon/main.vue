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

<script setup>
import { computed } from 'vue'

defineOptions({
  name: 'VIcon',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

// config 配置项
const config = computed(() => props.data.config)

function handleClick() {
  window.open(config.value.url, config.value.ifBlank ? '_blank' : '_self')
}
</script>

<style scoped>
.image-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
