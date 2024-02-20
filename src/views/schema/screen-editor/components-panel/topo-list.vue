<template>
  <div class="group-wrap">
    <div class="group-list">
      <b-scrollbar native>
        <Collapse
          v-for="group in groups"
          :key="group.key"
          :name="group.key"
          :title="group.value"
          :can-edit="false"
        >
          <TopoItem :group-id="group.key" @dragstart="dragStart" @click="click" />
        </Collapse>
      </b-scrollbar>
    </div>
  </div>
</template>

<script setup>
import Collapse from './collapse.vue'
import { ref } from 'vue'
import { useCollapse } from '@/hooks/collapseHook'
import TopoItem from './topo-item.vue'

const emit = defineEmits(['dragstart', 'click'])
const groups = ref([
  { key: 'pipe', value: '管线' },
  { key: 'electric', value: '电力' },
  { key: 'blower', value: '风机' },
  { key: 'gate', value: '阀门' },
  { key: 'twyer', value: '鼓风机' },
  { key: 'boiler', value: '锅炉' },
  { key: 'cooler', value: '冷却器' },
  { key: 'light', value: '指示灯' },
  { key: 'meter', value: '仪表' },
  { key: 'motor', value: '马达' },
  { key: 'building', value: '建筑' },
  { key: 'sewage', value: '污水处理' },
  { key: 'icon', value: '2.5D-2D图标' },
  { key: 'city', value: '城市图标' },
])

useCollapse()

const dragStart = (e, comp) => emit('dragstart', e, comp)
const click = comp => emit('click', comp)
</script>

<style scoped>
.group-wrap {
  position: relative;
  height: calc(100vh - 80px);
  .group-list {
    height: 100%;
  }
}
</style>
