<template>
  <div class="group-comps">
    <b-empty v-if="list.length === 0">暂无组件</b-empty>
    <div class="comp-wrap" v-else>
      <div class="comp-item" v-for="(com, index) in list" :key="index">
        <div class="inner">
          <div
            class="comp-item-img"
            :draggable="true"
            @dragstart="dragStart($event, com.comp)"
            @click="click(com.comp)"
          >
            <img v-lazy="com.thumbnail" v-if="!listLoading" />
            <img v-lazy="com.thumbnail" v-else />
            <div class="hover-layer">
              <i
                class="b-iconfont b-icon-delete-fill"
                title="删除组件"
                @click.stop="removeCom(com)"
              ></i>
            </div>
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
import { setGlobalLoading } from '@/hooks/schema/useGlobalLoading'
import { throwError } from '@/utils/util'
import { EventBus, EventMap } from '@/utils/event-bus'

const emit = defineEmits(['dragstart', 'click'])
const props = defineProps({
  groupId: {
    type: String,
    required: true,
  },
})

const list = ref([])
const listLoading = ref(false)
// 获取组件库
async function getCompList() {
  listLoading.value = true
  try {
    list.value = await api.getCompsByGroup(props.groupId)
  } catch (e) {
    throwError(e)
  }
  listLoading.value = false
}

EventBus.on(EventMap.SaveCompSuccess, getCompList)

getCompList()

// 移除一个
async function removeCom({ group, id }) {
  try {
    setGlobalLoading(true)
    await api.removeCom(group, id)
    getCompList()
  } catch (error) {
    console.log(error)
  }
  setGlobalLoading(false)
}
const dragStart = (e, comp) => emit('dragstart', e, comp)
const click = comp => emit('click', comp)
</script>

<style scoped>
.comp-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 8px 4px;
}
.comp-item {
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
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;
    height: 72px;
    padding: 4px;
    border-radius: 2px;
    transition: border-color 0.2s;
    border: 1px dashed var(--s-border-color-2);
    cursor: url('@/assets/images/schema/cursor-move.png') 4 4, auto;
    > img {
      width: 100%;
    }
    .hover-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(33, 33, 37, 0.7);
      display: none;
      > i {
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #fff;
      }
    }
    &:hover {
      border-color: var(--bin-color-primary-light2);
      background: #2a292f;
      .hover-layer {
        display: block;
      }
    }
  }
}
</style>
