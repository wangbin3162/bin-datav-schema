<template>
  <div class="bi-cube-container">
    <cube-header
      v-model="dataset.datasetName"
      :page-status="dataset"
      back-url="/datasetDemo"
      @save="handleSave"
      @back="handleBack"
    />
    <div class="bi-cube-wrapper">
      <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
        <svg-loading name="loading02"></svg-loading>
      </div>
      <page-cube-wrapper v-else class="full-wrapper">
        <template #left>
          <cube-table-list />
        </template>
        <template #default>
          <div class="default-wrapper">
            <link-node-wrapper
              :dragging="dragging"
              :data="stateTree"
              @node-click="handleNodeClick"
              @node-remove="handleNodeRemove"
              @node-drop="handleNodeDrop"
              @link-click="handleLinkClick"
              @empty-drop="handleEmptyDrop"
              :dev="dev"
            ></link-node-wrapper>
          </div>
        </template>
        <template #draggable>
          <div class="table-header">
            <div class="header-tabs">
              <span class="tab active">数据预览</span>
            </div>
            <div class="right-col">
              <!--dev-->
              <span v-if="dev" class="mr-8">
                <b-button type="danger" size="mini" icon="bug" @click="debugVisible = true"></b-button>
                <b-modal title="Debug Data" width="800" v-model="debugVisible" destroy-on-close>
                  <div flex="box:mean">
                    <b-ace-editor :model-value="JSON.stringify({dimensionTree,measureTree},null,2)"></b-ace-editor>
                    <b-ace-editor :model-value="JSON.stringify({dimensionFields,measureFields},null,2)"></b-ace-editor>
                  </div>
                </b-modal>
              </span>
              <b-button type="primary" size="mini" icon="reload">刷新预览</b-button>
            </div>
          </div>
          <div class="preview-data-content">
            <div class="preview-data-scroll">
              <div class="preview-data-left">
                <div class="cube-field-panel">
                  <b-scrollbar>
                    <div class="cube-tree">
                      <b-tree
                        default-expand
                        lock-select
                        draggable
                        :allow-drop="allowDrop"
                        :allow-drag="allowDrag"
                        :data="[dimensionTree]"
                        :render="renderContent"
                        @node-drop="handleDrop"
                      ></b-tree>
                    </div>
                    <div class="cube-tree">
                      <b-tree
                        default-expand
                        draggable
                        lock-select
                        :allow-drop="allowDrop"
                        :allow-drag="allowDrag"
                        :data="[measureTree]"
                        :render="renderContent"
                        @node-drop="handleDrop"
                      ></b-tree>
                    </div>
                  </b-scrollbar>
                </div>
              </div>
              <div class="preview-data-right">
                <cube-field-table
                  :dimension-fields="dimensionFields"
                  :measure-fields="measureFields"
                  @command="handleDmCommand"
                ></cube-field-table>
              </div>
            </div>
          </div>
        </template>
      </page-cube-wrapper>

      <!--节点编辑-->
      <cube-node-edit ref="nodeEditRef" @save="saveSelectedFields"></cube-node-edit>
      <cube-link-edit ref="linkEditRef" @save="saveJoinKeys"></cube-link-edit>
      <b-modal v-model="fieldModal" title="编辑字段">
        <b-form :model="filedNode" label-width="90px">
          <b-form-item label="字段名" required>
            <label>{{ filedNode.field }}</label>
          </b-form-item>
          <b-form-item prop="title" label="字段标题" required>
            <b-input v-model="filedNode.title"></b-input>
          </b-form-item>
        </b-form>
        <template #footer>
          <b-button @click="fieldModal=false">取 消</b-button>
          <b-button type="primary" @click="saveField">确 定</b-button>
        </template>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { provide, ref } from 'vue'
import useCubePage from '@/views/schema/cube/hooks/use-cube-page'
import useSchema from '@/views/schema/cube/hooks/use-schema'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'
import PageCubeWrapper from '@/components/Common/Page/page-cube-wrapper.vue'
import LinkNodeWrapper from '@/components/Service/LinkNode/index.vue'
import CubeHeader from '@/views/schema/cube/components/cube-header.vue'
import CubeTableList from '@/views/schema/cube/components/cube-table-list.vue'
import CubeNodeEdit from '@/views/schema/cube/components/cube-node-edit.vue'
import CubeLinkEdit from '@/views/schema/cube/components/cube-link-edit.vue'
import CubeFieldTable from '@/views/schema/cube/components/cube-field-table.vue'

export default {
  name: 'Cube',
  components: {
    CubeFieldTable,
    CubeLinkEdit,
    CubeNodeEdit,
    SvgLoading,
    LinkNodeWrapper,
    CubeTableList,
    PageCubeWrapper,
    CubeHeader,
  },
  setup() {
    const pageStatus = useCubePage()
    const schemaStatus = useSchema(pageStatus.dataset)

    provide('BiCube', {
      schemaStatus,
      pageStatus,
    })

    return {
      dev: true,
      debugVisible: ref(false),
      ...pageStatus,
      ...schemaStatus,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
.bi-cube-container {
  height: 100vh;
  width: 100%;
  position: relative;
  .bi-cube-wrapper {
    position: relative;
    height: calc(100% - 50px);
    .full-wrapper {
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
    .default-wrapper {
      padding: 24px;
      background-color: #f2f2f2;
      height: 100%;
      overflow: auto;
    }
    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      padding: 0 20px;
      background-color: #fff;
      border-bottom: $cube-base-border;
      border-top: $cube-base-border;
      .header-tabs {
        display: flex;
        height: 100%;
        .tab {
          position: relative;
          height: 100%;
          line-height: 48px;
          color: $color-primary;
          &.active:after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 2px;
            background-color: $color-primary;
          }
        }
      }
    }
    .preview-data-content {
      height: calc(100% - 48px);
      width: 100%;
      overflow: auto;
      .preview-data-scroll {
        display: flex;
        min-width: 1000px;
        height: 100%;
      }
      .preview-data-left {
        width: 260px;
      }
      .preview-data-right {
        width: calc(100% - 260px);
        height: 100%;
        overflow: auto;
      }
      .cube-field-panel {
        width: 260px;
        height: 100%;
        background-color: #fff;
        color: #191919;
        border-right: $cube-base-border-light;
        .cube-tree {
          padding: 8px 5px;
          + .cube-tree {
            border-top: $cube-base-border-light;
          }
          :deep(.bin-tree) {
            .setting-action {
              display: none;
            }
            .bin-tree-render-title {
              .D > i {
                color: $color-primary;
              }
              .M > i {
                color: $color-success;
              }
              &:hover .setting-action {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
