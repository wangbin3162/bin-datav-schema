<template>
  <div class="page-config-panel setting-config-panel">
    <div class="page-config-top">图表设计</div>
    <div class="page-config-content" style="padding-bottom: 0;">
      <div class="page-config-content-tabs">
        <div class="tabs-wrapper">
          <div class="tab-item" :class="{active:curTabIndex===0}" @click="changeTab(0)">数据</div>
          <div class="tab-item" :class="{active:curTabIndex===1}" @click="changeTab(1)">样式</div>
        </div>
        <div class="setting-content schema-setting-content">
          <div class="setting-data-panel" v-if="curTabIndex===0">
            <div class="data-config-left">
              <div class="config-data-container">
                <!--这部分内容应当也是每个组件提供一个数据面板，这里先写死-->
                <div class="config-data-panel">
                  <div
                    id="area_value_panel" class="config-data-item highlightArea"
                    @drop="onDrop($event)"
                    @dragover="e=>e.preventDefault()"
                    @dragenter="onDragEnter($event)"
                    @dragleave="onDragLeave($event)">
                    <div class="area-name"><span>值轴/度量</span></div>
                    <ul class="column-list" id="area_value"></ul>
                    <div class="no-column-tip"><span title="双击或拖动数据字段至此处">双击或拖动数据字段至此处</span></div>
                  </div>
                  <div id="area_type_panel" class="config-data-item highlightArea">
                    <div class="area-name"><span>类别轴/维度</span></div>
                    <ul class="column-list" id="area_type"></ul>
                    <div class="no-column-tip"><span title="双击或拖动数据字段至此处">双击或拖动数据字段至此处</span></div>
                  </div>
                </div>
                <div class="bottom-menus">
                  <div class="preview-panel">
                    <label class="preview-label">结果展示 </label>
                    <input type="number" class="form-input" name="value" value="1000">
                  </div>
                  <div class="refresh-panel">
                    <button id="refresh-panel-button">更新</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="data-config-right">
              <b-split split="horizontal" :default-wrap-style="['50%','50%']">
                <template #left>
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
                </template>
                <template #right>
                  <div class="tree-box">
                    <b-tree
                      default-expand
                      draggable
                      :allow-drop="allowDrop"
                      :allow-drag="allowDrag"
                      :data="[measureTree]"
                      :render="renderContent"
                    ></b-tree>
                  </div>
                </template>
              </b-split>
            </div>
          </div>
          <div class="setting-style-panel" v-else>
            <!--这部分应当每个组件，提供一个设置面板，根据不同组件渲染不同的配置面板-->
            <b-collapse simple>
              <b-collapse-panel title="基础信息" name="1">
                <div class="edit-item-title">基础信息</div>
              </b-collapse-panel>
              <b-collapse-panel title="图表样式" name="2">
                <div class="edit-item-title">图表样式</div>
              </b-collapse-panel>
            </b-collapse>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, h, inject, ref } from 'vue'
import fieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import { Message } from 'bin-ui-next'

export default {
  name: 'setting-config-panel',
  setup() {
    // tab切换
    const curTabIndex = ref(0)
    const changeTab = (index) => {
      if (curTabIndex.value !== index) {
        curTabIndex.value = index
      }
    }
    const Schema = inject('Schema', {})
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

    function allowDrop(draggingNode, dropNode, type) {
      return false
    }

    function allowDrag(draggingNode) {
      // 限制拖拽节点
      return draggingNode.nodeType === 'attribute'
    }

    let lastElement = null

    // 字段拖动进入
    function onDragEnter(e) {
      lastElement = e.target
      console.log('enter', e)
      // LinkNodeInstance.onNodeDragenter(props.data.nodeIndex)
    }

    function onDragLeave(e) {
      if (lastElement === e.target) {
        console.log('leave', e)
        // LinkNodeInstance.onNodeDragleave(props.data.nodeIndex)
      }
    }

    // 字段填充
    function onDrop(e) {
      console.log('onDrop', e)
      // LinkNodeInstance.onNodeDrop(props.data.nodeIndex, e.dataTransfer.getData('id'))
    }

    function handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', draggingNode, dropType)
      Message(`拖拽的节点：${draggingNode.title}`)
    }

    return {
      curTabIndex,
      changeTab,
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
