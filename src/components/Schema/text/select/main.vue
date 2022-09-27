<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <b-select v-model="select" clearable>
      <b-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></b-option>
    </b-select>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { useEventBus } from '@/hooks/schema/useEventBus'

export default {
  name: 'VSelect',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData } = useDataCenter(props.data)
    // config 配置项
    const config = computed(() => props.data.config)

    const select = ref(config.value.default)

    const options = computed(() => dvData.value ?? config.value.options)

    const wrapperStyle = computed(() => {
      const { background, bgPopperColor, color, fontSize, borderColor, arrowColor, borderRadius } =
        config.value

      return {
        '--font-color': color,
        '--font-size': `${fontSize}px`,
        '--bg-color': background,
        '--bg-popper-color': bgPopperColor,
        '--border-color': borderColor,
        '--arrow-color': arrowColor,
        '--border-radius': `${borderRadius}px`,
        '--select-height': `${props.data.attr.h}px`,
      }
    })

    watch(
      () => config.value.default,
      val => (select.value = val),
    )

    // 事件系统增加
    useEventBus(props.data)

    return {
      select,
      options,
      wrapperStyle,
    }
  },
}
</script>

<style lang="stylus" scoped>
.dv-wrapper{
  :deep(.bin-select){
    .bin-input {
      background-color: var(--bg-color);
      color: var(--font-color);
      font-size: var(--font-size);
      border-color: var(--border-color);
      border-radius: var(--border-radius);
      height: var(--select-height);
    }
    .bin-select__caret.b-iconfont.b-icon-down {
      color: var(--arrow-color);
    }
    .bin-select__caret.b-iconfont.is-show-close {
      color: var(--arrow-color);
      background: transparent;
    }
  }
}
</style>
