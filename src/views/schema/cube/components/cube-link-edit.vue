<template>
  <b-drawer
    v-model="visible"
    title="编辑关联关系"
    inner
    :width="800"
    :styles="{padding:0}"
  >
    <div flex="box:mean" class="table-config-wrap">
      <div class="node-table-info">
        <div class="table-search-label mb-5" v-if="tableLabel">{{ parentTableInfo.tableName }}</div>
        <div class="table-search-label mb-8" v-if="parentTableLabel">{{ parentTableLabel }}</div>
        <b-table
          size="small"
          :columns="columns"
          :data="parentTableInfo.fields"
          :max-height="240"
          @selection-change="setParentSelections"
        >
          <template #field="{row}">
            <div class="field-label" flex="cross:center">
              <field-type-icon :type="row.dataType"></field-type-icon>
              <span>{{ row.field }}</span>
            </div>
          </template>
        </b-table>
      </div>
      <div class="node-table-info">
        <div class="table-search-label mb-5" v-if="tableLabel">{{ tableInfo.tableName }}</div>
        <div class="table-search-label mb-8" v-if="tableLabel">{{ tableLabel }}</div>
        <b-table
          size="small"
          :columns="columns"
          :data="tableInfo.fields"
          :max-height="240"
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
    </div>
    <div class="table-join-keys">
      <div class="join-keys-header">
        <div>数据关联</div>
        <div class="right">
          <b-space>
            <b-select v-model="tableInfo.joinType" size="mini" style="width: 110px;">
              <template #prefix>
                <join-type
                  :size="6"
                  :type="tableInfo.joinType"
                  style="position:relative;top:-2px;left: 4px;background-color: transparent;"
                ></join-type>
              </template>
              <b-option
                v-for="(val,key) in JOIN_TYPE"
                :key="key"
                :value="key"
                :label="val.label"
              >
                <b-space>
                  <join-type :size="6" :type="key" style="background-color: transparent;"></join-type>
                  <span>{{ val.label }}</span>
                </b-space>
              </b-option>
            </b-select>
            <b-button
              type="primary"
              transparent
              size="mini"
              icon="plus"
              @click="addJoinKey"
            >添加关联字段
            </b-button>
          </b-space>
        </div>
      </div>
      <div class="table-name-wrapper">
        <div class="table-name" :title="parentTableInfo.tableName">{{ parentTableInfo.tableName }}</div>
        <div class="table-name" :title="tableInfo.tableName">{{ tableInfo.tableName }}</div>
        <div class="link-operation">操作</div>
      </div>
      <div class="fields-key-wrapper">
        <div
          class="fields-key-line"
          v-for="(item,index) in tableInfo.joinKeys"
          :key="index"
        >
          <b-select
            v-model="tableInfo.joinKeys[index].sourceKey"
            size="small"
            style="width: 300px;"
          >
            <b-option
              v-for="field in parentTableInfo.fields"
              :key="field.field"
              :value="field.field"
              :label="field.field+'('+field.title+')'"
            >
              <span>{{ field.field }}</span>
              <span style="float:right;color:#ccc">{{ field.title }}</span>
            </b-option>
          </b-select>
          <join-link style="width: 36px;height:48px;font-size: 36px;"></join-link>
          <b-select
            v-model="tableInfo.joinKeys[index].targetKey"
            size="small"
            style="width: 300px;"
          >
            <b-option
              v-for="field in tableInfo.fields"
              :key="field.field"
              :value="field.field"
              :label="field.field+'('+field.title+')'"
            >
              <span>{{ field.field }}</span>
              <span style="float:right;color:#ccc">{{ field.title }}</span>
            </b-option>
          </b-select>
          <div class="field-delete">
            <b-button type="text" text-color="info" :disabled="tableInfo.joinKeys.length<=1" @click="removeKey(index)">
              <b-icon name="delete" size="18"></b-icon>
            </b-button>
          </div>
        </div>
      </div>
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
import { JOIN_TYPE } from '@/components/Service/LinkNode/node-util'
import FieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'
import JoinType from '@/components/Service/LinkNode/join-type.vue'
import JoinLink from '@/components/Service/LinkNode/join-link.vue'

