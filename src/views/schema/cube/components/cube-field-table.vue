<template>
  <div class="cube-table-container" ref="containerRef">
    <div
      class="bi-awesome-matrix-table"
      :style="tableWrapStyle"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="table-container">
        <div class="top-header-container-box">
          <div class="top-header" :style="topHeaderStyle">
            <div class="row">
              <div
                class="table-cell"
                v-for="(dimension,index) in dimensionFields"
                :key="index"
                style="width: 120px;height: 32px;border-right-width: 1px;"
                :title="index===0?'维度':''"
              >
                <div class="content">
                  <div class="cube-table-tip-cell">
                    <i v-if="index===0" class="svg-icon-wrapper">
                      <svg class="svg-icon" viewBox="0 0 1024 1024" aria-hidden="true" width="1em" height="1em"
                           fill="currentColor">
                        <path
                          d="M512 42.666667L316.330667 289.450667H425.813333v287.829333L172.544 722.261333l-54.698667-93.866666L0 919.637333l313.429333 44.544-54.613333-93.866666L512 725.333333 765.269333 870.4l-54.698666 93.866667L1024 919.808l-117.76-291.413333-54.784 93.866666-253.184-144.896V289.450667h109.312z"></path>
                      </svg>
                    </i>
                    <div class="tip-background dimension"></div>
                    <span v-if="index===0">维度</span>
                  </div>
                </div>
              </div>
              <div
                class="table-cell"
                v-for="(measure,index) in measureFields"
                :key="index"
                style="width: 120px;height: 32px;border-right-width: 1px;"
                :title="index===0?'度量':''"
              >
                <div class="content">
                  <div class="cube-table-tip-cell">
                    <i v-if="index===0" class="svg-icon-wrapper">
                      <svg class="svg-icon" viewBox="0 0 1024 1024" aria-hidden="true" width="1em" height="1em"
                           fill="currentColor">
                        <path
                          d="M782.677333 550.144L1024 791.296 791.296 1024l-55.04-55.04 80.469333-80.384-46.592-46.592-80.469333 80.469333-46.506667-46.592 80.469334-80.384-46.592-46.506666-80.384 80.384-46.592-46.592 232.618666-232.618667z m12.8-537.429333l215.808 215.808-685.397333 685.482666-260.266667 44.373334 44.373334-260.266667L795.477333 12.8z m0 156.842666L213.333333 751.616l-12.117333 71.082667 71.082667-12.117334 582.058666-582.144-58.88-58.88zM232.704 0l241.152 241.237333-232.618667 232.618667-42.325333-42.24 80.384-80.469333-46.592-46.506667-80.384 80.469333-46.592-46.592 80.469333-80.469333-46.592-46.421333-80.384 80.384L0 232.704 232.704 0z"></path>
                      </svg>
                    </i>
                    <div class="tip-background measure"></div>
                    <span v-if="index===0">度量</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div
                class="table-cell"
                v-for="(dimension,index) in dimensionFields"
                :key="index"
                style="width: 120px;height: 59px;border-right-width: 1px;"
                :title="dimension.node.title"
              >
                <div class="content">
                  <div class="cube-table-header-cell">
                    <div class="cube-table-header-cell-top">{{ dimension.node.title }}</div>
                    <div class="cube-table-header-cell-bottom dimension">
                      <field-type-icon :type="dimension.node.dataType"></field-type-icon>
                      <setting-dropdown :data="dimension.node" @command="handleCommand"></setting-dropdown>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="table-cell"
                v-for="(measure,index) in measureFields"
                :key="index"
                style="width: 120px;height: 59px;border-right-width: 1px;"
                :title="measure.node.title"
              >
                <div class="content">
                  <div class="cube-table-header-cell">
                    <div class="cube-table-header-cell-top">{{ measure.node.title }}</div>
                    <div class="cube-table-header-cell-bottom measure">
                      <field-type-icon :type="measure.node.dataType"></field-type-icon>
                      <setting-dropdown :data="measure.node" @command="handleCommand"></setting-dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="preview-data-refresh-tips">
      <div class="preview-data-refresh-tips-icon-line">
        您可以点击右侧的
        <b-button type="text" icon="reload">刷新数据</b-button>
        按钮
      </div>
      <div>来预览并配置数据</div>
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, reactive, ref, toRefs } from 'vue'
import FieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import SettingDropdown from '@/views/schema/cube/components/setting-dropdown.vue'
import { addResizeListener, removeResizeListener } from '@/utils/util'

