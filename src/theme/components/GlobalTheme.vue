<template>
  <div class="global-theme">
    <div class="theme-item active current" @click="openThemeModal">
      <div class="name" :title="globalTheme.name">全局主题</div>
      <div
        class="color-box"
        v-for="(colorItem, index) in getColorsPane(globalTheme.color)"
        :key="index"
        :style="{ backgroundColor: colorItem }"
      ></div>
      <div class="theme-bottom" :style="getThemeBottomStyle(globalTheme.color)"></div>
    </div>

    <div class="theme-item" @click="openCustomTheme">
      <span>自定义主题</span>
      <b-icon name="plus"></b-icon>
    </div>

    <b-modal
      v-model="themeChooseVisible"
      title="全局主题设置"
      append-to-body
      width="600px"
      draggable
    >
      <b-radio-group v-model="activeTab" size="large" type="capsule" style="width: 100%">
        <b-radio label="system">
          <span class="mr-8">系统主题</span>
          <b-icon name="font-colors"></b-icon>
        </b-radio>
        <b-radio label="custom">
          <span class="mr-8">自定义主题</span>
          <b-icon name="smile"></b-icon>
        </b-radio>
      </b-radio-group>

      <div class="theme-list">
        <b-scrollbar>
          <div class="theme-grid">
            <div
              v-for="(item, key) in themeColors"
              :key="item.id || key"
              class="theme-item"
              :class="{ active: (item.id || key) === pageConfig.chartThemeColor }"
              @click="selectTheme(item.id || key)"
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
          </div>
          <div
            v-if="themeColors.length === 0"
            style="height: 300px"
            flex="dir:top main:center cross:center"
          >
            <b-empty>暂无主题</b-empty>
          </div>
        </b-scrollbar>
      </div>
    </b-modal>

    <CustomTheme ref="customThereRef" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { chartColors, CustomTheme, useChartThemeColor, isSystemTheme } from '@/theme'
import { useStore } from '@/store'
import { deepCopy } from '@/utils/util'

const { schemaStore, storeToRefs } = useStore()
const { pageConfig } = storeToRefs(schemaStore)

defineOptions({
  name: 'GlobalTheme',
})

const activeTab = ref('system') // system,custom
const customThereRef = ref(null)
const { customThemes } = useChartThemeColor()

const themeChooseVisible = ref(false)
const themeColors = computed(() =>
  activeTab.value === 'system' ? deepCopy(chartColors) : deepCopy(customThemes.value),
)

const globalTheme = computed(() => {
  const themeName = pageConfig.value.chartThemeColor
  const isSys = isSystemTheme(themeName)

  return isSys ? chartColors[themeName] : customThemes.value.find(i => i.id === themeName)
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

function openThemeModal() {
  themeChooseVisible.value = true
}

// 设置全局主题
function selectTheme(keyOrId) {
  pageConfig.value.chartThemeColor = keyOrId
}

// 弹出自定义颜色弹窗
function openCustomTheme() {
  customThereRef.value?.open()
}
</script>

<style scoped>
.global-theme {
  padding: 0 10px;
}
.theme-item {
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 12px 16px;
  background-color: var(--schema-color-bg-2);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--s-border-color);
  cursor: pointer;
  .theme-bottom {
    position: absolute;
    left: 0;
    bottom: 0px;
    width: 100%;
    height: 3px;
  }
  &.active {
    border: 1px solid var(--bin-color-primary);
    border-bottom: 1px solid rgba(0, 0, 0, 0);
  }
  &.current {
    padding: 14px 16px;
    margin-top: 16px;
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
    width: 20px;
    height: 20px;
    border-radius: 6px;
  }
}
.theme-list {
  height: 400px;
  padding: 16px 0;
  .theme-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .theme-item {
    margin: 0;
  }
}
</style>
