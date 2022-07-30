<template>
  <div class="page-cube-wrapper" ref="cubeRef">
    <div class="page-cube">
      <div v-if="$slots.left" class="page-cube-left" :style="{ width: leftWidth }">
        <div
          class="toggle"
          :style="{ left: leftWidth, opacity: leftExpand ? null : 1 }"
          :title="leftExpand ? leftCollapseText : leftExpandText"
          @click="toggleLeft"
        >
          <b-icon :name="leftExpand ? 'left' : 'right'"></b-icon>
        </div>
        <div class="cube-left-content" v-show="leftExpand">
          <slot name="left"></slot>
        </div>
      </div>
      <div
        class="page-cube-content"
        @mouseup="onResizeMouseUp"
        @mousemove="onResizeMouseMove"
        :style="{ width: rightWidth, cursor: active ? 'col-resize' : '', userSelect: active ? 'none' : '' }"
      >
        <div v-if="$slots.default" :style="{ height: $slots.draggable ? height + 'px' : '100%' }">
          <slot></slot>
        </div>
        <div class="draggable-content" v-if="$slots.draggable" :style="{ height: `calc(100% - ${height}px)` }">
          <div class="toggle">
            <i class="b-iconfont b-icon-caret-up" title="展开" @click="changeDragStatus('maximum')" />
            <i class="b-iconfont b-icon-caret-down" title="收起" @click="changeDragStatus('minimum')" />
            <i class="b-iconfont b-icon-creditcard-fill" title="默认高度" @click="changeDragStatus('default')" />
          </div>
          <div class="drag-handler" draggable="true" @mousedown="onResizeMouseDown"></div>
          <slot name="draggable"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue'

export default {
  name: 'page-cube-wrapper',
  props: {
    leftDefaultWidth: {
      type: String,
      default: '240px',
    },
    leftExpandText: {
      type: String,
      default: '展开',
    },
    leftCollapseText: {
      type: String,
      default: '收起',
    },

    defaultHeight: {
      type: Number,
      default: 280,
    },
    defaultMinHeight: {
      type: Number,
      default: 12,
    },
    draggableMinHeight: {
      type: Number,
      default: 48,
    },
  },
  setup(props, { slots }) {
    const cubeRef = ref(null)
    const status = reactive({
      active: false,
      hasMoved: false,
      height: props.defaultHeight,
      wrapHeight: 0,
    })
    const leftExpand = ref(true)
    const leftWidth = computed(() => (leftExpand.value ? props.leftDefaultWidth : '12px'))
    const rightWidth = computed(() => {
      if (slots.left) {
        return leftExpand.value ? `calc(100% - ${props.leftDefaultWidth})` : '100%'
      } else {
        return '100%'
      }
    })

    const toggleLeft = () => {
      leftExpand.value = !leftExpand.value
    }

    const changeDragStatus = type => {
      if (type === 'default') {
        status.height = props.defaultHeight
      } else if (type === 'maximum') {
        status.height = props.defaultMinHeight
      } else {
        if (!cubeRef.value) return
        status.height = cubeRef.value.clientHeight - props.draggableMinHeight
      }
    }

    const onResizeMouseDown = () => {
      if (!slots.draggable) return
      status.active = true
      status.hasMoved = false
    }
    const onResizeMouseUp = () => {
      if (!slots.draggable) return
      status.active = false
    }
    const onResizeMouseMove = e => {
      if (!slots.draggable) return
      if (e.buttons === 0 || e.which === 0) {
        status.active = false
      }
      if (status.active) {
        let offset = 0
        let target = e.currentTarget
        status.wrapHeight = target.clientHeight
        while (target) {
          offset += target.offsetTop
          target = target.offsetParent
        }
        const currentPage = e.pageY
        const height = currentPage - offset
        if (height > props.defaultMinHeight && height < status.wrapHeight - props.draggableMinHeight) {
          status.height = height
        }
        status.hasMoved = true
      }
    }
    return {
      cubeRef,
      ...toRefs(status),
      leftExpand,
      leftWidth,
      rightWidth,
      toggleLeft,
      changeDragStatus,
      onResizeMouseDown,
      onResizeMouseUp,
      onResizeMouseMove,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.page-cube-wrapper {
  .page-cube {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    &-left {
      width: 240px;
      height: 100%;
      border-right: 1px solid #eee;
      transition: width .15s ease;
      .cube-left-content {
        width: 100%;
        height: 100%;
      }
      .toggle {
        position: absolute;
        z-index: 100;
        top: 16px;
        transform: translateX(-10px);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 40px;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #e8e8e8;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .12);
        transition: .15s ease;
        opacity: 0;
        > i {
          font-size: 12px;
        }
        &:hover {
          border-color: var(--bin-color-primary);
          color: var(--bin-color-primary);
        }
      }
      &:hover {
        .toggle {
          opacity: 1;
        }
      }
    }
    &-content {
      width: calc(100% - 240px);
      height: 100%;
      transition: width .15s ease;
      .draggable-content {
        position: relative;
        z-index: 100;
        background-color: #fff;
        border-top: 1px solid #eee;
        .toggle {
          position: absolute;
          z-index: 100;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100px;
          height: 14px;
          border-radius: 10px;
          transition: .15s ease;
          background-color: #fafafa;
          box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.12);
          opacity: 0;
          &:hover {
            background-color: #ff3f3f3;
          }
          > i {
            cursor: pointer;
            padding: 2px;
            margin: 0 8px;
            font-size: 12px;
            &:hover {
              color: getColor();
            }
          }
        }
        .drag-handler {
          width: 100%;
          height: 5px;
          position: absolute;
          left: 0;
          top: -2px;
          cursor: ns-resize;
          z-index: 10;
        }
        &:hover {
          .toggle {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
