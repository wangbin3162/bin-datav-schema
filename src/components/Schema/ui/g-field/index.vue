<template>
  <div class="g-field-wp">
    <div class="g-field" :style="{width:labelWidth}">
      <slot name="label">
        <template v-if="tooltip">
          <label class="g-field-title-with-description" :title="tooltip">
            {{ label }}
          </label>
        </template>
        <label v-else class="g-field-title" :title="label">
          {{ label }}
        </label>
      </slot>
    </div>
    <div class="g-field-container" :class="{ 'is-flat': flat }" :style="{width:`calc(100% - ${labelWidth})`}">
      <slot></slot>
      <span v-if="caption" class="g-field-caption" :title="caption">
        {{ caption }}
      </span>
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
    caption: String,
    labelWidth: {
      type: String,
      default: '110px',
    },
    flat: Boolean,
  },
  setup(props) {
    return {}
  },
}
</script>

<style scoped lang="stylus">
.g-field-wp {
  flex-wrap: wrap;
  display: flex;
  padding: 4px 4px 4px 8px;
  .g-field {
    padding-left: 20px;
    .g-field-title, .g-field-title-with-description {
      font-size: 12px;
      height: 28px;
      line-height: 28px;
      font-weight: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .g-field-title-with-description {
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
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-right: 8px;
    &.is-flat {
      padding-right: 0;
    }

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
