<template>
  <div class="data-source-api">
    <div class="data-config-left">
      <div class="config-data-container">
        <!--这部分内容应当也是每个组件提供一个数据面板，这里先写死-->
        <div class="config-data-panel">
          <div class="node-main" :class="{ dragging }">
            <!--图例/维度-->
            <template v-if="enableLegend">
              <div id="area_legend_panel" class="config-data-item" @drop="onLegendDrop($event)">
                <div class="area-name D"><span>图例/维度</span></div>
                <div class="no-column-tip" v-if="legendColumns.length === 0">
                  <span title="拖动度量字段至此处">拖动度量字段至此处</span>
                </div>
                <ul v-else class="column-list measure" id="area_legend">
                  <li
                    v-for="(item, index) in legendColumns"
                    :key="item.id"
                    class="column-item"
                    :class="item.type"
                  >
                    <b-dropdown trigger="contextmenu" append-to-body @command="legendChange">
                      <div class="field-title">
                        <fieldTypeIcon :type="item.dataType" size="14px"></fieldTypeIcon>
                        <span class="ml-5">
                          {{ item.title }}
                        </span>
                      </div>
                      <template #dropdown>
                        <b-dropdown-menu>
                          <b-dropdown-item
                            :name="{ index, key: '' }"
                            :selected="item.sortWay === ''"
                          >
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
                    <i class="b-iconfont b-icon-delete" @click="legendColumns.splice(index, 1)"></i>
                  </li>
                </ul>
                <div
                  class="config-data-item-mask"
                  @dragover.prevent
                  @dragenter.stop="onDragEnter"
                  @dragleave.stop="onDragLeave"
                ></div>
              </div>
            </template>
            <!--类别轴/维度-->
            <div id="area_type_panel" class="config-data-item" @drop="onDimensionDrop($event)">
              <div class="area-name D"><span>类别轴/维度</span></div>
              <div class="no-column-tip" v-if="xColumns.length === 0">
                <span title="拖动维度字段至此处">拖动维度字段至此处</span>
              </div>
              <ul v-else class="column-list dimension" id="area_type">
                <li
                  v-for="(item, index) in xColumns"
                  :key="item.id"
                  class="column-item"
                  :class="item.type"
                >
                  <b-dropdown trigger="contextmenu" append-to-body @command="sortChange">
                    <div class="field-title">
                      <i
                        class="b-iconfont b-icon-expand mr-5"
                        v-if="showDrill && item.drillEnabled === 'Y'"
                        title="下钻字段"
                      ></i>
                      <fieldTypeIcon :type="item.dataType" size="14px"></fieldTypeIcon>
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
                <li
                  v-for="(item, index) in yColumns"
                  :key="item.id"
                  class="column-item"
                  :class="item.type"
                >
                  <b-dropdown trigger="click" append-to-body @command="aggrChange">
                    <div class="field-title">
                      <fieldTypeIcon :type="item.dataType" size="14px"></fieldTypeIcon>
                      <span class="ml-5">
                        {{ item.title }}{{ ` (${AGGREGATOR_FUN[item.aggregator]})` }}
                      </span>
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
                <i
                  class="b-iconfont b-icon-question-circle f-s-14"
                  title="可继续拖拽维度字段设置下层下钻字段"
                ></i>
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
                    <fieldTypeIcon :type="item.dataType" size="14px"></fieldTypeIcon>
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
          <div class="refresh-panel p5">
            <b-button type="primary" size="small" style="width: 100%" @click="setApiDataConfig">
              保 存
            </b-button>
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
        <g-loading spinning></g-loading>
      </div>
    </div>
  </div>
</template>

<script>
import useDsApi from './useDsApi'
import fieldTypeIcon from './field-type-icon.vue'
import { computed, h } from 'vue'
import { useStore } from '@/store'

const drillComs = ['VBasicBar', 'VHorizontalBar', 'VBasicLine', 'VBasicArea']

export default {
  name: 'DsApi',
  components: { fieldTypeIcon },
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
    enableLegend: {
      type: Boolean,
      default: true,
    },
    isBox: {
      type: Boolean,
      default: false,
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
                ? h(fieldTypeIcon, {
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

<style scoped>
.data-source-api {
  height: 100%;
  overflow: hidden;
  display: flex;
  .data-config-left,
  .data-config-right {
    width: 50%;
    font-size: 12px;
    height: 100%;
  }
  .data-config-left {
    height: 100%;
    position: relative;
    border-right: 1px solid var(--s-border-color-2);
  }
  .data-config-right {
    position: relative;
    height: 100%;
    font-size: 12px;
    .tree-box {
      padding: 5px 12px 5px 4px;
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
      background: var(--s-border-color-2);
    }
    .tree-loading {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #1d2126;
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
        border-bottom: 1px solid var(--s-border-color-2);
        .area-name {
          white-space: nowrap;
          word-break: keep-all;
          height: 42px;
          line-height: 42px;
          color: #fff;
          &.D {
            color: var(--bin-color-primary);
          }
          &.M {
            color: var(--bin-color-success);
          }
        }
        .column-list {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          min-height: 28px;
          .column-item {
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 8px;
            width: 100%;
            height: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 4px;
            color: var(--s-text-color);
            background: var(--bin-color-primary-alpha1);
            border: 1px solid var(--bin-color-primary);
            &.D .svg-icon-wrapper {
              color: var(--bin-color-primary);
            }
            &.M .svg-icon-wrapper {
              color: var(--bin-color-success);
            }
            .field-title {
              min-width: 100px;
              max-width: 200px;
              display: flex;
              align-items: center;
              cursor: pointer;
              color: var(--s-text-color);
            }
            .b-icon-apartment {
              position: absolute;
              right: 26px;
              top: 2px;
              cursor: pointer;
              font-size: 14px;
              color: var(--s-text-color);
              &:hover {
                color: var(--bin-color-primary-acitve);
              }
            }
            .b-icon-delete {
              position: absolute;
              right: 8px;
              top: 3px;
              cursor: pointer;
              font-size: 14px;
              color: var(--s-text-color);
              &:hover {
                color: var(--bin-color-danger-light2);
              }
            }
          }
        }
        .no-column-tip {
          min-height: 28px;
          line-height: 28px;
          left: 0;
          width: 100%;
          text-align: center;
          color: hsla(0, 0%, 100%, 0.4);
          background: hsla(0, 0%, 100%, 0.1);
          border: 1px dashed hsla(0, 0%, 100%, 0.2);
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        &-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: none;
        }
      }
      .node-main {
        &.dragging {
          .config-data-item-mask {
            display: block;
          }
        }
        .drag-enter {
          background: var(--bin-color-input-shadow);
        }
      }
    }
  }
  :deep(.bin-tree) {
    color: var(--s-text-color);
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
  }
}
</style>
