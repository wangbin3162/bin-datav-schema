<template>
  <div class="group-comps">
    <b-empty v-if="list.length === 0">暂无组件</b-empty>
    <div class="comp-wrap" v-else>
      <div class="comp-item" v-for="(com, index) in list" :key="index">
        <div class="inner">
          <!-- {{ com.comp }} -->
          <div
            class="comp-item-img"
            :draggable="true"
            @dragstart="dragStart($event, com.comp)"
            @click="click(com.comp)"
          >
            <b-icon :name="com.comp.icon" size="25" />
          </div>
          <div class="comp-item-text">{{ com.comp.alias }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as api from '@/api/comps/comps.api'

const emit = defineEmits(['dragstart', 'click'])
const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
})

const list = ref([])
// 获取组件库
const getCompList = () => api.getCompsByGroup(props.groupId).then(res => (list.value = res))

getCompList()

const dragStart = (e, comp) => emit('dragstart', e, comp)
const click = comp => emit('click', comp)
</script>

<style lang="stylus" scoped>
.comp-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 4px;
}
.comp-item {
  color: var(--schema-font-color);
  width: 50%;
  vertical-align: top;
  user-select: none;
  margin-bottom: 6px;
  padding: 0 4px;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  .comp-item-text {
    font-size: 12px;
    padding: 0 5px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 22px;
  }
  .comp-item-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 72px;
    border-radius: 2px;
    transition: border-color 0.2s;
    border: 1px dashed rgba(255, 255, 255, .2);
    cursor: url('@/assets/images/schema/cursor-move.png') 4 4, auto;
    > img {
      width: 100%;
    }
    &:hover{
      border-color: var(--bin-color-primary-light2);
      background: #2a292f;
    }
  }
}
</style>
