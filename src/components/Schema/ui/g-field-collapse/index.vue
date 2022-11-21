<template>
  <div class="g-field-toggle" :class="{ disable: toggle && !modelValue }">
    <div class="g-field-header" :class="[{ active: show }]" flex="cross:center" @click="toggleShow">
      <div class="bin-switch--mini" @click.stop style="width: 16px">
        <b-switch v-if="toggle" :model-value="modelValue" class="--mini" @change="toggleVisible" />
      </div>
      <div class="wrap-name">
        <span class="wrap-label">{{ label }}</span>
        <span class="wrap-right" v-if="$slots.add" @click.stop>
          <slot name="add"></slot>
        </span>
        <span class="wrap-arrow" :class="[{ show }]">
          <b-icon name="right" size="12"></b-icon>
        </span>
      </div>
    </div>
    <b-collapse-transition v-if="!modal">
      <div v-if="show" class="g-field-content">
        <slot></slot>
      </div>
    </b-collapse-transition>

    <g-modal-config v-else v-model="show" :title="label + '配置项'">
      <div v-if="show" class="g-field-content">
        <slot></slot>
      </div>
    </g-modal-config>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'GFieldCollapse',
  props: {
    label: {
      type: String,
      required: true,
    },
    defaultOpen: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
    toggle: {
      type: Boolean,
      default: false,
    },
    modal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, ctx) {
    const show = ref(props.defaultOpen)

    const toggleVisible = () => {
      show.value = !props.modelValue
      ctx.emit('update:modelValue', show.value)
      ctx.emit('change', show.value)
    }
    const toggleShow = () => {
      if (!props.modelValue) {
        return
      }
      show.value = !show.value
    }

    return {
      toggleVisible,
      show,
      toggleShow,
    }
  },
}
</script>

<style lang="stylus" scoped>
.g-field-toggle {
  position: relative;
  .g-field-header {
    padding-left: 6px;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    &.active {
      border-bottom: 1px solid var(--schema-color-border);
    }
    .wrap-name {
      height: 36px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .wrap-right {
        position: absolute;
        right: 30px;
        top: 8px;
      }
      .wrap-arrow {
        transition: .2s;
        position: absolute;
        right: 10px;
        top: 12px;
        &.show {
          transform: rotate(90deg)
        }
        &.simple {
          cursor: pointer;
        }
      }
      .wrap-label {
        line-height: 36px;
        padding: 0 6px;
        color: #fff;
      }
    }
  }
  .g-field-content {
    background-color: var(--schema-color-bg-deep);
    padding: 0;
    color: var(--schema-font-color);
  }
  &.disable {
    color: #647279;
    .g-field-header {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid var(--schema-color-border);
  }
}
</style>
