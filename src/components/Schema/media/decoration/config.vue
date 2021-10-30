<template>
  <div class="setting-panel-gui">
    <g-field label="元素选择">
      <g-images-select v-model="config.img" :images="decorationImages" />
    </g-field>
  </div>
</template>

<script>
import { toRef } from 'vue'
import { decorationImages } from '@/components/Schema/media/config/decoration'

export default {
  name: 'VDecorationConfig',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const config = toRef(props.data, 'config')
    return {
      config,
      decorationImages,
    }
  },
}
</script>
