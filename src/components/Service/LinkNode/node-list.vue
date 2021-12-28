<template>
  <div class="datasource-content-list" id="table-drag" v-loading="loading" v-no-data="data.length===0">
    <div
      v-for="item in data"
      :key="item.id"
      class="datasource-content-item"
      :class="{'has-used':allNodeTitle.includes(item.title)}"
      draggable="true"
      @dragstart="onDrag($event,item)"
      @dragend="onDragEnd"
    >
      <b-icon name="file-text" size="16"></b-icon>
      <span class="title" :title="item.tableName">{{ item.title || item.tableName }}</span>
      <b-icon name="info-circle" type="button" @click="handleClick(item)"></b-icon>
    </div>

    <!--字段详情-->
    <b-modal v-model="visible">
      <div class="table-info">
        <div class="table-info-header">{{ current.tableName }}</div>
        <div class="table-info-title">{{ current.title }}</div>
        <div class="fields-number">包含字段{{ current.fields.length }}</div>
        <b-divider style="margin: 4px 0 16px;"></b-divider>
        <div class="table-info-fields">
          <div
            class="table-info-field-line"
            v-for="field in current.fields"
            :key="field.field"
          >
            <div class="table-field-icon">
              <field-type-icon :type="field.dataType"></field-type-icon>
            </div>
            <div class="table-field-name"><span>{{ field.field }}</span></div>
            <div class="table-field-title"><span>{{ field.title }}</span></div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { Message } from 'bin-ui-next'
import { reactive, toRefs } from 'vue'
import { isEmpty, deepCopy } from '@/utils/util'
import FieldTypeIcon from '@/components/Service/LinkNode/field-type-icon.vue'

export default {
  name: 'node-list',
  components: { FieldTypeIcon },
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    allNodeTitle: {
      type: Array,
      default: () => ([]),
    },
    rootNode: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
    },
  },
  emits: ['start', 'end'],
  setup(props, { emit }) {
    const states = reactive({
      visible: false,
      current: {},
    })

    // 表格拖拽开始
    function onDrag(e, item) {
      if (props.rootNode.title === item.title) {
        Message.warning('当前数据表已经存在，请不要重复关联！')
        return
      }
      e.dataTransfer.setData('id', item.id)
      emit('start')
    }

    function onDragEnd() {
      emit('end')
    }

    // 表格点击事件
    function handleClick(table) {
      if (!isEmpty(table.fields)) {
        states.visible = true
        states.current = deepCopy(table)
      }
    }

    return {
      ...toRefs(states),
      onDrag,
      onDragEnd,
      handleClick,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
@import "../../../assets/stylus/base/mixins.styl"
.datasource-content-list {
  position: relative;
}
.datasource-content-item {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px
  padding: 5px;
  cursor: pointer;
  overflow: hidden;
  padding-left: 8px;
  color: $color-text-primary;
  .b-icon-file-text {
    display: inline-block;
    height: 18px;
    margin-right: 4px;
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.5;
    flex: 1;
  }
  .b-icon-info-circle {
    position: absolute;
    right: 5px;
    top: 6px;
    display: none;
    &:hover {
      color: getColor();
    }
  }
  &.has-used {
    .b-icon-file-text {
      color: getColor();
    }
  }
  &:hover {
    background: #ededed;
    .b-icon-info-circle {
      display: block;
    }
  }
}
.table-info {
  .table-info-header {
    margin-bottom: 3px;
  }
  .table-info-title {
    opacity: .5;
  }
  .fields-number {
    opacity: .6;
  }
  .table-info-fields {
    max-height: 400px;
    min-height: 160px;
    overflow: auto;
    .table-info-field-line {
      display: flex;
      align-items: center;
      height: 30px;
    }
    .table-field-icon {
      margin-right: 8px;
      display: flex;
      padding-top: 1px;
      color: getColor();
    }
    .table-field-name, .table-field-title {
      flex-basis: 200px;
      color: rgba(0, 0, 0, .85);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .table-field-title {
      color: #969696;
    }
  }
}
</style>
