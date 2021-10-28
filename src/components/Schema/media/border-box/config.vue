<template>
  <div class="setting-panel-gui">
    <g-field label="边框选择">
      <g-images
        v-model="config.img"
        prefix-icon="creditcard"
        suffix-icon="select"
        show-preset show-suffix
        :images="bgImages"
        static-path="box"
      />
    </g-field>
  </div>
</template>

<script>
import { computed, toRef } from 'vue'
import { presetImages } from './config'

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
    const bgImages = computed(() => presetImages.map(i => ({ name: i.name, path: i.src })))
    return {
      config,
      presetImages,
      bgImages,
    }
  },
}
</script>
