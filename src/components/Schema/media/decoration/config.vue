<template>
  <div class="setting-panel-gui">
    <g-field label="元素选择">
      <g-images-select v-model="config.img" :images="['decoration']" />
    </g-field>
  </div>
</template>

<script>
import { toRef } from 'vue'

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
    }
  },
}
</script>
