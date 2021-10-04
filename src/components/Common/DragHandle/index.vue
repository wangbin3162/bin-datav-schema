<template>
  <div class="handle" :class="customClass" :style="styles" title="Drag sort">
    <img v-if="type==='svg'" :src="svgImg[icon]" alt="move" />
    <i v-else :class="`b-iconfont b-icon-${icon}`" :style="{fontSize:iconFontSize}"></i>
  </div>
</template>

<script>
import Icon1 from './drag-move.svg'
import Icon2 from './drag-move0.svg'
import Icon3 from './drag-move1.svg'
import Icon4 from './drag-move2.svg'
import Icon5 from './drag-move3.svg'
import Icon6 from './drag-move-fill.svg'
import Icon7 from './drag-drop-line.svg'
import Icon8 from './drag-filled.svg'
import Icon9 from './drag-flat.svg'
import Icon10 from './gesture_drag-up-down.svg'

export default {
  name: 'drag-handle',
  props: {
    customClass: {
      type: String,
      default: 'drag',
    },
    type: {
      type: String,
      default: 'svg', // svg icon
    },
    icon: {
      type: String,
      default: 'drag-move',
    },
    iconFontSize: {
      type: String,
    },
    styles: {
      type: Object,
    },
  },
  data() {
    return {
      svgImg: {
        'drag-move': Icon1,
        'drag-move0': Icon2,
        'drag-move1': Icon3,
        'drag-move2': Icon4,
        'drag-move3': Icon5,
        'drag-move-fill': Icon6,
        'drag-drop-line': Icon7,
        'drag-filled': Icon8,
        'drag-flat': Icon9,
        'gesture_drag-up-down': Icon10,
      },
    }
  },
}
</script>

<style scoped lang="stylus">
.handle {
  cursor: grab;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 0;
  > img {
    width: 100%;
    opacity: 0.7;
    transition: .2s;
    &:hover {
      opacity: 1;
    }
  }
  > i {
    opacity: 0.8;
    transition: .2s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
