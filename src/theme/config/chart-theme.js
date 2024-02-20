import customed from './chart-themes/customed.json'
import dark from './chart-themes/dark.json'
import chalk from './chart-themes/chalk.json'
import essos from './chart-themes/essos.json'
import macarons from './chart-themes/macarons.json'
import purplePassion from './chart-themes/purple-passion.json'
import roma from './chart-themes/roma.json'
import shine from './chart-themes/shine.json'
import vintage from './chart-themes/vintage.json'
import walden from './chart-themes/walden.json'
import westeros from './chart-themes/westeros.json'
import wonderland from './chart-themes/wonderland.json'
// 默认主题详细配置
import themeJson from './global.theme.json'
import { generateId, deepCopy, deepMerge } from '@/utils/util'

export const hueRotateColor = '#2486b9'

// 图表主题颜色
export const chartColors = {
  dark,
  customed,
  macarons,
  walden,
  purplePassion,
  vintage,
  chalk,
  westeros,
  wonderland,
  essos,
  shine,
  roma,
}

export const pickerColors = [
  ...chartColors.dark.color,
  ...chartColors.customed.color,
  ...chartColors.chalk.color,
  '#fff',
  '#000',
]

// 创建一个自定义颜色色板（从明亮）中取得复制
export function createNewCustomColors() {
  return {
    id: 'custom_color-' + generateId(),
    name: '未命名',
    color: [...dark.color.slice(0, 6)],
  }
}

// 判断一个配置主题是否是系统主题
export function isSystemTheme(name) {
  return Object.keys(chartColors).includes(name)
}

// 全局样式json
export const globalThemeJson = { ...themeJson }

export function mergeChartOptions(options = {}) {
  return deepMerge(deepCopy(globalThemeJson), options)
}
