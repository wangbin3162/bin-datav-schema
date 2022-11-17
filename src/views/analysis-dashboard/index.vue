<template>
  <div class="kanban-wrapper">
    <div class="kanban-main">
      <div class="folder-manage">
        <div class="folder-manage-group">
          <span>看板分组</span>
          <i
            class="b-iconfont b-icon-plus btn-add-icon"
            title="新增文件夹"
            @click="adding = true"
          ></i>
        </div>
        <div class="folder-manage-main">
          <div
            class="folder-item folder-all"
            :class="{ 'folder-item-checked-color': selectedPid === '1' }"
            @click="toggleProject({ id: '1', name: '缺省目录' })"
          >
            <span>缺省目录</span>
          </div>
          <div v-if="adding" class="folder-item new-group">
            <input v-focus class="edit-input" @blur="onAddInputBlur" @keyup.enter="addGroup" />
          </div>
          <div
            v-for="item in folderList"
            :key="item.id"
            class="folder-item"
            :class="{ 'folder-item-checked-color': selectedPid === item.id }"
            @click="toggleProject(item)"
          >
            <template v-if="item.editing">
              <input
                v-focus
                :default-value="item.name"
                class="edit-input"
                @blur="onEditInputBlur($event, item)"
                @keyup.enter="editGroup($event, item)"
              />
            </template>
            <template v-else>
              <span class="folder-name">{{ item.name }}</span>
              <span class="group-btns">
                <i class="b-iconfont b-icon-edit" title="编辑" @click="item.editing = true"></i>
                <i
                  class="b-iconfont b-icon-delete"
                  title="删除"
                  @click="confirmDeleteGroup(item)"
                ></i>
              </span>
            </template>
          </div>
        </div>
      </div>
      <div class="right-list">
        <kanban-list :group="{ pid: selectedPid, name: selectedName }"></kanban-list>
      </div>
    </div>
  </div>
</template>

<script>
import useFolder from './useFolder'
import KanbanList from './kanban-list.vue'

export default {
  name: 'AnalysisDashboard',
  components: { KanbanList },
  setup() {
    return {
      ...useFolder(),
    }
  },
}
</script>

<style scoped lang="stylus">
.kanban-wrapper {
  position: relative;
  user-select: none;
  .kanban-main {
    display: flex;
    flex: 1;
    .right-list {
      padding-left: 20px;
      padding-right: 50px;
      width: 100%;
      color: #fff;
    }
  }
}
.folder-manage {
  min-width: 240px;
  max-width: 240px;
  color: #fff;
  font-size: 14px;
  overflow-y: auto;
  height: calc(100vh - 150px);
  &-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 36px;
    padding-right: 8px;
    padding-left: 24px;
    height: 56px;
    border-bottom: 1px solid #27343e;
    .btn-add-icon {
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: var(--bin-color-primary);
      }
    }
  }
  .folder-item {
    position: relative;
    height: 36px;
    padding: 0 16px 0 50px;
    display: flex;
    font-size: 14px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: color 0.2s;
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    &:hover {
      color: var(--bin-color-primary);
      .group-btns {
        display: inline-block;
      }
    }

    &.folder-item-checked-color {
      border-top: 1px solid var(--bin-color-primary);
      border-bottom: 1px solid var(--bin-color-primary);
      background: linear-gradient(to right, rgba(16, 137, 255, 0.7), rgba(16, 137, 255, 0.2));
      &:hover {
        color: #fff !important;
      }
    }
    &.folder-all {
      padding-left: 50px;
      transition: color 0.2s;
      cursor: pointer;
    }
    .folder-name {
      width: 100px;
      font-size: 14px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      pointer-events: none;
    }
    .group-btns {
      display: none;
      color: var(--bin-color-primary);
      > i {
        font-size: 16px;
      }
      i + i {
        margin-left: 6px;
      }
    }
  }

  .edit-input {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background: #1d262e;
    color: #fff;
    padding: 0 10px;
    line-height: 30px;
    width: 100%;
    height: 30px;
    border: 1px solid var(--bin-color-primary);
    transition: 0.2s;
    box-shadow: 0 0 10px -6px #000;
  }
}
</style>
