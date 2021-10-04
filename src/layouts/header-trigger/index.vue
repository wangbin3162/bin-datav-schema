<template>
  <b-tooltip :content="tooltip" :disabled="!tooltip">
    <div class="global-header-trigger" @click="$emit('click')">
      <i :class="`b-iconfont b-icon-${icon}`"
         :style="{transform: `rotate(${rotate}deg)`,fontSize:size,height:size}"
      ></i>
    </div>
  </b-tooltip>
</template>

<script>
export default {
  name: 'HeaderTrigger',
  props: {
    icon: {
      type: String
    },
    rotate: {
      type: Number
    },
    size: {
      type: String
    },
    tooltip: String
  },
  emits: ['click']
}
</script>
