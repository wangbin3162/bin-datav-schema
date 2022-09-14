<template>
  <div class="dv-wrapper">
    <bv-capsule-chart :config="options" :style="wrapperStyle"></bv-capsule-chart>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useDataCenter } from '@/hooks/schema/useDataCenter'

export default {
  name: 'VCapsuleBar',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData, dvScrollUp, drillData, drillIndex, drillFilters, couldDrill } = useDataCenter(
      props.data,
    )
    // config 配置项
    const config = computed(() => props.data.config) // attr 属性
    const attr = computed(() => props.data.attr)
    // 容器style
    const wrapperStyle = computed(() => {
      const { global } = config.value
      const { top, right, bottom, left } = global.margin
      const radius = global.borderRadius
      return {
        width: `${attr.value.w}px`,
        height: `${attr.value.h}px`,
        fontFamily: global.fontFamily,
        color: global.fontColor,
        padding: `${top}px ${right}px ${bottom}px ${left}px`,
        '--bar-radius': `${radius[0]}px ${radius[1]}px ${radius[2]}px ${radius[3]}px`,
        '--bar-height': global.barHeight + 'px',
        '--bar-margin': `${global.barMargin}px 0`,
        '--bar-bg': global.barBg,
        '--bar-shadow': global.shadow ? `${global.shadow} ${global.shadowColor}` : 'none',
        '--label-height': global.barHeight + global.barMargin * 2 + 'px',
      }
    })

    const options = computed(() => {
      const { global, color } = config.value
      return {
        data: dvData.value,
        unit: global.unit,
        showValue: global.showValue,
        valuePosition: global.valuePosition,
        colors: color,
      }
    })

    return {
      wrapperStyle,
      config,
      options,
      drillData,
      drillIndex,
      drillFilters,
      couldDrill,
      dvScrollUp,
    }
  },
}
</script>

<style scoped lang="stylus">
:deep(.bv-capsule-chart){
  .label-column div {
    line-height: var(--label-height);
    flex-shrink: 0;
    flex-grow: 0;
  }
  .capsule-item {
    height: var(--bar-height);
    margin: var(--bar-margin);
    background: var(--bar-bg);
    border-radius: var(--bar-radius);
    box-shadow: var(--bar-shadow);
    .capsule-item-column {
      height: calc(var(--bar-height) - 2px);
      border-radius: var(--bar-radius)
    }
  }
}
</style>
