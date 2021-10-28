<template>
  <div class="setting-panel-gui">
    <g-field label="元素选择">
      <g-images
        v-model="config.img"
        prefix-icon="pushpin"
        suffix-icon="select"
        show-preset show-suffix
        :images="bgImages"
        static-path="decoration"
      />
    </g-field>
  </div>
</template>

<script>
import { computed, toRef } from 'vue'
import { presetImages } from './config'

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
    const bgImages = computed(() => presetImages.map(i => ({ name: i.url, path: i.url })))
    return {
      config,
      presetImages,
      bgImages,
    }
  },
}
</script>
