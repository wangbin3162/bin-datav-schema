<template>
  <teleport to="body">
    <transition
      name="modal-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @before-leave="beforeLeave"
    >
      <Mask v-show="visible" :z-index="modalIndex + zIndex" @click="close">
        <transition name="dialog-fade">
          <div class="modal-config" v-if="visible" ref="modalRef" :style="style" @click.stop="">
            <div class="modal-config-header">
              <span class="title">{{ title }}</span>
              <i class="b-iconfont b-icon-close" @click="close"></i>
            </div>
            <div class="content-body" :style="bodyStyle">
              <slot></slot>
            </div>
            <div class="pt-8"></div>
          </div>
        </transition>
      </Mask>
    </transition>
  </teleport>
</template>

<script>
export default { name: 'g-modal-config' }
</script>

<script setup>
import { transferIncrease } from '@/utils/transfer'
import useModalDrag from './useModalDrag'
import { nextTick, computed, ref, toRefs, watch } from 'vue'
import Mask from './mask.vue'
import { addEventListenerWrap } from './addListener'

const emit = defineEmits(['update:modelValue', 'close', 'open', 'closed', 'opened'])

let mousePosition = null
const getClickPosition = e => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  }
  setTimeout(() => (mousePosition = null), 100)
}

// 只有点击事件支持从鼠标位置动画展开
if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
  addEventListenerWrap(document.documentElement, 'click', getClickPosition, true)
}

function getScroll(w, top) {
  let ret = w[`page${top ? 'Y' : 'X'}Offset`]
  const method = `scroll${top ? 'Top' : 'Left'}`
  if (typeof ret !== 'number') {
    const d = w.document
    ret = d.documentElement[method]
    if (typeof ret !== 'number') {
      ret = d.body[method]
    }
  }
  return ret
}

function setTransformOrigin(node, value) {
  const style = node.style
  ;['Webkit', 'Moz', 'Ms', 'ms'].forEach(prefix => {
    style[`${prefix}TransformOrigin`] = value
  })
  style[`transformOrigin`] = value
}

function offset(el) {
  const rect = el.getBoundingClientRect()
  const pos = {
    left: rect.left,
    top: rect.top,
  }
  const doc = el.ownerDocument
  const w = doc.defaultView || doc.parentWindow
  pos.left += getScroll(w, false)
  pos.top += getScroll(w, true)
  return pos
}

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  top: {
    type: String,
    default: '100px',
  },
  width: {
    type: String,
    default: '330px',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 200,
  },
  maxBodyHeight: {
    type: Number,
    default: 400,
  },
})

const modalRef = ref(null)
const modalIndex = ref(transferIncrease())
const visible = ref(false)

const style = computed(() => {
  return {
    marginTop: props.top,
    width: props.width,
    left: `${document.documentElement.clientWidth - 320 * 2 - 20}px`,
  }
})
const bodyStyle = computed(() => {
  const height = Math.max(props.maxBodyHeight, document.documentElement.clientHeight - 32 - 40 - 40)
  return {
    maxHeight: `${height}px`,
    overflow: 'auto',
  }
})

const { modelValue, draggable, destroyOnClose } = toRefs(props)

useModalDrag({
  visible: modelValue,
  destroyOnClose,
  draggable,
})

const updateCallback = visible => {
  if (props.modelValue) {
    // first show
    if (!visible) {
      const dialogNode = modalRef.value
      const cusTransition = props.transitionName && props.transitionName !== 'dialog-fade'
      if (cusTransition) {
        setTransformOrigin(dialogNode, '')
        return
      }
      if (mousePosition) {
        const elOffset = offset(dialogNode)
        setTransformOrigin(
          dialogNode,
          `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`,
        )
      } else {
        setTransformOrigin(dialogNode, '')
      }
    }
  }
}

const open = () => (visible.value = true)
const close = () => (visible.value = false)
const afterEnter = () => emit('opened')
const afterLeave = () => (emit('closed'), emit('update:modelValue', false))
const beforeLeave = () => emit('close')

watch(
  () => props.modelValue,
  val => {
    if (val) {
      modalIndex.value = transferIncrease()
      open()
      emit('opened')
      nextTick(() => {
        if (modalRef.value) modalRef.value.scrollTop = 0
      })
    } else {
      // this.$el.removeEventListener('scroll', this.updatePopper
      if (visible.value) {
        close()
      }
    }
    nextTick(() => {
      updateCallback(!val)
    })
  },
)
</script>

<style lang="stylus">
.modal-config-wrap {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  height: 100%;
  background-color: rgba(0,0,0,0.25);
  overflow: hidden;
}
.modal-config {
  position: absolute;
  user-select: none;
  z-index: 90;
  overflow: hidden;
  min-height: 300px;
  background: var(--schema-color-bg-dark);
  margin: 0 auto;
  border-radius: var(--bin-border-base-radius);
  color: var(--schema-font-color);
  border: 1px solid var(--schema-ui-border);

  &-header {
    position: relative;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    .title {
      line-height: 22px;
      font-weight: 600;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
      background-color: var(--schema-ui-border);
    }
    &:before {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 2px;
      background-image: linear-gradient(270deg, #74f0ff 0, #2681ff 74%);
    }
    .b-iconfont {
      cursor: pointer;
      font-size: 18px;
      color: var(--bin-color-primary);
      transition: transform 0.2s;
      &:hover {
        transform: rotate(180deg);
      }
    }
  }
}
</style>
