<template>
  <div class="dv-transform" :class="transformClass" :style="transformStyle">
    <refer-line v-if="toolbox.referLine && isSelected" :attr="data.attr" :scale="scale" />
    <div
      :class="['dv-scale', { hovered: isHovered }]"
      :style="hideStyle"
      @mouseenter="onEnter"
      @mouseleave="onLeave"
      @mousedown="onMove"
    >
      <div class="transform-handler" :class="handlerClass" :style="handlerStyle">
        <div class="dv-com">
          <slot></slot>
          <!--事件阻止蒙版-->
          <div class="dv-event-disable" :style="wrapperStyle" @contextmenu="showMenu"></div>
        </div>
        <template v-for="(v, k) in points" :key="k">
          <i v-if="v.rotateStyle" :class="`${v.name}-handler`" data-html2canvas-ignore>
            <span class="rotate-handler" :style="v.rotateStyle" @mousedown.prevent.stop="onRotate">
              <span
                class="control-point"
                :style="v.style"
                @mousedown.prevent.stop="onZoom($event, k)"
              ></span>
            </span>
          </i>
          <i v-else :class="`${v.name}-handler`" data-html2canvas-ignore>
            <span
              class="control-point"
              :style="v.style"
              @mousedown.prevent.stop="onZoom($event, k)"
            ></span>
          </i>
        </template>
        <div class="transform-bg"></div>
      </div>
    </div>
    <i v-if="data.locked" class="b-iconfont b-icon-lock" title="解锁"></i>
  </div>
</template>

<script>
import { computed, getCurrentInstance } from 'vue'
import { isEmpty } from '@/utils/util'
import { getCursors, handleMove, handleRotate, handleZoom } from './util'
import ReferLine from './refer-line.vue'
import useSchemaContextMenu from '@/hooks/schema/useSchemaContextMenu'

import { useStore } from '@/store'

export default {
  name: 'dv-transform',
  components: { ReferLine },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const instance = getCurrentInstance()
    const { showMenu } = useSchemaContextMenu()

    const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
    const {
      canvas,
      comps,
      pageConfig,
      selectedCom,
      hoveredComId,
      toolbox,
      spaceDown,
      isMultiSelect,
    } = storeToRefs(schemaStore)
    // 是否悬停当前
    const isHovered = computed(() => hoveredComId.value === props.data.id)
    // 是否多选选中当前当前
    const isSelected = computed(() => {
      // 判断是否是多选模式
      if (isMultiSelect.value) return false
      return !isEmpty(selectedCom.value) && selectedCom.value.id === props.data.id
    })

    const transformClass = computed(() => ({
      locked: props.data.locked,
      selected: isSelected.value,
    }))

    const transformStyle = computed(() => ({
      top: 0,
      left: 0,
      width: `${props.data.attr.w}px`,
      height: `${props.data.attr.h}px`,
      transform: `translate(${props.data.attr.x}px, ${props.data.attr.y}px)`,
    }))

    const handlerClass = computed(() => ({ 'is-hide': !isSelected.value || props.data.locked }))

    const handlerStyle = computed(() => ({
      cursor: 'move',
      transform: `rotate(${props.data.attr.rotate}deg)`,
    }))

    const wrapperStyle = computed(() => ({
      width: `${props.data.attr.w}px`,
      height: `${props.data.attr.h}px`,
    }))
    const hideStyle = computed(() => ({
      display: props.data.hided ? 'none' : 'block',
    }))

    const cursor = computed(() => getCursors(props.data.attr.rotate))

    const scale = computed(() => canvas.value.scale)

    const points = computed(() => {
      const transform = `scale(${1 / scale.value}, ${1 / scale.value})`
      return {
        t: {
          name: 'top',
          style: { cursor: cursor.value.t, transform },
        },
        rt: {
          name: 'top-right',
          style: { cursor: cursor.value.rt, transform },
          // rotateStyle: { 'transform-origin': '25% 75%', transform },
        },
        r: {
          name: 'right',
          style: { cursor: cursor.value.r, transform },
        },
        rb: {
          name: 'bottom-right',
          style: { cursor: cursor.value.rb, transform },
          // rotateStyle: { 'transform-origin': '25% 25%', transform },
        },
        b: {
          name: 'bottom',
          style: { cursor: cursor.value.b, transform },
        },
        lb: {
          name: 'bottom-left',
          style: { cursor: cursor.value.lb, transform },
          // rotateStyle: { 'transform-origin': '75% 25%', transform },
        },
        l: {
          name: 'left',
          style: { cursor: cursor.value.l, transform },
        },
        lt: {
          name: 'top-left',
          style: { cursor: cursor.value.lt, transform },
          // rotateStyle: { 'transform-origin': '75% 75%', transform },
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
      handleMove(e, props.data, scale.value, pageConfig.value.grid)
    }

    const onZoom = (e, dir) => {
      selectCom()
      handleZoom(e, dir, props.data, scale.value, pageConfig.value.grid)
    }

    const onRotate = e => {
      handleRotate(e, instance.vnode.el, props.data)
    }

    return {
      // store
      comps,
      selectedCom,
      hoveredComId,
      toolbox,
      // 自有属性
      isHovered,
      isSelected,
      hideStyle,
      transformClass,
      transformStyle,
      handlerClass,
      handlerStyle,
      wrapperStyle,
      onEnter,
      onLeave,
      onMove,
      onZoom,
      onRotate,
      points,
      scale,
      showMenu,
    }
  },
}
</script>
