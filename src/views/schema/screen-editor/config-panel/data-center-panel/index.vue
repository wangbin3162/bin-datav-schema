<template>
  <div class="data-center-panel">
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
import { computed, h, inject } from 'vue'
import { Message } from 'bin-ui-next'
import fieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'

export default {
  name: 'data-center-panel',
  setup() {
    const Schema = inject('Schema', { status: { dimensionTree: {}, measureTree: {} } })
    const dimensionTree = computed(() => Schema.status.dimensionTree)
    const measureTree = computed(() => Schema.status.measureTree)

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
