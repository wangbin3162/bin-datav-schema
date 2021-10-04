<template>
  <div class="node-tip" :class="{'is-empty':data.isEmpty}" @click="linkClick">
    <div v-if="!data.isEmpty" class="node-icon-wrapper">
      <join-type :type="data.joinType"></join-type>
    </div>
    <div class="node-line horizontal " :style="lineStyle[0]"></div>
    <div class="node-line vertical " :style="lineStyle[1]"></div>
  </div>
</template>

<script>
import { getTipLineStyle } from '@/components/Service/LinkNode/node-util'
import { computed, inject } from 'vue'
import JoinType from '@/components/Service/LinkNode/join-type.vue'

export default {
  name: 'node-tip',
  components: { JoinType },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const LinkNodeInstance = inject('LinkNodeInstance', {})
    const node = computed(() => [
      LinkNodeInstance.states.flatState,
      LinkNodeInstance.states.flatState.find(v => v.nodeIndex === props.data.nodeIndex),
    ])
    const isKnee = computed(() => props.data.isKnee)
    const lineStyle = computed(() => {
      const [flatState, stateNode] = node.value
      const { row, isKnee } = stateNode.node
      const parent = flatState[stateNode.parent]
      const parentRow = parent ? parent.node.row : 0
      return getTipLineStyle(row, isKnee, parentRow)
    })

    function linkClick() {
      if (props.data.isEmpty) return
      LinkNodeInstance.handleLinkClick(props.data.nodeIndex)
    }

    return {
      node,
      isKnee,
      lineStyle,
      linkClick,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.node-tip {
  position: absolute;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  .node-line {
    position: absolute;
    z-index: 2;
    background: #c1c1c1;
  }
  &:hover .node-line {
    background: getColor();
  }
  .node-line.horizontal {
    right: 0;
    height: 1px;
  }
  .node-line.vertical {
    width: 1px;
    left: 18px;
  }
  .node-icon-wrapper {
    position: absolute;
    z-index: 3;
    cursor: pointer;
  }
  &.is-empty {
    .node-line {
      &.horizontal {
        background: transparent;
        border-top: 1px dashed getColor();
      }
      &.vertical {
        background: transparent;
        border-left: 1px dashed getColor();
      }
    }
  }
}
</style>
