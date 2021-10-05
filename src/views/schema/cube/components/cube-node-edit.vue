<template>
  <b-drawer
    v-model="visible"
    inner
    :z-index="10"
    :width="400"
    :styles="{padding:0}"
  >
    <div class="node-header">
      <div class="table-info-name t-ellipsis">{{ tableInfo.tableName }}</div>
      <div class="table-info-ds t-ellipsis">数据源：{{ dataset.datasourceName }}</div>
    </div>
    <div class="node-table-info">
      <div class="table-search-label mb-8" v-if="tableLabel">{{ tableLabel }}</div>
      <b-table
        size="small"
        :columns="columns"
        :data="tableInfo.fields"
        :max-height="400"
        @selection-change="setSelections"
      >
        <template #field="{row}">
          <div class="field-label" flex="cross:center">
            <field-type-icon :type="row.dataType"></field-type-icon>
            <span>{{ row.field }}</span>
          </div>
        </template>
      </b-table>
    </div>
    <template #footer>
      <b-button type="primary" size="small" transparent style="width: 120px;" @click="visible = false">取消</b-button>
      <b-button type="primary" size="small" style="width: 120px;" @click="handleSave">确定</b-button>
    </template>
  </b-drawer>
</template>

<script>
import { computed, reactive, ref, toRefs } from 'vue'
import { Message } from 'bin-ui-next'
import { deepCopy, isEmpty } from '@/utils/util'
import FieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'

export default {
  name: 'cube-node-edit',
  components: { FieldTypeIcon },
  emits: ['save'],
  setup(props, { emit }) {
    const visible = ref(false)

    const status = reactive({
      dataset: {},
      tableInfo: {},
      selections: [],
    })

    const tableLabel = computed(() => {
      const fields = status.tableInfo.fields || []
      return isEmpty(fields) ? '' : `字段选择(${status.selections.length}/${fields.length})`
    })

    const open = (dataset, node) => {
      fetchTable(dataset, node)
      setSelections()
      visible.value = true
    }

    const handleSave = () => {
      const selected = status.selections
      if (selected.length === 0) {
        Message.error({ message: '请至少选择一个有效字段！', zIndex: 2500 })
        return
      }
      emit('save', selected.map(v => v.field))
      visible.value = false
    }

    const fetchTable = (dataset, node) => {
      status.dataset = deepCopy(dataset)
      status.tableInfo = deepCopy(node)
    }

    // 设置已选项
    const setSelections = (selections) => {
      if (selections) {
        status.selections = deepCopy(selections)
      } else {
        const fields = status.tableInfo.fields || []
        status.selections = deepCopy(fields.filter(i => i._checked))
      }
    }

    return {
      visible,
      tableLabel,
      ...toRefs(status),
      columns: [
        { type: 'selection', width: 40, align: 'center' },
        { title: '物理字段名', slot: 'field', tooltip: true },
        { title: '备注', key: 'title', tooltip: true },
      ],
      setSelections,
      open,
      handleSave,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/var.styl"
.node-header {
  padding: 16px 20px 12px;
  height: 88px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  .table-info-name {
    font-size: 18px;
  }
  .table-info-ds {
    font-size: 12px;
  }
}
.node-table-info {
  padding: 20px;
  height: calc(100% - 88px);
  overflow-y: auto;
  .field-label {
    > i {
      color: var(--bin-color-primary);
      margin-right: 4px;
    }
  }
}
</style>
