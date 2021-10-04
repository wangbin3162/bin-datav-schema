<template>
  <div class="link-node-wrapper">
    <template v-if="!dataEmpty">
      <div
        class="link-wrapper"
        v-for="(item, i) in renderList"
        :key="i"
        :class="{'empty-highlight':item.node.isEmpty && item.nodeIndex !== dragoverNodeIndex}"
      >
        <!--tip连接桩-->
        <node-tip
          v-if="item.visible&&item.node.level>0"
          :data="item.node"
          :style="item.tipStyle"
        ></node-tip>
        <!--link-node节点-->
        <link-node
          v-if="item.visible"
          :data="item.node"
          :style="item.nodeStyle"
        >
        </link-node>
      </div>
      <div class="link-margin" :style="linkMargin[0]"></div>
      <div class="link-margin" :style="linkMargin[1]"></div>
    </template>
    <!--empty-tips-->
    <div v-else
         :class="{'empty-tips':true,dragging}"
         @drop="onEmptyDrop($event)"
         @dragover="e=>e.preventDefault()"
    >
      <img src="@/assets/images/link-node/empty-drag.png" alt="empty">
      <p>{{ emptyText }}</p>
    </div>
    <!--empty with root-->
    <div v-if="onlyRoot" class="help-wrapper">
      <img src="@/assets/images/link-node/table-table.png" alt="empty">
      <p>{{ helpText }}</p>
    </div>
    <!--dev-->
    <div v-if="dev" class="dev">
      <b-button type="danger" size="mini" icon="bug" @click="debugVisible = true"></b-button>
      <b-modal title="Debug Data" width="800" v-model="debugVisible" destroy-on-close>
        <div flex="box:mean">
          <b-ace-editor :model-value="JSON.stringify({sourceData:data},null,2)"></b-ace-editor>
          <b-ace-editor :model-value="JSON.stringify({stateTree,flatState},null,2)"></b-ace-editor>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { computed, provide, reactive, ref, toRefs, watch } from 'vue'
import { deepCopy, isEmpty } from '@/utils/util'
import LinkNode from '@/components/Service/LinkNode/node.vue'
import NodeTip from '@/components/Service/LinkNode/node-tip.vue'
import { getLinkMarginStyle, getNodeStyle } from '@/components/Service/LinkNode/node-util'

