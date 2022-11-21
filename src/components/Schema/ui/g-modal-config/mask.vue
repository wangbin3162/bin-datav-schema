<template>
  <div
    :style="{ zIndex, position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }"
    @click="onMaskClick"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Mask',
  props: {
    mask: {
      type: Boolean,
      default: true,
    },
    maskClass: [String, Array, Object],
    zIndex: Number,
  },
  emits: ['click'],
  setup(props, { emit }) {
    let mousedownTarget = false
    let mouseupTarget = false
    // refer to this https://javascript.info/mouse-events-basics
    // events fired in the order: mousedown -> mouseup -> click
    // we need to set the mousedown handle to false after click
    // fired.
    const onMaskClick = e => {
      if (mousedownTarget && mouseupTarget) {
        emit('click', e)
      }
      mousedownTarget = mouseupTarget = false
    }

    const onMousedown = e => {
      // marking current mousedown target.
      if (props.mask) {
        mousedownTarget = e.target === e.currentTarget
      }
    }
    const onMouseup = e => {
      if (props.mask) {
        mouseupTarget = e.target === e.currentTarget
      }
    }
    return {
      onMaskClick,
      onMousedown,
      onMouseup,
    }
  },
}
</script>
