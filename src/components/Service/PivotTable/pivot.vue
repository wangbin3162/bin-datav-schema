<template>
  <div class="bin-pivot-table">
    <!-- Top row -->
    <div class="top-row">
      <div class="left-col">
        <b-button type="primary" animation-type="waves" @click="toggleShowSettings">{{ hideSettingsText }}</b-button>
      </div>
      <div class="right-col" v-if="showSettings">
        <div class="drag-area" :class="dragAreaClass">
          <div class="drag-area-title">{{ availableFieldsLabelText }}</div>
          <draggable
            v-model="internal.availableFieldKeys"
            class="drag-area-zone"
            item-key="key"
            v-bind="{animation:200,group:'fields',ghostClass:'sortable-ghost',handle:'.btn-draggable'}"
            @start="dragStart"
            @end="dragEnd"
          >
            <template #item="{element}">
              <div class="field">
                <field-label :field-values="fieldValues[element]" :field="fieldsWithValues[element]" variant="warning">
                  <!-- pass down scoped slots -->
                  <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                  </template>
                </field-label>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <!--Top columns--->
    <div class="top-row mt-16" v-if="showSettings">
      <!-- Top left zone -->
      <div class="left-col"></div>
      <!-- Column fields -->
      <div class="right-col">
        <div class="drag-area border-primary" :class="dragAreaClass">
          <div class="drag-area-title">{{ colsLabelText }}</div>
          <draggable
            v-model="internal.colFieldKeys"
            class="drag-area-zone"
            item-key="key"
            v-bind="{animation:200,group:'fields',ghostClass:'sortable-ghost',handle:'.btn-draggable'}"
            @start="dragStart"
            @end="dragEnd"
          >
            <template #item="{element}">
              <div class="field">
                <field-label :field-values="fieldValues[element]" :field="fieldsWithValues[element]">
                  <!-- pass down scoped slots -->
                  <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                  </template>
                </field-label>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    <!--Bottom Table-->
    <div class="bottom-row" flex>
      <!-- Row fields -->
      <div v-if="showSettings" class="left-col">
        <div class="drag-area border-primary" :class="dragAreaClass">
          <div class="drag-area-title">{{ rowsLabelText }}</div>
          <draggable
            v-model="internal.rowFieldKeys"
            class="drag-area-zone"
            item-key="key"
            v-bind="{animation:200,group:'fields',ghostClass:'sortable-ghost',handle:'.btn-draggable'}"
            @start="dragStart"
            @end="dragEnd"
          >
            <template #item="{element}">
              <div class="field">
                <field-label :field-values="fieldValues[element]" :field="fieldsWithValues[element]">
                  <!-- pass down scoped slots -->
                  <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
                    <slot :name="slot" v-bind="scope" />
                  </template>
                </field-label>
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <!-- Table -->
      <div class="right-col" :style="tableWrapperStyle">
        <pivot-table
          :data="data"
          :row-fields="rowFields"
          :col-fields="colFields"
          :reducer="reducer"
          :reducer-initial-value="reducerInitialValue"
          :no-data-warning-text="noDataWarningText"
          :is-data-loading="isDataLoading"
        >
          <!-- pass down scoped slots -->
          <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </pivot-table>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { computed, reactive, ref, watch } from 'vue'
import naturalSort from 'javascript-natural-sort'
import FieldLabel from '@/components/Service/PivotTable/field-label.vue'
import PivotTable from '@/components/Service/PivotTable/pivot-table.vue'

