<template>
  <div class="g-field-wrap">
    <div class="g-field" :style="{ width: labelWidth }" v-if="label || $slots.label">
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
      :style="{ width: `calc(100% - ${label || $slots.label ? labelWidth : 0})` }"
    >
      <div class="content-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'GField',
})
defineProps({
  label: {
    type: String,
  },
  tooltip: String,
  labelWidth: {
    type: String,
    default: '84px',
  },
  flat: Boolean,
})
</script>

<style scoped>
.g-field-wrap {
  flex-wrap: wrap;
  display: flex;
  padding: 0 0 8px;
  .g-field {
    padding-left: 6px;
    height: 28px;
    line-height: 28px;
    .g-field-title,
    .g-field-tooltip-title {
      font-size: 14px;
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
      position: relative;
      min-height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      :deep(.bin-button-group) {
        display: flex;
        width: 100%;
        align-items: center;
        .bin-button {
          text-align: center;
          flex: 1;
        }
      }
      :deep(.bin-radio-group) {
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
        margin: 0 -4px;
      }
      :deep(.dv-gui) {
        padding: 0 4px;
        &.inline {
          width: 50%;
        }
        &:not(.inline):last-child {
          margin-bottom: 4px;
        }
      }
    }

    :deep(.g-input__caption) {
      display: block;
      width: 100%;
      font-size: 12px;
      height: 16px;
      margin-bottom: 8px;
      color: var(--s-text-color-2);
      padding: 0 1px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