export default {
  name: 'cube-link-edit',
  components: { JoinLink, JoinType, FieldTypeIcon },
  emits: ['save'],
  setup(props, { emit }) {
    const visible = ref(false)

    const status = reactive({
      dataset: {},

      tableInfo: {},
      selections: [],

      parentTableInfo: {},
      parentSelections: [],
    })

    const tableLabel = computed(() => {
      const fields = status.tableInfo.fields || []
      return isEmpty(fields) ? '' : `字段选择(${status.selections.length}/${fields.length})`
    })
    const parentTableLabel = computed(() => {
      const fields = status.parentTableInfo.fields || []
      return isEmpty(fields) ? '' : `字段选择(${status.parentSelections.length}/${fields.length})`
    })

    const open = (dataset, node, parentNode) => {
      fetchTable(dataset, node, parentNode)
      setSelections()
      setParentSelections()
      visible.value = true
    }

    const handleSave = () => {
      // 判断父节点表是否勾选了一个字段
      const parentSelected = status.parentSelections
      if (parentSelected.length === 0) {
        Message.error(`${status.parentTableInfo.tableName} 至少需要选择一个有效字段！`)
        return
      }
      // 判断当前节点表是否勾选了一个字段
      const selected = status.selections
      if (selected.length === 0) {
        Message.error(`${status.tableInfo.tableName} 至少需要选择一个有效字段！`)
        return
      }
      // 判断joinKeys，是否有一条数据且每一条都包含值
      if (status.tableInfo.joinKeys.length === 0) {
        Message.error('至少需要一个关联关系！')
        return
      }
      // 判断joinKeys，是否有一条数据且每一条都包含值
      if (status.tableInfo.joinKeys.length) {
        const emptyJoin = status.tableInfo.joinKeys.find(i => isEmpty(i.sourceKey) || isEmpty(i.targetKey))
        if (emptyJoin) {
          Message.error('关联的字段不能为空！')
          return
        }
      }
      // 提交保存
      emit('save', parentSelected.map(v => v.field), selected.map(v => v.field), status.tableInfo)
      visible.value = false
    }

    const fetchTable = (dataset, node, parentNode) => {
      status.dataset = deepCopy(dataset)
      // 当前node表节点信息
      status.tableInfo = deepCopy(node)
      // 父级node表节点信息
      status.parentTableInfo = deepCopy(parentNode)
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
    // 设置已选项
    const setParentSelections = (selections) => {
      if (selections) {
        status.parentSelections = deepCopy(selections)
      } else {
        const fields = status.parentTableInfo.fields || []
        status.parentSelections = deepCopy(fields.filter(i => i._checked))
      }
    }

    const addJoinKey = () => {
      status.tableInfo.joinKeys.push({ sourceKey: '', targetKey: '' })
    }

    const removeKey = (index) => {
      status.tableInfo.joinKeys.splice(index, 1)
    }

    return {
      JOIN_TYPE,
      visible,
      tableLabel,
      parentTableLabel,
      ...toRefs(status),
      columns: [
        { type: 'selection', width: 40, align: 'center' },
        { title: '物理字段名', slot: 'field', tooltip: true },
        { title: '备注', key: 'title', tooltip: true },
      ],
      setSelections,
      setParentSelections,
      open,
      handleSave,
      addJoinKey,
      removeKey,
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
.table-config-wrap {
  padding: 20px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  .node-table-info {
    padding: 0 10px;
    .field-label {
      > i {
        color: $color-primary;
        margin-right: 4px;
      }
    }
  }
}
.table-join-keys {
  padding: 20px;
  .join-keys-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    font-size: 14px;
    :deep(.bin-input) {
      line-height: 24px;
      border: none;
      padding: 0 8px;
      cursor: pointer;
      &:focus {
        box-shadow: none;
      }
    }
  }
  .table-name-wrapper {
    display: flex;
    height: 36px;
    align-items: center;
    opacity: .8;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    color: rgba(0, 0, 0, .65);
    .table-name {
      flex-basis: 300px;
      margin-right: 36px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .link-operation {
      flex: 1;
      text-align: right;
    }
  }
  .fields-key-line {
    display: flex;
    align-items: center;
    padding: 12px 0;
    height: 50px;
    :deep(.bin-input) {
      font-size: 12px;
    }
    .field-delete {
      margin-left: 20px;
      padding-right: 5px;
      flex-grow: 1;
      cursor: pointer;
      display: inline-flex;
      justify-content: flex-end;
    }

  }
}
</style>
