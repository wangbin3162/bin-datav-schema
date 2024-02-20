<template>
  <b-modal
    v-model="visible"
    draggable
    width="640px"
    top="50px"
    append-to-body
    destroy-on-close
    :body-styles="{ backgroundColor: 'var(--schema-color-bg-3)' }"
    :show-close="false"
  >
    <div class="custom-box" style="min-height: 540px">
      <div class="top-color-edit bg-box">
        <div flex="cross:center">
          <span class="color-name">自定义组件颜色</span>
          <b-input :model-value="currentChartTheme.name" style="width: 240px" disabled />
        </div>
        <ColorsSetting v-model="currentChartTheme.color" v-model:selectIndex="currentColorIndex" />
      </div>
      <ColorsPanel
        :color="currentColor"
        @selectSystem="handleSelectSystemColors"
        @selectColor="handleSelectColor"
      />
      <div class="chart-show bg-box mt-16">
        <ColorsCharts :colors="currentChartTheme.color" :id="currentChartTheme.id" />
      </div>
    </div>
    <template #footer>
      <b-button @click="handleDown" transparent>关闭</b-button>
      <b-button type="primary" @click="handleOk">应用</b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { computed, ref } from 'vue'
import { MessageBox } from 'bin-ui-design'
import { useChartThemeColor } from '@/theme'
import ColorsCharts from './comps/ColorsCharts.vue'
import ColorsSetting from './comps/ColorsSetting.vue'
import ColorsPanel from './comps/ColorsPanel.vue'

defineOptions({
  name: 'SelfTheme',
})

const visible = ref(false)

// 自定义颜色数组
const { selectedCom, selectedThemeColors } = useChartThemeColor()

const currentChartTheme = ref({
  id: '',
  name: '',
  color: [],
})

// 当前编辑的颜色索引
const currentColorIndex = ref(0)

const currentColor = computed(() => {
  const index = currentColorIndex.value
  const color = currentChartTheme.value.color[index]
  return color ?? ''
})

function open() {
  currentChartTheme.value.name = selectedCom.value.alias
  let colors = [...selectedThemeColors.value]
  if (colors.length > 11) colors = colors.slice(0, 11)
  currentChartTheme.value.color = colors
  visible.value = true
}

function resetThemeStatus() {
  currentChartTheme.value = {
    id: '',
    name: '',
    color: [],
  }
  currentColorIndex.value = 0
}

// 操作完成
async function handleDown() {
  visible.value = false
  resetThemeStatus()
}

// 应用当前主题
function handleOk() {
  const { color } = currentChartTheme.value
  selectedCom.value.attr.chartThemeColor = color.join(',')
  visible.value = false
  resetThemeStatus()
}

// 选择系统主题色应用
function handleSelectSystemColors(colors) {
  currentChartTheme.value.color = colors
  currentColorIndex.value = 0
}

// 选择了一个扩展颜色
function handleSelectColor(color) {
  const index = currentColorIndex.value
  currentChartTheme.value.color[index] = color
}

defineExpose({ open })
</script>

<style scoped>
.custom-box {
  .top-button {
    width: 283px;
    padding: 0 0 10px;
    border-bottom: 1px solid var(--s-color-1);
    margin-bottom: 10px;
  }
  .list-wrap {
    height: 500px;
    overflow-y: auto;
  }
  .theme-color-item {
    margin-bottom: 8px;
  }
  .theme-item {
    position: relative;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    padding: 8px 7px 10px;
    width: 100%;
    background-color: var(--s-color-1);
    border-bottom: 2px solid rgba(0, 0, 0, 0);
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid transparent;
    cursor: pointer;
    .theme-bottom {
      position: absolute;
      left: 0;
      bottom: 0px;
      width: 100%;
      height: 3px;
    }
    &.active {
      border: 2px solid var(--bin-color-primary);
      border-bottom: 2px solid rgba(0, 0, 0, 0);
    }
    .name {
      text-align: left;
      width: 60px;
      font-size: 13px;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
      vertical-align: middle;
      overflow: hidden;
    }
    .color-box {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 3px;
    }
  }
  .bg-box {
    padding: 10px 16px;
    background: rgb(44, 44, 50);
    border-radius: var(--bin-border-radius-default);
  }
  .top-color-edit {
    .color-name {
      position: relative;
      right: -1px;
      line-height: 32px;
      height: 32px;
      padding: 0 12px;
      display: inline-block;
      border-radius: var(--bin-border-radius-default) 0 0 var(--bin-border-radius-default);
      background-color: var(--s-color-1);
      color: var(--s-text-color);
    }
  }
  :deep(.bin-timeline) {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .bin-timeline-item {
      .bin-timeline-item-tail {
        display: none;
      }
      .bin-timeline-item-head {
        background-color: transparent;
        border-width: 2px;
      }
    }
    &::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 16px;
      bottom: 20px;
      border-left: 1px solid var(--s-color-1);
    }
  }
}
</style>
