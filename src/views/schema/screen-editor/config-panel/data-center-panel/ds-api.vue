<template>
  <div class="data-source-api">
    <div class="data-config-left">
      <div class="config-data-container">
        <!--这部分内容应当也是每个组件提供一个数据面板，这里先写死-->
        <div class="config-data-panel">
          <div
            id="area_value_panel"
            class="config-data-item"
            @drop="onDrop($event)"
            @dragover="e=>e.preventDefault()"
            @dragenter="onDragEnter($event)"
            @dragleave="onDragLeave($event)"
          >
            <div class="area-name"><span>值轴/度量</span></div>
            <ul class="column-list" id="area_value"></ul>
            <div class="no-column-tip"><span title="双击或拖动数据字段至此处">双击或拖动数据字段至此处</span></div>
          </div>
          <div
            id="area_type_panel"
            class="config-data-item"
            @drop="onDrop($event)"
            @dragover="e=>e.preventDefault()"
            @dragenter="onDragEnter($event)"
            @dragleave="onDragLeave($event)"
          >
            <div class="area-name"><span>类别轴/维度</span></div>
            <ul class="column-list" id="area_type"></ul>
            <div class="no-column-tip"><span title="双击或拖动数据字段至此处">双击或拖动数据字段至此处</span></div>
          </div>
        </div>
        <div class="bottom-menus">
          <div class="refresh-panel">
            <button id="refresh-panel-button">更新</button>
          </div>
        </div>
      </div>
    </div>
    <div class="data-config-right">
      <div class="tree-box">
        <b-tree
          default-expand
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :data="[dimensionTree]"
          :render="renderContent"
          @node-drag-end="handleDragEnd"
        ></b-tree>
      </div>
      <div class="tree-box">
        <b-tree
          default-expand
          draggable
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :data="[measureTree]"
          :render="renderContent"
          @node-drag-end="handleDragEnd"
        ></b-tree>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, h, inject, reactive } from 'vue'
import { Message } from 'bin-ui-next'
import fieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { compileFlatState, throwError } from '@/utils/util'
import { getSchema } from '@/api/modules/bi-cube.api'

export default {
  name: 'ds-api',
  setup() {

    const status = reactive({
      dimensionTree: {}, // 维度树
      dimensionTreeFlats: [], // 维度树拉平
      dimensionFields: [],
      measureTree: {}, // 度量树
      measureTreeFlats: [], // 度量树拉平
      measureFields: [],
    })
    const schemaStore = useSchemaStore()

    // 更新字段数据
    const updateFieldState = (cubeSchema) => {
      const { dimension, measure } = cubeSchema || {}
      // 维度、度量树
      status.dimensionTree = dimension || { title: '维度', nodeType: 'root', children: [] }
      status.measureTree = measure || { title: '度量', nodeType: 'root', children: [] }
      status.dimensionTreeFlats = compileFlatState(status.dimensionTree)
      status.measureTreeFlats = compileFlatState(status.measureTree)
      status.dimensionFields = status.dimensionTreeFlats.filter(v => v.node.nodeType === 'attribute')
      status.measureFields = status.measureTreeFlats.filter(v => v.node.nodeType === 'attribute')
    }
    // 初始化数据表
    const initData = async () => {
      try {
        const { pageId, workspaceId, sourceId } = schemaStore.pageInfo.value
        const { cubeSchema } = await getSchema({ workspaceId, id: pageId || sourceId })
        updateFieldState(cubeSchema)
      } catch (e) {
        throwError('schema/index', e)
      }
    }

    initData()

    const dimensionTree = computed(() => status.dimensionTree)
    const measureTree = computed(() => status.measureTree)

    // 维度度量树
    function renderContent({ root, node, data }) {
      const inline = [
        h('span',
          {
            class: `${data.type} t-ellipsis`,
            style: { width: 'calc(100% - 24px)' },
            flex: 'cross:center',
            title: `${data.title}-(${data.field})`,
          },
          [
            ...[data.nodeType !== 'root' ? h(fieldTypeIcon, {
              type: data.dataType,
              size: '14px',
              style: { marginRight: '4px' },
            }) : null],
            data.title,
          ],
        ),
      ]
      return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
    }

    const allowDrop = (draggingNode, dropNode, type) => false

    const allowDrag = (draggingNode) => draggingNode.nodeType === 'attribute'

    let lastElement = null

    // 字段拖动进入
    function onDragEnter(e) {
      lastElement = e.target
      e.target.classList.add('highlight-area')
    }

    function onDragLeave(e) {
      if (lastElement === e.target) {
        e.target.classList.remove('highlight-area')
      }
    }

    // 字段填充
    function onDrop(e) {
      console.log(e.target)
      if (lastElement) {
        lastElement.classList.remove('highlight-area')
        lastElement = null
      }
    }

    function handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', draggingNode, dropType)
      Message(`拖拽的节点：${draggingNode.title}`)
    }


    return {
      dimensionTree,
      measureTree,
      allowDrop,
      allowDrag,
      renderContent,
      onDragEnter,
      onDragLeave,
      onDrop,
      handleDragEnd,
    }
  },
}
</script>

<style scoped lang="stylus">
.data-source-api {
  height: 100%;
  display: flex;
  .data-config-left, .data-config-right {
    width: 50%;
    font-size: 12px;
    height: 100%;
  }
  .data-config-left {
    height: 100%;
    position: relative;
    border-right: 1px solid #000000;
  }
  .data-config-right {
    position: relative;
    height: 100%;
    font-size: 12px;
    .tree-box {
      padding: 5px 0;
      height: 50%;
      overflow-y: auto;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      height: 1px;
      background: var(--schema-color-border);
    }
  }
  .config-data-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .config-data-panel {
      height: calc(100% - 39px);
      overflow-x: hidden;
      overflow-y: auto;
      .config-data-item {
        position: relative;
        padding: 0 6px 12px;
        border-bottom: 1px solid var(--schema-color-border);
        .area-name {
          color: #fff;
          white-space: nowrap;
          word-break: keep-all;
          height: 42px;
          line-height: 42px;
        }
        .column-list {
          min-height: 28px;
          overflow-y: hidden;
          overflow-x: hidden;
          background: hsla(0, 0%, 100%, .1);
          border: 1px dashed hsla(0, 0%, 100%, .2);
        }
        .no-column-tip {
          position: absolute;
          top: 50px;
          left: 0;
          width: 100%;
          text-align: center;
          color: hsla(0, 0%, 100%, .4);
          span {
            display: block;
            height: 12px;
            line-height: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &.highlight-area {
          background: rgba(255, 255, 255, .1);
        }
      }
    }
    .bottom-menus {
      .refresh-panel button {
        height: 38px;
        line-height: 38px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        width: 100%;
        background: var(--bin-color-primary);
        border: none;
        border-top: 1px solid #000000;
        outline: none;
        cursor: pointer;
        border-radius: 0;
      }
    }
  }


  :deep(.bin-tree) {
    color: var(--schema-font-color);
    .bin-tree-arrow {
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    .bin-tree-node-children {
      padding-left: 10px;
    }
    .bin-tree-render-title {
      .D > i {
        color: var(--bin-color-primary);
      }
      .M > i {
        color: var(--bin-color-success);
      }
    }
    .bin-tree-title, .bin-tree-render-title {
      line-height: 18px;
      border: 1px solid transparent;
      &.is-selected, &:hover {
        background: rgba(118, 150, 202, .1);
        border-color: var(--bin-color-primary);
      }
    }
  }
}
</style>