export default {
  name: 'pivot',
  components: { PivotTable, draggable, FieldLabel },
  props: {
    // 数据
    data: {
      type: Array,
      default: () => [],
    },
    // 全部字段配置
    fields: {
      type: Array,
      default: () => [],
    },
    // 可用的字段key
    availableFieldKeys: {
      type: Array,
      default: () => [],
    },
    // 行字段key
    rowFieldKeys: {
      type: Array,
      default: () => [],
    },
    // 列字段key
    colFieldKeys: {
      type: Array,
      default: () => [],
    },
    // 累加器
    reducer: {
      type: Function,
      default: sum => sum + 1,
    },
    // 累加初始值
    reducerInitialValue: {
      default: 0,
    },
    // 默认显示配置设置
    defaultShowSettings: {
      type: Boolean,
      default: true,
    },
    // 可用项标题文字
    availableFieldsLabelText: {
      type: String,
      default: 'Available fields',
    },
    // 列项标题文字
    colsLabelText: {
      type: String,
      default: 'Columns',
    },
    // 行项标题文字
    rowsLabelText: {
      type: String,
      default: 'Rows',
    },
    // 隐藏设置按钮文字
    hideSettingsText: {
      type: String,
      default: 'Hide settings',
    },
    // 显示设置按钮文字
    showSettingsText: {
      type: String,
      default: 'Show settings',
    },
    // 没有数据文字
    noDataWarningText: {
      type: String,
      default: 'No data to display.',
    },
    // 数据加载loading
    isDataLoading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const internal = reactive({
      availableFieldKeys: props.availableFieldKeys,
      rowFieldKeys: props.rowFieldKeys,
      colFieldKeys: props.colFieldKeys,
    })
    // *********** setting *********** //
    const showSettings = ref(props.defaultShowSettings)

    function toggleShowSettings() {
      showSettings.value = !showSettings.value
    }

    // *********** fields *********** //
    const fieldValues = ref({})
    const fieldsWithValues = computed(() => {
      const fields = props.fields
      const widthValues = {}
      fields.forEach(field => {
        widthValues[field.key] = field
      })
      // Add valuesSet
      const valueFilterableFields = fields.filter(field => field.valueFilter)
      // Create valuesSet for each value filterable field
      valueFilterableFields.forEach(field => {
        widthValues[field.key].valuesSet = new Set()
      })
      // Iterate on data once
      props.data.forEach(item => {
        valueFilterableFields.forEach(field => {
          widthValues[field.key].valuesSet.add(field.getter(item))
        })
      })
      // Creates values sorted from valuesSet
      valueFilterableFields.forEach(field => {
        widthValues[field.key].values = Array.from(widthValues[field.key].valuesSet).sort(field.sort || naturalSort)
      })
      return widthValues
    })

    // Update fieldValues
    function updateFieldValues() {
      for (let [key, field] of Object.entries(fieldsWithValues.value)) {
        if (field.valueFilter) {
          fieldValues.value[key] = []
          field.values.forEach(value => {
            fieldValues.value[key].push({ value, checked: true })
          })
        }
      }
    }

    // *********** drag *********** //
    const dragging = ref(false)
    const dragAreaClass = computed(() => dragging.value ? 'drag-area-highlight' : null)

    function dragStart() {
      dragging.value = true
    }

    function dragEnd() {
      dragging.value = false
    }

    // *********** table *********** //
    const tableWrapperStyle = computed(() => ({ width: showSettings.value ? 'calc(100% - 200px - 2rem)' : '100%' }))

    // field value过滤去重后的值，返回{key,set()}
    const valuesFiltered = computed(() => {
      const obj = {}
      for (let [key, valuesObject] of Object.entries(fieldValues.value)) {
        obj[key] = new Set()
        valuesObject.forEach(valueObject => {
          if (valueObject.checked) {
            obj[key].add(valueObject.value)
          }
        })
      }
      return obj
    })
    const rowFields = computed(() => {
      const _rows = []

      internal.rowFieldKeys.forEach(key => {
        const field = props.fields.find(field => field.key === key)
        // Generate headerSlotNames from headers
        if (field.headers) {
          field.headerSlotNames = field.headers
            .filter(header => header.checked)
            .map(header => header.slotName)
        }

        // Add selected values
        if (field.valueFilter) {
          field.valuesFiltered = valuesFiltered.value[field.key]
        }
        _rows.push(field)
      })

      return _rows
    })
    const colFields = computed(() => {
      const _cols = []

      internal.colFieldKeys.forEach(key => {
        const field = props.fields.find(field => field.key === key)

        // Generate headerSlotNames from headers
        if (field.headers) {
          field.headerSlotNames = field.headers
            .filter(header => header.checked)
            .map(header => header.slotName)
        }

        // Add selected values
        if (field.valueFilter) {
          field.valuesFiltered = valuesFiltered.value[field.key]
        }

        _cols.push(field)
      })

      return _cols
    })


    watch(() => props.fields, val => {
      // 过滤是否需要转换value的字段并初始化
      val.filter(field => field.valueFilter).forEach(field => {
        fieldValues.value[field.key] = {}
      })
      updateFieldValues()
    }, { immediate: true })

    watch(() => props.data, () => {
      updateFieldValues()
    })

    return {
      internal,
      // *********** setting *********** //
      showSettings,
      toggleShowSettings,
      // *********** fields *********** //
      fieldValues,
      fieldsWithValues,
      // *********** drag *********** //
      dragging,
      dragAreaClass,
      dragStart,
      dragEnd,
      // *********** table *********** //
      tableWrapperStyle,
      rowFields,
      colFields,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/mixins.styl"
.top-row, .bottom-row {
  display: flex;
  .left-col {
    width: 220px;
    padding-right: 16px;
  }
  .right-col {
    width: calc(100% - 200px);
  }
  .drag-area {
    border: 1px dashed #ccc;
    padding: 14px;
    transition: background-color .3s;
    &.border-primary {
      border-color: getColor();
    }
    &-title {
      line-height: 1;
      margin-bottom: 10px;
    }
    &-highlight {
      background-color: #f3f3f3;
    }
    &-zone {
      min-width: 10rem;
      min-height: 42px;
      .field {
        display: inline-flex;
        align-items: center;
        min-height: 42px;
        margin-right: 10px;
      }
    }
  }
  .field {
    position: relative;
  }
}
.bottom-row {
  display: flex;
  margin-top: 16px;
  .left-col {
    width: 220px;
    padding-right: 16px;
  }
  .right-col {
    width: calc(100% - 200px);
  }
}

.sortable-ghost {
  opacity: 0.4;
}

</style>
