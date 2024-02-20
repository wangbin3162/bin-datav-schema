<template>
  <div class="dv-transform" :class="transformClass" :style="transformStyle">
    <refer-line
      v-if="toolbox.referLine && !isMultiSelect && isSelected"
      :attr="data.attr"
      :scale="scale"
    />
    <div
      :class="['dv-scale', { hovered: isHovered }]"
      :style="hideStyle"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @mousedown="onMove"
    >
      <div class="transform-handler" :class="handlerClass" :style="handlerStyle">
        <div class="dv-com" :style="dvComStyle">
          <slot></slot>
          <!--事件阻止蒙版 -->
          <div class="dv-event-disable" :style="disableEventStyle"></div>
        </div>

        <span class="control-point rotate-handler" @mousedown.prevent.stop="onRotate"></span>

        <i
          v-for="(v, k) in points"
          :key="k"
          :class="`control-point ${v.name}-handler`"
          :style="v.style"
          data-html2canvas-ignore
          @mousedown.prevent.stop="onZoom($event, k)"
        />
      </div>
    </div>
    <i v-if="data.locked" class="b-iconfont b-icon-lock" title="解锁"></i>
  </div>
</template>

<script setup>
import { computed, getCurrentInstance } from 'vue'
import { getCursors, handleMove, handleRotate, handleZoom } from './util'
import ReferLine from './refer-line.vue'

import { useStore } from '@/store'

defineOptions({
  name: 'DvTransform',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const instance = getCurrentInstance()

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const { canvas, selectedCom, selectedComIds, toolbox, hoveredComId, spaceDown, isMultiSelect } =
  storeToRefs(schemaStore)
// 是否悬停当前
const isHovered = computed(() => hoveredComId.value === props.data.id)
// 是否多选选中当前当前
const isSelected = computed(() => {
  return selectedComIds.value.includes(props.data.id) || selectedCom.value?.id === props.data.id
})

const transformClass = computed(() => ({
  locked: props.data.locked,
  selected: isSelected.value,
}))

const dvComStyle = computed(() => {
  const rotate3d = props.data.attr.rotateY !== 0 || props.data.attr.rotateX !== 0
  return rotate3d
    ? {
        'transform-style': 'preserve-3d',
        perspective: `${props.data.attr.perspective}px`,
        overflow: 'visible',
      }
    : null
})

const transformStyle = computed(() => {
  const { x, y, w, h } = props.data.attr
  return {
    top: 0,
    left: 0,
    width: `${w}px`,
    height: `${h}px`,
    transform: `translate(${x}px, ${y}px)`,
  }
})

const handlerClass = computed(() => ({ 'is-hide': !isSelected.value || props.data.locked }))

// z轴旋转
const handlerStyle = computed(() => ({
  transform: `rotateZ(${props.data.attr.rotate}deg)`,
}))

const disableEventStyle = computed(() => ({
  width: `${props.data.attr.w}px`,
  height: `${props.data.attr.h}px`,
}))
const hideStyle = computed(() => ({
  display: props.data.hided ? 'none' : 'block',
}))

const cursor = computed(() => getCursors(props.data.attr.rotate))

const scale = computed(() => canvas.value.scale)

const points = computed(() => {
  return {
    t: {
      name: 'top',
      style: { cursor: cursor.value.t },
    },
    rt: {
      name: 'top-right',
      style: { cursor: cursor.value.rt },
    },
    r: {
      name: 'right',
      style: { cursor: cursor.value.r },
    },
    rb: {
      name: 'bottom-right',
      style: { cursor: cursor.value.rb },
    },
    b: {
      name: 'bottom',
      style: { cursor: cursor.value.b },
    },
    lb: {
      name: 'bottom-left',
      style: { cursor: cursor.value.lb },
    },
    l: {
      name: 'left',
      style: { cursor: cursor.value.l },
    },
    lt: {
      name: 'top-left',
      style: { cursor: cursor.value.lt },
    },
  }
})

const onEnter = () => schemaStore.hoverCom(props.data.id)

const onLeave = () => schemaStore.hoverCom('')

const selectCom = () => {
  schemaStore.selectCom(props.data)
}
// 单击选中组件
const onMove = e => {
  if (spaceDown.value) return
  e.stopPropagation()
  e.preventDefault()
  selectCom()
  if (props.data.locked) return
  handleMove(e, props.data, scale.value, toolbox.value.grid)
}

const onZoom = (e, dir) => {
  selectCom()
  handleZoom(e, dir, props.data, scale.value, toolbox.value.grid)
}

const onRotate = e => {
  handleRotate(e, instance.vnode.el, props.data)
}
</script>

<style scoped>
.dv-transform {
  position: absolute;
  will-change: transform;

  &.selected {
    z-index: 1;

    .dv-com {
      .dv-event-disable {
        border: 1px solid var(--bin-color-primary);
      }
    }

    .dv-scale::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border: 1px dashed var(--bin-color-primary);
    }
  }

  &.locked {
    pointer-events: none;
  }

  .b-icon-lock {
    font-size: 18px;
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 2;
  }
}

.dv-scale {
  position: absolute;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;

  .dv-com {
    width: 100%;
    height: 100%;
    outline: 0;
    box-sizing: border-box;
    transform-origin: 50% 50%;
    transform: scaleX(1) scaleY(1);
    overflow: hidden;

    .dv-event-disable {
      position: absolute;
      top: 0;
    }
  }

  &.hovered {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      border: 1px dashed var(--bin-color-primary);
    }
  }
}

.transform-handler {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: move;
  box-sizing: border-box;
  cursor: url('@/assets/images/schema/cursor-move.png') 4 4, auto;

  &.is-hide {
    .transform-bg,
    .control-point {
      display: none;
    }
  }

  .rotate-handler {
    top: -18px;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: url('@/assets/images/schema/cursor-rotate-top-right.png') 14 14, pointer;
    &::after {
      position: absolute;
      content: '';
      top: 6px;
      left: 50%;
      transform: translate(-50%, 0);
      width: 1px;
      height: 18px;
      background-color: var(--bin-color-primary);
    }
  }

  .control-point {
    z-index: 2;
    position: absolute;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 5px;
    border: 1px solid var(--bin-color-primary);

    &.top-handler {
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &.bottom-handler {
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
    }

    &.left-handler {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &.right-handler {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
    }

    &.top-left-handler {
      left: 0;
      top: 0;
      transform: translate(-50%, -50%);
    }
    &.top-right-handler {
      right: 0;
      top: 0;
      transform: translate(50%, -50%);
    }

    &.bottom-left-handler {
      left: 0;
      bottom: 0;
      transform: translate(-50%, 50%);
    }

    &.bottom-right-handler {
      right: 0;
      bottom: 0;
      transform: translate(50%, 50%);
    }
  }
}
</style>
