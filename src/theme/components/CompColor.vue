<template>
  <div class="comp-color-wrap">
    <div class="body-box">
      <div flex="main:justify cross:center">
        <div class="theme-color-item-box">
          <b-color-picker
            v-for="(color, index) in showColors"
            :key="index"
            size="small"
            v-model="showColors[index]"
            :show-alpha="true"
            :colors="pickerColors"
            :show-label="false"
            popper-class="is-dark"
            color-format="hex"
            class="theme-color-item"
            @change="val => colorChange(val, index)"
          />
        </div>
        <div class="btn-box">
          <b-button type="text" title="自定义组件颜色" @click="openCustomTheme">
            <i class="b-iconfont b-icon-edit btn-text"></i>
          </b-button>
          <b-button
            type="text"
            style="margin-left: 4px"
            title="移除自定义颜色"
            :disabled="isSystemOrCustomTheme(selectedCom.attr.chartThemeColor)"
            @click="deleteCustomColor"
          >
            <i class="b-iconfont b-icon-delete btn-text"></i>
          </b-button>
        </div>
      </div>
      <div class="theme-bottom" :style="themeBottomStyle"></div>
    </div>
    <SelfTheme ref="selfThemeRef" />
  </div>
</template>

<script setup>
import { useChartThemeColor, SelfTheme, pickerColors } from '@/theme'
import { computed, ref } from 'vue'

defineOptions({
  name: 'CompColor',
})

const selfThemeRef = ref(null)

const { selectedThemeColors, isSystemOrCustomTheme, selectedCom } = useChartThemeColor()

const showColors = computed(() => selectedThemeColors.value.slice(0, 6))

const themeBottomStyle = computed(() => {
  const arr = showColors.value
  const start = arr[0]
  const end = arr[arr.length - 1]
  return { backgroundImage: `linear-gradient(to right, ${start} 0%, ${end} 100%)` }
})

// 弹出自定义颜色弹窗
function openCustomTheme() {
  selfThemeRef.value?.open()
}

// 删除自定义颜色
function deleteCustomColor() {
  selectedCom.value.attr.chartThemeColor = ''
}

function colorChange(color, index) {
  // 缓存当前的颜色值
  let colors = [...selectedThemeColors.value]
  // 截取前11个颜色
  if (colors.length > 11) colors = colors.slice(0, 11)
  // 指定对应颜色的位置颜色修改
  colors[index] = color
  // 设置到当前组件
  selectedCom.value.attr.chartThemeColor = colors.join(',')
}
</script>

<style scoped>
.comp-color-wrap {
  position: relative;
  width: 100%;
  .body-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 4px 10px;
    height: 28px;
    border-radius: 4px;
    overflow: hidden;
    background-color: #313132;

    .theme-color-item-box {
      display: flex;
      align-items: center;
      border-radius: 2px;
      overflow: hidden;
      :deep(.bin-color-picker) {
        &.theme-color-item {
          display: inline-block;
          width: 30px;
          height: 10px;
          .bin-color-picker__trigger {
            padding: 0;
          }
        }
      }
    }
    .btn-box {
      display: flex;
      margin-left: 8px;
      .btn-text {
        cursor: pointer;
        color: var(--s-text-color-2);
      }
    }
    .theme-bottom {
      position: absolute;
      left: 0;
      bottom: 1px;
      width: 100%;
      height: 3px;
    }
  }
}
</style>
