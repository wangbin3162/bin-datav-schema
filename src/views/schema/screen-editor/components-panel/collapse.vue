<template>
  <div class="collapse-group">
    <div class="header" :class="[{ active: show }]" flex="cross:center" @click="toggleShow">
      <div class="name">
        <span class="wrap-label">{{ title }}</span>
        <span class="wrap-arrow" :class="[{ show }]">
          <b-icon name="right" size="12"></b-icon>
        </span>
      </div>
    </div>
    <b-collapse-transition>
      <div v-if="show" class="content">
        <slot></slot>
      </div>
    </b-collapse-transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  defaultOpen: {
    type: Boolean,
    default: true,
  },
})
const show = ref(props.defaultOpen)

const toggleShow = () => {
  show.value = !show.value
}
</script>

<style lang="stylus" scoped>
.collapse-group {
  position: relative;
  .header {
    padding-left: 6px;
    border-bottom: 1px solid transparent;
    cursor: pointer;
    &.active {
      border-bottom: 1px solid var(--schema-color-border);
    }
    .name {
      height: 32px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .wrap-arrow {
        transition: .2s;
        position: absolute;
        right: 10px;
        top: 9px;
        &.show {
          transform: rotate(90deg)
        }
        &.simple {
          cursor: pointer;
        }
      }
      .wrap-label {
        position: relative;
        line-height: 32px;
        padding-left: 10px;
        color: #fff;
        &:before {
          content: '';
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: 0;
          width: 3px;
          border-radius: 2px;
          background-color: var(--bin-color-primary);
        }
      }
    }
  }
  .content {
    background-color: var(--schema-color-bg);
    padding: 0;
    color: var(--schema-font-color);
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
