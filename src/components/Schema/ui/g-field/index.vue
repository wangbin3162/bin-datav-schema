<template>
  <div class="g-field-wrap">
    <div class="g-field" :style="{ width: labelWidth }">
      <slot name="label">
        <template v-if="tooltip">
          <label class="g-field-tooltip-title" :title="tooltip">
            {{ label }}
          </label>
        </template>
        <label v-else class="g-field-title" :title="label">
          {{ label }}
        </label>
      </slot>
    </div>
    <div
      class="g-field-container"
      :class="{ 'is-flat': flat }"
      :style="{ width: `calc(100% - ${labelWidth})` }"
    >
      <div class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'g-field',
  props: {
    label: {
      type: String,
      required: true,
    },
    tooltip: String,
    labelWidth: {
      type: String,
      default: '90px',
    },
    flat: Boolean,
  },
}
</script>

<style scoped lang="stylus">
.g-field-wrap {
  flex-wrap: wrap;
  display: flex;
  padding: 4px 10px 4px 8px;
  .g-field {
    padding-left: 20px;
    height: 28px;
    line-height: 28px;
    .g-field-title, .g-field-tooltip-title {
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .g-field-tooltip-title {
      cursor: help;
      text-decoration: underline dotted;
    }
  }
  &:first-child {
    padding-top: 16px;
  }
  &:last-child {
    padding-bottom: 16px;
  }
  .g-field-container {
    width: 100%;
    .content-inner {
      min-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      :deep(.bin-button-group){
        display: flex;
        width: 100%;
        align-items: center;
        .bin-button {
          text-align: center;
          flex: 1;
        }
      }
      :deep(.bin-radio-group){
        display: flex;
        width: 100%;
        align-items: center;
        .bin-radio {
          text-align: center;
          flex: 1;
        }
      }
    }
    :deep(.dv-gui) {
      width: 100%;
    }
    &.is-flat {
      .content-inner {
        margin: 0 -2px;
      }
      :deep(.dv-gui) {
        padding: 0 2px;
        &.inline {
          width: 50%;
        }
        &:not(.inline):last-child{
          margin-bottom: 4px;
        }
      }
    }

    // 内部组件标签的样式
    :deep(.g-input__caption) {
      display: block;
      width: 100%;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
      color: var(--schema-ui-color);
      padding: 0 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
