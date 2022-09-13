<template>
  <div class="func-body-editor">
    <div class="func func-top">
      <b-tag type="primary" :tag-style="{ fontSize: '14px' }">
        function(
        <span class="params">{{ paramsStr }}</span>
        ) {
      </b-tag>
    </div>
    <div>
      <b-ace-editor lang="javascript" :height="height" :model-value="modelValue" @change="changeValue"></b-ace-editor>
    </div>
    <div class="func func-bottom">
      <b-tag type="primary" :tag-style="{ fontSize: '14px' }">}</b-tag>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'FuncBodyEditor',
  props: {
    augments: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '120',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const paramsStr = computed(() => props.augments.join(' , '))

    function changeValue(val) {
      emit('update:modelValue', val)
    }

    function getFunction() {
      return new Function(...props.augments, props.modelValue)
    }

    return {
      paramsStr,
      changeValue,
      getFunction,
    }
  },
}
</script>

<style scoped lang="stylus">
.func-body-editor {
  .func {
    padding: 2px 0;
    .params {
      color: var(--bin-color-warning);
    }
  }
  .func-tip {
    color: var(--bin-color-danger);
  }
}
</style>
