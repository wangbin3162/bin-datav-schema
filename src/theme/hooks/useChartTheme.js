import { useStore } from '@/store'
import { computed } from 'vue'
import { chartColors, isSystemTheme } from '@/theme' // 引入 默认系统 主题

/**
 * 图表主题颜色相关hook
 * @returns
 */
export function useChartThemeColor() {
  const { schemaStore, storeToRefs } = useStore()
  const { pageConfig, selectedCom } = storeToRefs(schemaStore)

  // 全局主题
  const globalTheme = computed(() => pageConfig.value.chartThemeColor)

  // 自定义颜色数组
  const customThemes = computed({
    get: () => pageConfig.value.customColorsList,
    set: val => (pageConfig.value.customColorsList = val),
  })

  // 判断一个配置的主题是系统主题，或者是一个自定义主题
  const isSystemOrCustomTheme = keyOrId => {
    return (
      keyOrId === '' ||
      isSystemTheme(keyOrId) ||
      customThemes.value.findIndex(i => i.id === keyOrId) > -1
    )
  }

  const getThemeColors = currentTheme => {
    // 1.当前为空时，从全局主题名称中查询
    if (currentTheme === '') {
      // 如果是系统key，则取得系统颜色
      if (isSystemTheme(globalTheme.value)) {
        return chartColors[globalTheme.value].color
      } else {
        const custom = customThemes.value.find(i => i.id === globalTheme.value)
        if (custom) {
          return custom.color
        }
      }
    } else {
      // 逗号分割颜色值
      return currentTheme.split(',')
    }
    return [...chartColors.dark.color]
  }

  const selectedThemeColors = computed(() => getThemeColors(selectedCom.value.attr.chartThemeColor))

  const usedIds = computed(() => {
    return [pageConfig.value.chartThemeColor]
  })

  return {
    pageConfig,
    selectedCom,
    globalTheme, // 全局主题名称，dark or id
    customThemes, // 自定义皮肤列表 {id，name，color}
    getThemeColors, // 根据一个配置获取骑颜色数组
    selectedThemeColors, // 当前选中的颜色
    isSystemOrCustomTheme, // 判断一个主题的值是系统主题或者是自定义的主题，如不是，则是 存储的副本
    usedIds,
  }
}
