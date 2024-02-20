// 导出默认配置
export * from './config/default-theme'

// 导出默认图表配置
export * from './config/chart-theme'

// 导出hooks
export * from './hooks'

// 导出默认配置组件
export { default as ThemeConfig } from './components/index.vue'

// 导出全局主题配置组件
export { default as GlobalTheme } from './components/GlobalTheme.vue'

// 导出自定义主题配置组件
export { default as CustomTheme } from './components/CustomTheme.vue'

// 导出自定义主题配置组件
export { default as SelfTheme } from './components/SelfTheme.vue'

// 导出组件的颜色配置条
export { default as CompColor } from './components/CompColor.vue'

// 导出chartTheme 相关hooks
export * from './hooks/useChartTheme'
