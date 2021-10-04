<template>
  <div class="datasource-wrapper">
    <div class="datasource-switcher-wrapper">
      <div class="datasource-label">选择数据源</div>
      <b-select model-value="test_datasource" size="mini">
        <b-option value="test_datasource" label="探索空间"></b-option>
      </b-select>
    </div>
    <div class="datasource-table-search">
      <b-icon name="search" type="button"></b-icon>
      <input placeholder="搜索数据表/文件" type="text" value="">
      <b-icon name="redo" type="button"></b-icon>
    </div>
    <node-list
      :data="tableList"
      :all-node-title="allNodeTitle"
      :root-node="stateTree"
      :loading="tableListLoading"
      @start="handleDragStart"
      @end="handleDragEnd"
    ></node-list>
  </div>
</template>

<script>
import NodeList from '@/components/Service/LinkNode/node-list.vue'
import { computed, inject, ref } from 'vue'
import { getTableList } from '@/api/modules/bi-cube.api'
import { throwError } from '@/utils/util'

export default {
  name: 'cube-table-list',
  components: { NodeList },
  setup() {
    const tableListLoading = ref(false)
    const BiCube = inject('BiCube', {})
    const allNodeTitle = computed(() => BiCube.schemaStatus.flatState.value.map(v => v.node.title))
    const stateTree = computed(() => BiCube.schemaStatus.stateTree.value)
    const tableList = computed(() => BiCube.schemaStatus.tableList.value)

    const handleDragStart = () => {
      BiCube.schemaStatus.dragging.value = true
    }
    const handleDragEnd = () => {
      BiCube.schemaStatus.dragging.value = false
    }

    // 初始化数据表
    const initTable = async () => {
      tableListLoading.value = true
      try {
        BiCube.schemaStatus.tableList.value = await getTableList(BiCube.pageStatus.dataset.workspaceId)
      } catch (e) {
        throwError('cube-table-list/initTable')
      }
      tableListLoading.value = false
    }

    initTable()

    return {
      tableList,
      tableListLoading,
      allNodeTitle,
      stateTree,
      handleDragStart,
      handleDragEnd,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/var.styl"
.datasource-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  padding-bottom: 10px;
  padding-top: 20px;
  .datasource-switcher-wrapper {
    position: relative;
    padding: 0 10px;
    margin-bottom: 10px;
    .datasource-label {
      margin-bottom: 10px;
      opacity: .45;
    }

  }
  .datasource-table-search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    margin: 0 10px;
    > input {
      background-color: #fafafa;
      border: none;
      width: 185px;
      outline: none;
      height: 32px;
      padding: 4px 0 4px 5px;
      color: #262626;
      font-size: 12px;
      line-height: 32px;
    }
  }
  .datasource-content-list {
    color: #313132;
    padding: 12px 5px 5px;
    flex: 1 1 auto;
    overflow-y: auto;
    height: 0;
  }
}
</style>