export default {
  name: 'link-node-wrapper',
  components: { NodeTip, LinkNode },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    defaultIcon: {
      type: String,
      default: 'table',
    },
    emptyText: {
      type: String,
      default: '请从左侧拖拽数据表开始创建',
    },
    emptyNodeText: {
      type: String,
      default: '拖拽左侧表至此添加关联表',
    },
    helpText: {
      type: String,
      default: '继续从左侧拖拽数据表进行表关联',
    },
    dragging: {
      type: Boolean,
      default: false,
    },
    dev: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['node-click', 'node-remove', 'link-click', 'node-drop', 'empty-drop'],
  setup(props, { emit }) {
    const states = reactive({
      stateTree: {},
      flatState: [],
      renderList: [],
      maxLevel: 0,
      maxRow: 0,
      dragoverNodeIndex: -1,
    })
    const debugVisible = ref(false)

    const dataEmpty = computed(() => isEmpty(states.stateTree))

    const onlyRoot = computed(() => states.stateTree.isLeaf)

    // link-margin
    const linkMargin = computed(() => {
      const devStyle = props.dev && debugVisible.value ? { background: 'red', width: '100px' } : {}
      const { maxLevel, maxRow } = states
      return getLinkMarginStyle(maxLevel, maxRow, devStyle)
    })

    // 1.树节点处理，追加和分配层级和行标识
    function updateStateTree() {// 每个结点都有一个关系父结点/子结点
      let keyIndex = 0
      let keyCounter = 0
      let keyRow = 0
      let childrenKey = 'children'

      const flattenChildren = (node, level = 0) => {
        if (isEmpty(node)) return
        node.nodeKey = keyCounter++
        node.nodeIndex = keyIndex++
        node.level = level
        node.row = keyRow
        node.isEmpty = false
        if (!isEmpty(node[childrenKey])) {
          node.isLeaf = false
          const _level = level + 1
          node[childrenKey].forEach((child, index) => {
            if (index === 0) {
              child.row = keyRow
              child.isKnee = false
            } else {
              child.row = ++keyRow
              child.isKnee = true
            }
            flattenChildren(child, _level)
          })
          // 存在子节点，追加一个空节点
          node[childrenKey].push({
            title: props.emptyNodeText,
            level: level + 1,
            nodeIndex: keyIndex++,
            row: ++keyRow,
            isEmpty: true, // 是否是空节点
            isKnee: true,// 是否是拐点
          })
        } else {
          node.isLeaf = true
          // 不存在children拼接一个空节点
          node[childrenKey] = [{
            title: props.emptyNodeText,
            level: level + 1,
            row: keyRow,
            isEmpty: true, // 是否是空节点
            isKnee: false,// 是否是拐点
            nodeIndex: keyIndex++,
          }]
        }
      }

      flattenChildren(states.stateTree)
    }

    // 2.拉平节点，追加子父级关系
    function updateFlatState() {
      let childrenKey = 'children'
      const flatTree = []

      const flattenChildren = (node, parent, parentKeys) => {
        if (isEmpty(node)) return
        flatTree[node.nodeIndex] = { node: node, nodeIndex: node.nodeIndex }
        if (typeof parent !== 'undefined') {
          flatTree[node.nodeIndex].parent = parent.nodeIndex
          flatTree[parent.nodeIndex][childrenKey].push(node.nodeIndex)
        }
        let parents = parentKeys ? parentKeys.split(',').map(i => +i) : []
        // 拼接parents
        if (typeof parentKeys !== 'undefined') {
          parents.push(parent.nodeIndex)
          flatTree[node.nodeIndex].parents = parents
        }

        if (node[childrenKey]) {
          flatTree[node.nodeIndex][childrenKey] = []
          node[childrenKey].forEach(child => flattenChildren(child, node, parents.join(',')))
        }
      }

      flattenChildren(states.stateTree)

      states.flatState = flatTree
    }

    // 3.重新组建连接节点
    function rebuildLinks() {
      states.renderList = rebuildRenderList()
      states.maxLevel = Math.max.apply(Math, states.flatState.map(v => v.node.level))
      states.maxRow = Math.max.apply(Math, states.flatState.map(v => v.node.row))
    }

    // 节点渲染列表，拼接属性，style等
    function rebuildRenderList() {
      const nodeList = []
      states.flatState.forEach(item => {
        const { row, level } = item.node
        const { nodeStyle, tipStyle } = getNodeStyle(row, level)
        const visible = item.node.isEmpty ? props.dragging : true
        // 拼接实际节点
        nodeList.push({ ...item, visible, nodeStyle, tipStyle })
      })
      return nodeList
    }

    // 更新树节点数据
    function updateData() {
      states.stateTree = deepCopy(props.data)
      updateStateTree()
      updateFlatState()
      rebuildLinks()
    }

    // 节点点击事件
    function handleNodeClick(nodeIndex) {
      const node = states.flatState[nodeIndex].node
      emit('node-click', node.nodeKey)
    }

    function handleNodeRemove(nodeIndex) {
      const stateNode = states.flatState[nodeIndex]
      const node = stateNode.node
      const parentNode = node.nodeKey === 0 ? {} : states.flatState[stateNode.parent].node
      emit('node-remove', node.nodeKey, parentNode.nodeKey)
    }

    // 连接点击事件
    function handleLinkClick(nodeIndex) {
      const stateNode = states.flatState[nodeIndex]
      const node = stateNode.node
      const parentNode = states.flatState[stateNode.parent].node
      emit('link-click', node.nodeKey, parentNode.nodeKey)
    }

    // node-drag event
    function onNodeDragenter(nodeIndex) {
      states.dragoverNodeIndex = nodeIndex
    }

    function onNodeDragleave() {
      states.dragoverNodeIndex = -1
    }

    function onNodeDrop(nodeIndex, tableId) {
      const stateNode = states.flatState[nodeIndex]
      const parentNode = states.flatState[stateNode.parent].node
      emit('node-drop', parentNode.nodeKey, tableId)
    }

    function onEmptyDrop(e) {
      emit('empty-drop', e.dataTransfer.getData('id'))
    }

    provide('LinkNodeInstance', {
      states,
      handleNodeClick,
      handleNodeRemove,
      handleLinkClick,
      onNodeDragenter,
      onNodeDragleave,
      onNodeDrop,
    })

    watch(() => props.data, () => {
      updateData()
    }, { deep: true, immediate: true })

    watch(() => props.dragging, () => {
      rebuildLinks()
    }, { immediate: true })

    return {
      ...toRefs(states),
      debugVisible,
      dataEmpty,
      linkMargin,
      onlyRoot,
      onEmptyDrop,
    }
  },
}
</script>

<style scoped lang="stylus">
.link-node-wrapper {
  position: relative;
  height: 100%;
  .link-wrapper {
    &.empty-highlight {
      opacity: 0.6;
    }
  }
  .link-margin {
    position: absolute;
    width: 1px;
    height: 1px;
  }
  .empty-tips {
    text-align: center;
    line-height: 2;
    height: 100%;
    padding-top: 30px;
    border: 1px solid transparent;
    color: rgba(0, 0, 0, .65);
    &.dragging {
      border: 1px dashed #c6c6c6;
      background-color: #fafafa;
    }
  }
  .help-wrapper {
    position: absolute;
    width: 100%;
    top: 30px;
    border: 1px solid transparent;
    color: rgba(0, 0, 0, .65);
    text-align: center;
    line-height: 1;
    height: 80%;
    opacity: .5;
    > img {
      width: 96px;
      height: 60px;
    }
  }
  .dev {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
