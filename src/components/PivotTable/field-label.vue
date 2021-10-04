<template>
  <div class="field-label-button">
    <b-button-group>
      <!-- Draggable button -->
      <b-button :type="variant" class="btn-draggable">
        <svg
          aria-hidden="true"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 270 512"
          class="svg-inline--fa fa-grip-vertical fa-w-10"
          style="position:relative;top:3px;width: 10px;height: 16px;"
        >
          <path
            fill="currentColor"
            d="M64 208c26.5 0 48 21.5 48 48s-21.5 48-48 48-48-21.5-48-48 21.5-48 48-48zM16 104c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48zm0 304c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z M204 208c26.5 0 48 21.5 48 48s-21.5 48 -48 48 -48 -21.5 -48 -48 21.5 -48 48 -48zM156 104c0 26.5 21.5 48 48 48s48 -21.5 48 -48 -21.5 -48 -48 -48 -48 21.5 -48 48zm0 304c0 26.5 21.5 48 48 48s48 -21.5 48 -48 -21.5 -48 -48 -48 -48 21.5 -48 48z"
            class=""
          ></path>
        </svg>
        <span style="margin-left: 8px;">
          <!--作用域插槽-->
          <slot v-if="field.labelSlotName" :name="field.labelSlotName">
            Missing slot <code>{{ field.labelSlotName }}</code>
          </slot>
          <template v-else>
            {{ field.label }}
          </template>
        </span>
      </b-button>
      <!-- Dropdown button -->
      <b-popper
        trigger="click"
        theme="light"
        :show-arrow="false"
        :offset="4"
        placement="bottom"
        transition="zoom-in-top"
        popper-class="bin-select__popper field-label-popper"
        :gpu-acceleration="false"
      >
        <template #trigger>
          <b-button
            :type="variant"
            icon="caret-down"
            style="padding: 0 6px;"
          ></b-button>
        </template>
        <!--选项-->
        <div style="width: 160px;">
          <!-- Headers filter -->
          <template v-if="field.headerAttributeFilter">
            <h6 class="dropdown-header">Attributes</h6>
            <div class="dropdown-list">
              <div v-for="(header, index) in field.headers" :key="index" style="padding: 2px 10px;">
                <b-checkbox v-model="header.checked">{{ header.label }}</b-checkbox>
              </div>
            </div>
          </template>
          <b-divider style="margin: 8px 0;" v-if="field.headerAttributeFilter && field.valueFilter"></b-divider>
          <!-- Values filter -->
          <template v-if="field.valueFilter">
            <h6 class="dropdown-header">Values</h6>
            <div style="border-bottom: 1px solid #e9e9e9;padding: 0 10px 2px;">
              <b-checkbox
                :indeterminate="indeterminate"
                v-model="checkAll"
                @change="handleCheckAll">全选
              </b-checkbox>
            </div>
            <div class="dropdown-list">
              <div v-for="(item, index) in fieldValues" :key="index" style="padding: 2px 10px;">
                <b-checkbox v-model="item.checked" @change="handleCheckChange">
                  <slot v-if="field.valueFilterSlotName" :name="field.valueFilterSlotName" :value="item.value">
                    Missing slot <code>{{ field.valueFilterSlotName }}</code>
                  </slot>
                  <template v-else>
                    {{ item.value }}
                  </template>
                </b-checkbox>
              </div>
            </div>
          </template>
        </div>
      </b-popper>
    </b-button-group>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'field-label',
  props: {
    fieldValues: {
      type: Array,
      default: () => ([]),
    },
    field: {
      type: Object,
      default: () => ({
        headers: {},
      }),
    },
    variant: {
      type: String,
      default: 'primary',
    },
  },
  setup(props) {
    const indeterminate = ref(true)
    const checkAll = ref(false)

    function handleCheckAll(val) {
      props.fieldValues.forEach(item => {
        item.checked = val
      })
      indeterminate.value = false
    }

    function handleCheckChange() {
      isCheckAll()
    }

    // 判断是否全选了
    function isCheckAll() {
      const checkCount = props.fieldValues.reduce((acc, item) => item.checked ? acc += 1 : acc, 0)
      const allCount = props.fieldValues.length
      if (checkCount === allCount) {
        indeterminate.value = false
        checkAll.value = true
      } else if (checkCount > 0) {
        indeterminate.value = true
        checkAll.value = false
      } else {
        indeterminate.value = false
        checkAll.value = false
      }
    }

    watch(() => props.fieldValues, () => {
      isCheckAll()
    }, { immediate: true })
    return {
      indeterminate,
      checkAll,
      handleCheckAll,
      handleCheckChange,
    }
  },
}
</script>

<style lang="stylus">
.field-label-button {
  display: inline-flex;
  .btn-draggable {
    padding: 0 10px;
    cursor: move;
  }
}
.field-label-popper {
  .dropdown-header {
    display: block;
    padding: 0 10px 4px;
    margin-bottom: 0;
    font-size: 14px;
    color: #6c757d;
    white-space: nowrap;
  }
}
</style>
