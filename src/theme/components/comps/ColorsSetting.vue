<template>
  <div style="width: 578px">
    <Draggable
      v-model="colors"
      class="color-setting"
      tag="div"
      item-key="id"
      v-bind="{ animation: 200, handle: '.icon-move' }"
    >
      <template #item="{ element, index }">
        <div class="color-list-item">
          <div class="item-inner">
            <div
              class="color-border"
              :class="{ active: activeIndex === index }"
              :style="{ '--active-color': element }"
              @click="colorClick(index)"
            >
              <b-color-picker
                size="mini"
                v-model="colors[index]"
                :show-alpha="true"
                :colors="pickerColors"
                style="width: 94px"
                popper-class="is-dark"
                color-format="hex"
              />
            </div>
            <i class="b-iconfont b-icon-swap icon-move" title="拖动位置"></i>
            <b-tooltip content="删除颜色" v-if="index > 5">
              <i class="b-iconfont b-icon-close" @click="removeColor(index)"></i>
            </b-tooltip>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="color-list-item">
          <div class="item-inner">
            <b-button
              type="primary"
              plain
              style="width: 102px"
              :disabled="colors.length > 10"
              :title="colors.length > 10 ? '主题颜色为11个以内' : ''"
              @click="addColor"
            >
              <span class="mr-8">添加</span>
              <b-icon name="plus"></b-icon>
            </b-button>
          </div>
        </div>
      </template>
    </Draggable>
  </div>
</template>

<script setup>
import Draggable from 'vuedraggable'
import { computed } from 'vue'
import { pickerColors } from '@/theme'

const emit = defineEmits(['update:modelValue', 'update:selectIndex'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  selectIndex: {
    type: Number,
    default: 0,
  },
})

const colors = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const activeIndex = computed({
  get: () => props.selectIndex,
  set: val => emit('update:selectIndex', val),
})

function colorClick(index) {
  activeIndex.value = index
}

//  新增一个颜色
function addColor() {
  // 获取最后一个颜色值
  const color = colors.value[colors.value.length - 1]
  colors.value.push(color)
}
// 移除一个颜色
function removeColor(index) {
  colors.value.splice(index, 1)
}
</script>

<style scoped>
.color-setting {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  .color-list-item {
    width: 25%;
    .item-inner {
      display: flex;
      align-items: center;
      .color-border {
        width: 102px;
        border: 1px solid var(--s-border-color-2);
        padding: 3px;
        border-radius: var(--bin-border-radius-default);
        &.active {
          border: 2px solid var(--active-color);
          padding: 2px;
        }
      }
      :deep(.b-color-picker) {
        .bin-input {
          font-size: 12px;
        }
      }
      .b-iconfont {
        cursor: pointer;
        color: var(--s-text-color-3);
        font-size: 14px;
        &.icon-move {
          margin: 0 4px;
        }
      }
    }
  }
}
</style>
