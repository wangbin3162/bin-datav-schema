<template>
  <div class="data-source-api">
    <div class="data-config-left">
      <div class="config-data-container">
        <!--这部分内容应当也是每个组件提供一个数据面板，这里先写死-->
        <div class="config-data-panel">
          <div class="node-main" :class="{ dragging }">
            <!--类别轴/维度-->
            <div id="area_type_panel" class="config-data-item" @drop="onDimensionDrop($event)">
              <div class="area-name D"><span>类别轴/维度</span></div>
              <div class="no-column-tip" v-if="xColumns.length === 0">
                <span title="拖动维度字段至此处">拖动维度字段至此处</span>
              </div>
              <ul v-else class="column-list dimension" id="area_type">
                <li v-for="(item, index) in xColumns" :key="item.id" class="column-item" :class="item.type">
                  <b-dropdown trigger="contextmenu" append-to-body @command="sortChange">
                    <div class="field-title">
                      <i
                        class="b-iconfont b-icon-expand mr-5"
                        v-if="showDrill && item.drillEnabled === 'Y'"
                        title="下钻字段"
                      ></i>
                      <field-type-icon :type="item.dataType" size="14px"></field-type-icon>
                      <span class="ml-5">{{ item.title }}</span>
                    </div>
                    <template #dropdown>
                      <b-dropdown-menu>
                        <b-dropdown-item :name="{ index, key: '' }" :selected="item.sortWay === ''">
                          不排序
                        </b-dropdown-item>
                        <b-dropdown-item
                          v-for="(val, key) in SORT_FUN"
                          :key="key"
                          :name="{ index, key }"
                          :selected="item.sortWay === key"
                        >
                          {{ val }}
                        </b-dropdown-item>
                      </b-dropdown-menu>
                    </template>
                  </b-dropdown>
                  <i
                    class="b-iconfont b-icon-apartment"
                    title="设置下钻"
                    v-if="canDrill && !showDrill && item.drillEnabled === 'N'"
                    @click="setDrill(index)"
                  ></i>
                  <i class="b-iconfont b-icon-delete" @click="xColumns.splice(index, 1)"></i>
                </li>
              </ul>
              <div
                class="config-data-item-mask"
                @dragover.prevent
                @dragenter.stop="onDragEnter"
                @dragleave.stop="onDragLeave"
              ></div>
            </div>
            <!--值轴/度量-->
            <div id="area_value_panel" class="config-data-item" @drop="onMeasureDrop($event)">
              <div class="area-name M"><span>值轴/度量</span></div>
              <div class="no-column-tip" v-if="yColumns.length === 0">
                <span title="拖动度量字段至此处">拖动度量字段至此处</span>
              </div>
              <ul v-else class="column-list measure" id="area_value">
                <li v-for="(item, index) in yColumns" :key="item.id" class="column-item" :class="item.type">
                  <b-dropdown trigger="contextmenu" append-to-body @command="aggrChange">
                    <div class="field-title">
                      <field-type-icon :type="item.dataType" size="14px"></field-type-icon>
                      <span class="ml-5">{{ item.title }}{{ ` (${AGGREGATOR_FUN[item.aggregator]})` }}</span>
                    </div>
                    <template #dropdown>
                      <b-dropdown-menu>
                        <b-dropdown-item
                          v-for="(val, key) in AGGREGATOR_FUN"
                          :key="key"
                          :name="{ index, key }"
                          :selected="item.aggregator === key"
                        >
                          {{ val }}
                        </b-dropdown-item>
                      </b-dropdown-menu>
                    </template>
                  </b-dropdown>
                  <i class="b-iconfont b-icon-delete" @click="yColumns.splice(index, 1)"></i>
                </li>
              </ul>
              <div
                class="config-data-item-mask"
                @dragover.prevent
                @dragenter.stop="onDragEnter"
                @dragleave.stop="onDragLeave"
              ></div>
            </div>
            <!--下钻字段-->
            <div
              id="area_drill_panel"
              class="config-data-item"
              v-if="showDrill && drill.length > 0"
              @drop="onDrillDrop($event)"
            >
              <div class="area-name" flex="cross:center">
                <span class="mr-5">下钻字段</span>
                <i class="b-iconfont b-icon-question-circle f-s-14" title="可继续拖拽维度字段设置下层下钻字段"></i>
              </div>
              <ul class="column-list drill-list">
                <li
                  v-for="(item, index) in drill"
                  :key="item.id"
                  class="column-item"
                  :class="item.type"
                  :style="{ width: index === 0 ? '100%' : '90%' }"
                >
                  <div class="field-title">
                    <i class="b-iconfont b-icon-branches mr-5 f-s-14" v-if="index === 0"></i>
                    <!-- <field-type-icon :type="item.dataType" size="14px"></field-type-icon> -->
                    <span class="ml-5">{{ item.title }}</span>
                  </div>
                  <i class="b-iconfont b-icon-delete" @click="removeDrill(index)"></i>
                </li>
              </ul>
              <div
                class="config-data-item-mask"
                @dragover.prevent
                @dragenter.stop="onDragEnter"
                @dragleave.stop="onDragLeave"
              ></div>
            </div>
          </div>
        </div>
        <div class="bottom-menus">
          <div class="refresh-panel">
            <b-button type="primary" style="width: 100%" @click="setApiDataConfig">保 存</b-button>
          </div>
        </div>
      </div>
    </div>
    <div class="data-config-right">
      <div class="tree-box">
        <b-tree
          default-expand
          draggable
          lock-select
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :data="[dimensionTree]"
          :render="renderContent"
          @node-drag-start="handleDimensionDragStart"
          @node-drag-end="dragging = false"
        ></b-tree>
      </div>
      <div class="tree-box">
        <b-tree
          default-expand
          draggable
          lock-select
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
          :data="[measureTree]"
          :render="renderContent"
          @node-drag-start="handleMeasureDragStart"
          @node-drag-end="dragging = false"
        ></b-tree>
      </div>
      <div class="tree-loading" v-show="loading">
        <g-loading spinning type="square"></g-loading>
      </div>
    </div>
  </div>
</template>

<script>
import useDsApi from './useDsApi'
// import fieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import { computed, h } from 'vue'
import { useStore } from '@/pinia'

const drillComs = ['VBasicBar', 'VHorizontalBar', 'VBasicLine', 'VBasicArea']
export default {
  name: 'ds-api',
  // components: { fieldTypeIcon },
  emits: ['save'],
  props: {
    selectedModelId: {
      type: String,
      required: true,
    },
    selectedModelName: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { schemaStore, storeToRefs } = useStore()
    const { selectedCom } = storeToRefs(schemaStore)

    const canDrill = computed(() => drillComs.includes(selectedCom.value.name))

    // 维度度量树
    function renderContent({ data }) {
      const inline = [
        h(
          'span',
          {
            class: `${data.type} t-ellipsis`,
            style: { width: 'calc(100% - 24px)' },
            flex: 'cross:center',
            title: `${data.title}-(${data.field})`,
          },
          [
            ...[
              data.nodeType !== 'root'
                ? h('i', {
                    type: data.dataType,
                    size: '14px',
                    style: { marginRight: '6px' },
                  })
                : null,
            ],
            data.title,
          ],
        ),
      ]
      return h('span', { style: { width: '100%', fontSize: '12px' }, flex: 'main:justify' }, inline)
    }

    return {
      renderContent,
      ...useDsApi(props, emit),
      canDrill,
    }
  },
}
</script>
