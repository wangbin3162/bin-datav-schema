<template>
  <div class="colors-panel mt-16">
    <b-row :gutter="8">
      <b-col span="12">
        <div class="color-edit bg-box">
          <div class="title">系统主题色</div>
          <b-scrollbar style="height: 120px">
            <div
              v-for="(item, key) in chartColors"
              :key="key"
              class="theme-item"
              @click="selectTheme(item.color)"
            >
              <div class="name">{{ item.name }}</div>

              <div
                class="color-box"
                v-for="(colorItem, index) in getColorsPane(item.color)"
                :key="index"
                :style="{ backgroundColor: colorItem }"
              ></div>
              <div class="theme-bottom" :style="getThemeBottomStyle(item.color)"></div>
            </div>
          </b-scrollbar>
        </div>
      </b-col>
      <b-col span="12">
        <div class="color-edit bg-box">
          <div class="title">扩展色{{ color }}</div>
          <div class="colors-list">
            <div
              class="color-computed-item"
              v-for="(color, index) in colorList"
              :key="index"
              :title="color"
              @click="selectColor(color)"
            >
              <div class="n-color-picker-checkboard"></div>
              <div :style="{ backgroundColor: color }"></div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script setup>
import { chartColors } from '@/theme'
import { MessageBox, Utils } from 'bin-ui-design'
import { computed } from 'vue'

const { mixWhite, mixBlack, alpha } = Utils.color

const emit = defineEmits(['selectSystem', 'selectColor'])
const props = defineProps({
  color: {
    type: String,
    default: '',
  },
})

const colorList = computed(() => {
  if (!props.color) return []
  const percents = [0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.4, 0.35, 0.3, 0.25]
  const w = percents.map(i => mixWhite(props.color, 0.7 - i))
  const d = percents.map(i => mixBlack(props.color, i))

  const a = []
  for (let index = 0; index < 20; index++) {
    a.push(alpha(props.color, 1 - (index + 1) * 0.03))
  }

  return [...w, ...d, ...a]
})

function getColorsPane(colors) {
  if (colors.length < 6) return colors
  else return colors.slice(0, 6)
}

function getThemeBottomStyle(colors) {
  const arr = getColorsPane(colors)
  const start = arr[0]
  const end = arr[arr.length - 1]
  return { backgroundImage: `linear-gradient(to right, ${start} 0%, ${end} 100%)` }
}

// 提示是否应用当前主题颜色
function selectTheme(colors) {
  MessageBox.confirm({
    type: 'warning',
    title: '提示',
    message: '是否应用此系统颜色？会替换当前色自定义色板！',
  })
    .then(() => {
      const colorList = getColorsPane(colors)
      emit('selectSystem', colorList)
    })
    .catch(() => {})
}

function selectColor(color) {
  emit('selectColor', color)
}
</script>

<style scoped>
.colors-panel {
  .bg-box {
    padding: 10px 16px 12px;
    background: rgb(44, 44, 50);
    border-radius: var(--bin-border-radius-default);
  }
  .color-edit {
    .title {
      padding-bottom: 8px;
      border-bottom: 1px solid var(--s-color-1);
      margin-bottom: 8px;
    }
    .theme-item {
      position: relative;
      display: flex;
      align-items: center;
      text-align: center;
      margin-bottom: 5px;
      justify-content: space-between;
      padding: 6px 8px;
      width: 100%;
      background-color: var(--s-color-1);
      border-bottom: 2px solid rgba(0, 0, 0, 0);
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      .theme-bottom {
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 3px;
      }
      .name {
        text-align: left;
        width: 60px;
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
    .colors-list {
      height: 120px;
      display: flex;
      justify-content: center;
      flex-flow: wrap;
      justify-content: center;
      padding-top: 6px;
      gap: 0px 4px;
      .color-computed-item {
        position: relative;
        display: inline-block;
        height: 22px;
        width: 22px;
        cursor: pointer;
        overflow: hidden;
        border-radius: 4px;
        .n-color-picker-checkboard {
          background-color: white;
          &::after {
            background-image: linear-gradient(45deg, #ddd 25%, #0000 25%),
              linear-gradient(-45deg, #ddd 25%, #0000 25%),
              linear-gradient(45deg, #0000 75%, #ddd 75%),
              linear-gradient(-45deg, #0000 75%, #ddd 75%);
            background-size: 12px 12px;
            background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
            background-repeat: repeat;
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
          }
        }
        > div {
          position: absolute;
          height: 22px;
          width: 22px;
        }
      }
    }
  }
}
</style>
