<template>
  <div class="nav-line">
    <div class="nav-line-top" :style="topLineStyle"></div>
    <div class="nav-line-left" :style="leftLineStyle"></div>
    <div class="nav-line-account" :style="accountStyle">
      {{ attr.x }}, {{ attr.y }}
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'refer-line',
  props: {
    attr: {
      type: Object,
      required: true,
    },
    scale: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const topLineStyle = computed(() => ({
      height: `${props.attr.y + 60 / props.scale}px`,
      borderLeftWidth: `${0.9 / props.scale}px`,
    }))

    const leftLineStyle = computed(() => ({
      width: `${props.attr.x + 60 / props.scale}px`,
      borderTopWidth: `${0.9 / props.scale}px`,
    }))

    const accountStyle = computed(() => ({
      fontSize: `${(12 / props.scale)}px`,
      top: `-${(6 / props.scale)}px`,
      left: `-${(6 / props.scale)}px`,
    }))

    return {
      topLineStyle,
      leftLineStyle,
      accountStyle,
    }
  },
}
</script>
