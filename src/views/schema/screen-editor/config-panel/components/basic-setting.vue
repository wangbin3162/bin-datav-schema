<template>
  <div class="basic-setting-wp">
    <g-field label="图表尺寸" flat>
      <g-input-number
        v-model="attr.w"
        label="宽度"
        :min="10"
        :max="4000"
        inline
        suffix="px"
      />
      <g-input-number
        v-model="attr.h"
        label="高度"
        :min="10"
        :max="4000"
        inline
        suffix="px"
      />
    </g-field>
    <g-field label="图表位置" flat>
      <g-input-number
        v-model="attr.x"
        label="offsetX"
        inline
        suffix="px"
      />
      <g-input-number
        v-model="attr.y"
        label="offsetY"
        inline
        suffix="px"
      />
    </g-field>
    <g-field label="旋转角度" flat>
      <g-input-number
        v-model="attr.rotate"
        :min="0"
        :max="360"
        :step="1"
        inline
      />
    </g-field>
    <g-field label="透明度">
      <g-slider
        v-model="attr.opacity"
        :min="0"
        :max="1"
        :step="0.05"
      />
    </g-field>
  </div>
</template>

<script>
export default {
  name: 'basic-setting',
  props: {
    attr: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped lang="stylus">

</style>
