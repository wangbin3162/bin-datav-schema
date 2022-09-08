<template>
  <div class="group">
    <div>
      <template v-for="comp in propValue" :key="comp.id">
        <component
          class="component"
          :is="comp.name"
          :data="comp"
          :style="comp.groupStyle"
          :id="'component_' + comp.id"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { getStyle } from '@/utils/style'
import { ref } from 'vue '
export default {
  name: 'Group',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const propValue = ref(props.data.components)

    const toPercent = val => val * 100 + '%'

    // component.groupStyle 的 top left 是相对于 group 组件的位置
    propValue.value.forEach(com => {
      const parentStyle = props.data.attr // {x,y,w,h}
      // 如果已存在 component.groupStyle，说明已经计算过一次了。不需要再次计算
      if (!com.groupStyle || !Object.keys(com.groupStyle).length) {
        const { x, y, w, h, rotate } = com.attr
        const style = { left: x, top: y, width: w, height: h, rotate }
        com.groupStyle = getStyle(style)
        com.groupStyle.left = toPercent((x - parentStyle.x) / parentStyle.w)
        com.groupStyle.top = toPercent((y - parentStyle.y) / parentStyle.h)
        com.groupStyle.width = toPercent(w / parentStyle.w)
        com.groupStyle.height = toPercent(h / parentStyle.h)
      }
    })

    return { propValue }
  },
}
</script>

<style lang="stylus" scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    .component {
        position: absolute;
    }
  }
}
</style>