export default {
  name: 'cube-field-table',
  components: { SettingDropdown, FieldTypeIcon },
  props: {
    dimensionFields: {
      type: Array,
      default: () => ([]),
    },
    measureFields: {
      type: Array,
      default: () => ([]),
    },
  },
  emits: ['command'],
  setup(props, { emit }) {
    const containerRef = ref(null)
    const domStatus = reactive({
      tableWrapStyle: {}, // 最外层容器style
      topHeaderStyle: {}, // top-header-box style
    })

    function onMouseEnter(e) {
      e.target.classList.add('is-hover')
    }

    function onMouseLeave(e) {
      e.target.classList.remove('is-hover')
    }

    function calcTableStyle() {
      if (!containerRef.value) return
      const wrapWidth = containerRef.value.clientWidth
      // const wrapHeight = containerRef.value.clientHeight
      const topBaseHeight = 91 // top-base-height
      const cellWidth = 120  // table-cell-width
      const realWidth = (props.dimensionFields.length + props.measureFields.length) * cellWidth
      const topHeight = realWidth < wrapWidth ? topBaseHeight : topBaseHeight + 6
      domStatus.tableWrapStyle = {
        width: `${wrapWidth}px`,
        height: `${topHeight}px`,
      }
      domStatus.topHeaderStyle = {
        width: `${realWidth}px`,
        height: `${topBaseHeight}px`,
      }
    }

    function handleCommand({ name, node }) {
      emit('command', { name, node })
    }

    onMounted(() => {
      addResizeListener(containerRef.value, calcTableStyle)
    })
    onBeforeUnmount(() => {
      removeResizeListener(containerRef.value, calcTableStyle)
    })
    return {
      containerRef,
      ...toRefs(domStatus),
      onMouseEnter,
      onMouseLeave,
      handleCommand,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/var.styl"
.cube-table-container {
  width: 100%;
  height: 100%;
}
.bi-awesome-matrix-table {
  font-size: 12px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .table-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top-header {
      .row {
        white-space: nowrap;
        &:first-child {
          .table-cell {
            border: none;
            position: relative;
            .cube-table-tip-cell {
              color: #fff;
            }
          }
        }
      }
    }
  }
  .table-cell {
    display: inline-block;
    white-space: nowrap;
    border: 0 solid #cdd4e3;
    border-bottom-width: 1px;
    vertical-align: top;
    padding: 5px 12px;
    .content {
      display: inline-block;
      line-height: 22px;
      cursor: default;
      .cube-table-tip-cell {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        min-height: 22px;
        .svg-icon-wrapper {
          line-height: 1;
          font-size: 16px;
          margin-right: 5px;
          display: block;
        }
        .tip-background {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          &.dimension {
            background-color:$color-primary;
          }
          &.measure {
            background-color: #52c41a;
          }
        }
      }
      .cube-table-header-cell {
        display: block;
        width: 96px;
      }
    }
    .cube-table-header-cell-top {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      justify-content: flex-start;
    }
    .cube-table-header-cell-bottom {
      margin-top: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &.dimension > i {
        color:$color-primary;
      }
      &.measure > i {
        color: #52c41a;
      }
    }
  }
  &.is-hover .table-container {
    overflow: auto;
  }
}
.preview-data-refresh-tips {
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 22px;
  flex-direction: column;
  font-size: 12px;
  color: rgba(0, 0, 0, .7);
  text-align: center;
}
</style>
