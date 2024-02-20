<template>
  <div class="dv-wrapper">
    <div class="back-btn">
      <b-button v-if="showBackBtn" size="mini" round @click="handleBackBtnClick" type="primary">
        返回
      </b-button>
    </div>
    <b-charts :options="{}" style="width: 100%; height: 100%" ref="bChartsRef"></b-charts>
  </div>
</template>

<script setup>
import { useMap } from './useMap'

defineOptions({
  name: 'VBasicMapEvo',
})

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { bChartsRef, showBackBtn, handleBackBtnClick } = useMap(props.data)
</script>

<style scoped>
.dv-wrapper {
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
