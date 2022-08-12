<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <div class="back-btn">
      <b-button v-if="showBackBtn" size="mini" round @click="handleBackBtnClick" type="primary">返回</b-button>
    </div>
    <b-charts :options="{}" style="width: 100%; height: 100%" ref="bChartsRef"></b-charts>
  </div>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { useDataCenterOther } from '@/hooks/schema/useDataCenterOther'
import { useMap } from './useMap'

export default {
  name: 'VBasicMapEvo',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { dvData, apiData } = useDataCenterOther(props.data)

    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)
    const chartRef = ref(null)

    const chartData = computed(() => ({
      xData: dvData.value.xData ?? [],
      yData: dvData.value.yData ?? [],
    }))

    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))

    const { bChartsRef, showBackBtn, handleBackBtnClick } = useMap(props.data)

    // 设置seriesCount
    watch(
      () => dvData.value,
      val => {
        apiData.value.config.seriesCount = val.yData ? val.yData.length : 0
        nextTick(() => {
          chartRef.value && chartRef.value.refresh()
        })
      },
      {
        deep: true,
      },
    )

    return {
      bChartsRef,
      attr,
      config,
      wrapperStyle,
      handleBackBtnClick,
      showBackBtn,
    }
  },
}
</script>
<style lang="stylus" scoped>
.dv-wrapper{
  position: relative;
  width: 100%;

  .back-btn {
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 1;
  }
}
</style>
