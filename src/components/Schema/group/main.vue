<template>
  <div class="group">
    <div>
      <template v-for="comp in propValue" :key="comp.id">
        <component
          class="component"
          :class="[
            {
              hovered: comp.id === hoveredComId,
              selected: isSelected(comp),
            },
          ]"
          :is="comp.name"
          :data="comp"
          :style="comp.groupStyle"
          :id="'component_' + comp.id"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { getStyle } from '@/utils/style'
import { ref } from 'vue '
import { useStore } from '@/store'
import { isEmpty } from '@/utils/util'

defineOptions({
  name: 'Group',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { schemaStore, storeToRefs } = useStore()
const { hoveredComId, selectedCom, isMultiSelect, selectedComs } = storeToRefs(schemaStore)

function isSelected(com) {
  if (isMultiSelect.value) return selectedComs.value.map(i => i.id).includes(com.id)
  return !isEmpty(selectedCom.value) && selectedCom.value.id === com.id
}
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
</script>

<style scoped>
.group {
  & > div {
    position: relative;
    width: 100%;
    height: 100%;
    .component {
      position: absolute;
      &.hovered {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          border: 1px dashed var(--bin-color-primary);
        }
      }
      &.selected {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border: 1px solid var(--bin-color-primary);
        }
      }
    }
  }
}
</style>
