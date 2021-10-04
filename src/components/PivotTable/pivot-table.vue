<template>
  <div class="position-relative">
    <div class="pivot-table-loading" v-if="isDataLoading">
      <svg-loading name="loading04" style="width:80px;height:80px;"></svg-loading>
      <span>Loading...</span>
    </div>
    <template v-else>
      <div class="pivot-table-loading" v-if="isDataComputing">
        <svg-loading name="loading02" style="width:80px;height:80px;"></svg-loading>
        <span>Loading table values...</span>
      </div>
      <b-empty
        v-if="data.length === 0 || (rows.length === 0 && cols.length === 0) || (rows[0].length === 0 && cols[0].length === 0)"
      >
        {{ noDataWarningText }}
      </b-empty>
      <div v-else class="table-responsive">
        <table class="pivot-table pivot-table-bordered" :aria-busy="isDataLoading || isDataComputing">
          <!-- Table header -->
          <thead>
          <template v-for="({ colField, cols }, colFieldIndex) in tableHeader.colHeaderFields">
            <!-- Multiple slots -->
            <template v-if="colField.headerSlotNames">
              <tr
                v-for="(headerSlotName, headerSlotNameIndex) in colField.headerSlotNames"
                :key="`${colFieldIndex}-${headerSlotNameIndex}`">
                <!-- Top left dead zone -->
                <th
                  v-if="colFieldIndex === 0 && rowHeaderSize > 0 && headerSlotNameIndex === 0"
                  :colspan="rowHeaderSize"
                  :rowspan="colHeaderSize">
                </th>
                <!-- Column headers -->
                <th
                  v-for="(col, colIndex) in cols"
                  :key="`${colFieldIndex}-${headerSlotNameIndex}-${colIndex}`"
                  :colspan="col.colspan">
                  <slot :name="headerSlotName" :value="col.value">
                    Missing slot <code>{{ headerSlotName }}</code>
                  </slot>
                </th>
                <!-- Top right dead zone -->
                <th
                  v-if="colFieldIndex === 0 && rowFooterSize > 0 && headerSlotNameIndex === 0"
                  :colspan="rowFooterSize"
                  :rowspan="colHeaderSize">
                </th>
              </tr>
            </template>
            <!-- Single slot/no slot -->
            <tr v-else :key="colFieldIndex">
              <!-- Top left dead zone -->
              <th
                v-if="colFieldIndex === 0 && rowHeaderSize > 0"
                :colspan="rowHeaderSize"
                :rowspan="colHeaderSize">
              </th>
              <!-- Column headers -->
              <th
                v-for="(col, colIndex) in cols"
                :key="`${colFieldIndex}-${colIndex}`"
                :colspan="col.colspan">
                <slot v-if="colField.headerSlotName" :name="colField.headerSlotName" :value="col.value">
                  Missing slot <code>{{ colField.headerSlotName }}</code>
                </slot>
                <template v-else>
                  {{ col.value }}
                </template>
              </th>
              <!-- Top right dead zone -->
              <th
                v-if="colFieldIndex === 0 && rowFooterSize > 0"
                :colspan="rowFooterSize"
                :rowspan="colHeaderSize">
              </th>
            </tr>
          </template>
          </thead>
          <!-- Table body -->
          <tbody>
          <tr v-for="({ row, rowHeaderFields, rowFooterFields }, rowIndex) in tableRows" :key="rowIndex">
            <!-- Row headers -->
            <template v-for="(rowField, rowFieldIndex) in rowHeaderFields">
              <!-- Multiple slots -->
              <template v-if="rowField.headerSlotNames">
                <th
                  v-for="(headerSlotName, headerSlotNameIndex) in rowField.headerSlotNames"
                  :key="`header-${rowIndex}-${rowFieldIndex}-${headerSlotNameIndex}`"
                  :rowspan="rowField.rowspan"
                >
                  <slot :name="headerSlotName" :value="rowField.value">
                    Missing slot <code>{{ headerSlotName }}</code>
                  </slot>
                </th>
              </template>
              <!-- Single slot/no slot -->
              <th
                v-else
                :key="`header-${rowIndex}-${rowFieldIndex}`"
                :rowspan="rowField.rowspan"
              >
                <slot v-if="rowField.headerSlotName" :name="rowField.headerSlotName" :value="rowField.value">
                  Missing slot <code>{{ rowField.headerSlotName }}</code>
                </slot>
                <template v-else>{{ rowField.value }}</template>
              </th>
            </template>
            <!-- Values -->
            <td
              v-for="(col, colIndex) in sortedCols"
              :key="`value-${rowIndex}-${colIndex}`"
              class="text-right"
            >
              <slot v-if="$slots.value" name="value" :value="value(row, col)" :row="Object.values(row)"
                    :col="Object.values(col)" />
              <template v-else>{{ value(row, col) }}</template>
            </td>
            <!-- Row footers (if slots are provided) -->
            <template v-for="(rowField, rowFieldIndex) in rowFooterFields">
              <!-- Multiple slots -->
              <template v-if="rowField.footerSlotNames">
                <th
                  v-for="(footerSlotName, footerSlotNameIndex) in rowField.footerSlotNames"
                  :key="`footer-${rowIndex}-${rowFieldIndex}-${footerSlotNameIndex}`"
                  :rowspan="rowField.rowspan"
                >
                  <slot :name="footerSlotName" :value="rowField.value">
                    Missing slot <code>{{ footerSlotName }}</code>
                  </slot>
                </th>
              </template>
              <!-- Single slot/no slot -->
              <th
                v-else
                :key="`footer-${rowIndex}-${rowFieldIndex}`"
                :rowspan="rowField.rowspan"
              >
                <slot v-if="rowField.footerSlotName" :name="rowField.footerSlotName" :value="rowField.value">
                  Missing slot <code>{{ rowField.footerSlotName }}</code>
                </slot>
                <template v-else>{{ rowField.value }}</template>
              </th>
            </template>
          </tr>
          </tbody>
          <!-- Table footer -->
          <tfoot>
          <template v-for="({ colField, cols }, colFieldIndex) in tableFooter.colFooterFields">
            <!-- Multiple slots -->
            <template v-if="colField.footerSlotNames">
              <tr
                v-for="(footerSlotName, footerSlotNameIndex) in colField.footerSlotNames"
                :key="`${colFieldIndex}-${footerSlotNameIndex}`">
                <!-- Bottom left dead zone -->
                <th
                  v-if="colFieldIndex === 0 && rowHeaderSize > 0 && footerSlotNameIndex === 0"
                  :colspan="rowHeaderSize"
                  :rowspan="colFooterSize">
                </th>
                <!-- Column footers -->
                <th
                  v-for="(col, colIndex) in sortedCols"
                  :key="`${colFieldIndex}-${footerSlotNameIndex}-${colIndex}`"
                  :colspan="col.colspan">
                  <slot :name="footerSlotName" :value="col.value">
                    Missing slot <code>{{ footerSlotName }}</code>
                  </slot>
                </th>
                <!-- Bottom right dead zone -->
                <th
                  v-if="colFieldIndex === 0 && rowFooterSize > 0 && footerSlotNameIndex === 0"
                  :colspan="rowFooterSize"
                  :rowspan="colFooterSize">
                </th>
              </tr>
            </template>
            <!-- Single slot/no slot -->
            <tr v-else :key="colFieldIndex">
              <!-- Bottom left dead zone -->
              <th
                v-if="colFieldIndex === 0 && rowHeaderSize > 0"
                :colspan="rowHeaderSize"
                :rowspan="colFooterSize"
              ></th>
              <!-- Column footers -->
              <th
                v-for="(col, colIndex) in cols"
                :key="`${colFieldIndex}-${colIndex}`"
                :colspan="col.colspan"
              >
                <slot v-if="colField.footerSlotName" :name="colField.footerSlotName" :value="col.value">
                  Missing slot <code>{{ colField.footerSlotName }}</code>
                </slot>
                <template v-else>
                  {{ col.value }}
                </template>
              </th>
              <!-- Bottom right dead zone -->
              <th
                v-if="colFieldIndex === 0 && rowFooterSize > 0"
                :colspan="rowFooterSize"
                :rowspan="colFooterSize"
              ></th>
            </tr>
          </template>
          </tfoot>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import ManyKeysMap from 'many-keys-map'
