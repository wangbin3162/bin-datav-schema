<template>
  <div class="setting-panel-gui">
    <g-field label="边框选择">
      <g-images-select v-model="config.img" :images="boxImages" />
    </g-field>
  </div>
</template>

<script>
import { toRef } from 'vue'
import { boxImages } from '@/components/Schema/media/config/box'

export default {
  name: 'VBorderBoxConfig',
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
      boxImages,
    }
  },
}
</script>
