<template>
  <div class="dv-wrapper">
    <bv-scroll-table :config="options" :style="wrapperStyle" ref="tableRef"></bv-scroll-table>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useEventBus, getEventParamsSexact } from '@/hooks/schema/useEventBus'
import { useDataCenter } from '@/hooks/schema/useDataCenter'
import { useScriptAction } from '@/hooks/schema/useScriptAction'

defineOptions({
  name: 'VScrollTable',
})
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const { dvData, buildParams, setDvData } = useDataCenter(props.data)
const tableRef = ref(null)

// config 配置项
const config = computed(() => props.data.config)
// attr 属性
const attr = computed(() => props.data.attr)
// 容器style
const wrapperStyle = computed(() => ({
  width: `${attr.value.w}px`,
  height: `${attr.value.h}px`,
}))

const options = computed(() => {
  const cfg = config.value
  // 根据是否显示行号，拼接宽度及对齐方式
  const columnWidth = cfg.index ? [cfg.indexWidth, ...cfg.columnWidth] : [...cfg.columnWidth]
  const align = cfg.index ? [cfg.indexAlign, ...cfg.align] : [...cfg.align]
  return {
    header: dvData.value.header ?? [],
    data: dvData.value.data ?? [],
    rowNum: cfg.rowNum,
    headerBGC: cfg.headerBGC,
    oddRowBGC: cfg.oddRowBGC,
    evenRowBGC: cfg.evenRowBGC,
    waitTime: cfg.waitTime,
    headerHeight: cfg.headerHeight,
    indexHeader: cfg.indexHeader,
    carousel: cfg.carousel,
    hoverPause: cfg.hoverPause,
    index: cfg.index,
    columnWidth,
    align,
  }
})

watch(
  [() => dvData.value, () => config.value],
  () => {
    nextTick(() => {
      tableRef.value && tableRef.value.onResize()
    })
  },
  { deep: true, immediate: true },
)

// 获取响应事件
const actions = {
  getData(params, onEvent) {
    console.log('-----获取响应参数-----', params, onEvent)
    // Message(`已接收参数：${params.value}，并进行响应设置函数调用！`)
    const p = getEventParamsSexact(params, onEvent.actionParams)
    buildParams(p)
    // const actParams = buildParams(p)
    setDvData()
    // 执行对应脚本
    useScriptAction(props.data, onEvent)
  },
}
// 事件系统增加
useEventBus(props.data, actions)
</script>