import { firstBy } from 'thenby'
import naturalSort from 'javascript-natural-sort'
import isEqual from 'lodash-es/isEqual'
import { deepCopy } from '@/utils/util'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'

export default {
  name: 'pivot-table',
  components: { SvgLoading },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    rowFields: {
      type: Array,
      default: () => [],
    },
    colFields: {
      type: Array,
      default: () => [],
    },
    reducer: {
      type: Function,
      default: sum => sum + 1,
    },
    reducerInitialValue: {
      default: 0,
    },
    noDataWarningText: {
      type: String,
      default: 'No data to display.',
    },
    isDataLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      valuesMap: null,
      rows: [],
      cols: [],
      // Note: we don't use directly rowFields/colFields props to trigger table render when `updateValues` has finished
      internalRowFields: [],
      internalColFields: [],
      isDataComputing: false,
      computingInterval: null,
    }
  },
  computed: {
    // Sort rows/cols using a composed function built with thenBy.js
    sortedRows() {
      let composedSortFunction
      this.internalRowFields.forEach((rowField, rowFieldIndex) => {
        if (rowFieldIndex === 0) {
          composedSortFunction = firstBy(0, { cmp: rowField.sort || naturalSort })
        } else {
          composedSortFunction = composedSortFunction.thenBy(rowFieldIndex, { cmp: rowField.sort || naturalSort })
        }
      })

      return [...this.rows].sort(composedSortFunction)
    },
    sortedCols() {
      let composedSortFunction
      this.internalColFields.forEach((colField, colFieldIndex) => {
        if (colFieldIndex === 0) {
          composedSortFunction = firstBy(0, { cmp: colField.sort || naturalSort })
        } else {
          composedSortFunction = composedSortFunction.thenBy(colFieldIndex, { cmp: colField.sort || naturalSort })
        }
      })
      return [...this.cols].sort(composedSortFunction)
    },
    // Property to watch specific field changes
    fields() {
      return [
        [this.colFields, this.rowFields],
        [this.colFields.map(field => field.headerSlotNames), this.rowFields.map(field => field.headerSlotNames)],
        [this.colFields.map(field => field.valuesFiltered), this.rowFields.map(field => field.valuesFiltered)],
      ]
    },
    // Number of row header columns
    rowHeaderSize() {
      return this.internalRowFields.reduce((acc, rowField) => {
        if (rowField.showHeader === undefined || rowField.showHeader) {
          if (rowField.headerSlotNames) return acc + rowField.headerSlotNames.length
          else return acc + 1
        } else return acc
      }, 0)
    },
    // Number of row footer columns
    rowFooterSize() {
      return this.internalRowFields.reduce((acc, rowField) => {
        if (rowField.showFooter) {
          if (rowField.footerSlotNames) return acc + rowField.footerSlotNames.length
          else return acc + 1
        } else return acc
      }, 0)
    },
    // Number of col header rows
    colHeaderSize() {
      return this.internalColFields.reduce((acc, colField) => {
        if (colField.showHeader === undefined || colField.showHeader) {
          if (colField.headerSlotNames) return acc + colField.headerSlotNames.length
          else return acc + 1
        } else return acc
      }, 0)
    },
    // Number of col footer rows
    colFooterSize() {
      return this.internalColFields.reduce((acc, colField) => {
        if (colField.showFooter) {
          if (colField.footerSlotNames) return acc + colField.footerSlotNames.length
          else return acc + 1
        } else return acc
      }, 0)
    },
    // Table header
    tableHeader() {
      const colHeaderFields = this.internalColFields.map((colField, colFieldIndex) => {
        return {
          colField,
          cols: this.sortedCols.map((col, colIndex) => ({
            value: col[colFieldIndex],
            colspan: this.spanSize(this.sortedCols, colIndex, colFieldIndex),
          })).filter(colField => colField.colspan !== 0),
        }
      }).filter(({ colField }) => colField.showHeader === undefined || colField.showHeader)
      return {
        colHeaderFields,
      }
    },
    // Table footer
    tableFooter() {
      const colFooterFields = this.internalColFields.map((colField, colFieldIndex) => {
        return {
          colField,
          cols: this.sortedCols.map((col, colIndex) => ({
            value: col[colFieldIndex],
            colspan: this.spanSize(this.sortedCols, colIndex, colFieldIndex),
          })).filter(colField => colField.colspan !== 0),
        }
      }).filter(({ colField }) => colField.showFooter).reverse()
      return {
        colFooterFields,
      }
    },
    // Table rows with row headers/footers with rowspan
    tableRows() {
      return this.sortedRows.map((row, rowIndex) => {

        const rowHeaderFields = this.internalRowFields.map((rowField, rowFieldIndex) => ({
          ...rowField,
          value: row[rowFieldIndex],
          rowspan: this.spanSize(this.sortedRows, rowIndex, rowFieldIndex),
        })).filter(rowField => (rowField.showHeader === undefined || rowField.showHeader) && rowField.rowspan !== 0)

        const rowFooterFields = this.internalRowFields.map((rowField, rowFieldIndex) => ({
          ...rowField,
          value: row[rowFieldIndex],
          rowspan: this.spanSize(this.sortedRows, rowIndex, rowFieldIndex),
        })).filter(rowField => rowField.showFooter && rowField.rowspan !== 0).reverse()

        return {
          row,
          rowHeaderFields,
          rowFooterFields,
        }
      })
    },
  },
  methods: {
    // Get value from valuesMap
    value(row, col) {
      return this.valuesMap.get([...row, ...col]) || this.reducerInitialValue
    },
    // Get colspan/rowspan size
    spanSize(values, valueIndex, fieldIndex) {
      // If left value === current value
      // and top value === 0 (= still in the same top bracket)
      // The left td will take care of the display
      if (valueIndex > 0 &&
        values[valueIndex - 1][fieldIndex] === values[valueIndex][fieldIndex] &&
        (fieldIndex === 0 || (this.spanSize(values, valueIndex, fieldIndex - 1) === 0))) {
        return 0
      }

      // Otherwise, count entries on the right with the same value
      // But stop if the top value !== 0 (= the top bracket has changed)
      let size = 1
      let i = valueIndex
      while (
        i + 1 < values.length &&
        values[i + 1][fieldIndex] === values[i][fieldIndex] &&
        (fieldIndex === 0 || (i + 1 < values.length && this.spanSize(values, i + 1, fieldIndex - 1) === 0))
        ) {
        i++
        size++
      }

      return size
    },
    // Update internal fields only
    updateInternalFields() {
      this.internalRowFields = deepCopy(this.rowFields)
      this.internalColFields = deepCopy(this.colFields)
    },
    // Update rows/cols/valuesMap (optional)
    // @param {boolean} updateValuesMap
    updateValues(updateValuesMap = true) {
      this.isDataComputing = true
      // Start a task to avoid blocking the page
      clearInterval(this.computingInterval)
      this.computingInterval = setTimeout(() => {
        const rows = []
        const cols = []
        const valuesMap = new ManyKeysMap()

        const fields = [...this.rowFields, ...this.colFields]

        this.data.forEach(item => {
          const rowKey = []
          const colKey = []
          let filtered = false

          // Check if item passes fields value filters
          for (let field of fields) {
            if (field.valuesFiltered && !field.valuesFiltered.has(field.getter(item))) {
              filtered = true
              break
            }
          }

          // Build item rowKey/colKey if necessary
          if (!filtered || updateValuesMap) {
            this.rowFields.forEach(field => {
              rowKey.push(field.getter(item))
            })

            this.colFields.forEach(field => {
              colKey.push(field.getter(item))
            })
          }

          // Update rows/cols
          if (!filtered) {
            if (!rows.some(row => {
              return this.rowFields.every((rowField, index) => row[index] === rowKey[index])
            })) {
              rows.push(rowKey)
            }

            if (!cols.some(col => {
              return this.colFields.every((colField, index) => col[index] === colKey[index])
            })) {
              cols.push(colKey)
            }
          }

          // Update valuesMap
          if (updateValuesMap) {
            const key = [...rowKey, ...colKey]
            const previousValue = valuesMap.get(key) || deepCopy(this.reducerInitialValue)

            valuesMap.set(key, this.reducer(previousValue, item))
          }
        })

        this.rows = rows
        this.cols = cols
        if (updateValuesMap) this.valuesMap = valuesMap
        this.isDataComputing = false
        this.updateInternalFields()
      }, 0)
    },
  },
  watch: {
    // Check if fields changed
    fields: function (val, oldVal) {
      if (!isEqual(val[0], oldVal[0])) {
        // Fields were moved
        this.updateValues()
      } else if (!isEqual(val[1], oldVal[1])) {
        // Field header value filters changed
        this.updateInternalFields()
      } else if (!isEqual(val[2], oldVal[2])) {
        // Field header slot names changed
        this.updateValues(false)
      }
    },
    data: function () {
      this.updateValues()
    },
  },
  created() {
    this.updateValues()
  },
}
</script>

<style scoped lang="stylus">
.position-relative {
  position: relative;
  min-height: 150px;
  .pivot-table-loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(255, 255, 255, .8);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 99;
  }
  .table-responsive {
    display: block;
    width: 100%;
    overflow: auto;
  }
  table.pivot-table {
    width: 100%;
    color: #515a6e;
    border-collapse: collapse;
    th, td {
      min-width: 0;
      padding: 0 16px;
      height: 40px;
      box-sizing: border-box;
      text-align: left;
      text-overflow: ellipsis;
      vertical-align: middle;
      border: 1px solid #dee2e6;
    }
    thead {
      th {
        background-color: #fafafa;
        color: #17233d;
        font-weight: 600;
      }
    }
  }
}
</style>
