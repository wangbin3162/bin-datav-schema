<template>
  <div class="setting-panel-gui">
    <g-field label="边框选择">
      <g-images-select v-model="config.img" :images="['box']" />
    </g-field>
  </div>
</template>

<script setup>
import { toRef } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})
const config = toRef(props.data, 'config')
</script>
