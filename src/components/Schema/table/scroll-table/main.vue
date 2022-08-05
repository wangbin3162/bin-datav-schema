<template>
  <div class="dv-wrapper" :style="wrapperStyle">
    <bv-scroll-table :config="options" :style="wrapperStyle" ref="tableRef"></bv-scroll-table>
  </div>
</template>

<script>
import { computed, nextTick, ref, toRefs, watch } from 'vue'
import { ApiType } from '@/config/data-source'
import { isEmpty, throwError, toJson } from '@/utils/util'
import { getModelDataById } from '@/api/modules/analysis-dashboard.api'
import { useStore } from '@/store'

export default {
  name: 'VScrollTable',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { apiData } = toRefs(props.data)
    const { schemaStore } = useStore() // 执行获取schema专属store
    const dvData = ref({})
    const tableRef = ref(null)

    // config 配置项
    const config = computed(() => props.data.config)
    // attr 属性
    const attr = computed(() => props.data.attr)
    // 容器style
    const wrapperStyle = computed(() => ({ width: `${attr.value.w}px`, height: `${attr.value.h}px` }))

    function getTableData() {
      // 静态数据，直接返回header和data
      if (apiData.value.type === ApiType.static) {
        return {
          header: dvData.value.header ?? [],
          data: dvData.value.data ?? [],
        }
      } else {
        const { config: apiCfg } = apiData.value
        // 动态组装header
        const firstX = apiCfg.x.map(i => i.title).join('-')
        const otherX = apiCfg.y.map(i => i.title)
        // 动态组装表格数据
        const rows = []
        const xData = dvData.value.xData ?? []
        const yData = dvData.value.yData ?? []
        // 行
        for (let i = 0; i < xData.length; i++) {
          // 拼接列
          const cols = [xData[i]]
          for (let j = 0; j < yData.length; j++) {
            cols.push(yData[j].data[i])
          }
          rows.push(cols)
        }

        return {
          header: [firstX, ...otherX],
          data: [...rows],
        }
      }
    }

    const options = computed(() => {
      const cfg = config.value
      // 根据是否显示行号，拼接宽度及对齐方式
      const columnWidth = cfg.index ? [cfg.indexWidth, ...cfg.columnWidth] : [...cfg.columnWidth]
      const align = cfg.index ? [cfg.indexAlign, ...cfg.align] : [...cfg.align]
      return {
        ...getTableData(),
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

    // 设置dvData，读取数据并塞入存储数据
    const setDvData = async (filters = []) => {
      const { type, config: apiCfg } = apiData.value
      await schemaStore.setGlobalLoading(true)
      try {
        // 获取源数据
        if (type === ApiType.static) {
          dvData.value = toJson(apiCfg.data, {})
        } else {
          const { modelId, x, y } = apiCfg
          const cfgFilters = apiCfg.filters || []
          if (!isEmpty(modelId) && !isEmpty(y)) {
            dvData.value = await getModelDataById({
              modelId,
              x,
              y,
              filters: [...cfgFilters, ...filters],
            })
          }
        }
      } catch (e) {
        throwError('scroll-table/setDvData', e)
      }
      // setTimeout(() => {
      await schemaStore.setGlobalLoading(false)
      // }, 800)
    }

    watch(
      [
        () => apiData.value.type,
        () => apiData.value.config.data,
        () => apiData.value.config.x,
        () => apiData.value.config.y,
      ],
      async () => {
        await setDvData()
      },
      { deep: true, immediate: true },
    )
    watch(
      [() => dvData.value, () => config.value],
      () => {
        nextTick(() => {
          tableRef.value && tableRef.value.onResize()
        })
      },
      { deep: true, immediate: true },
    )
    return {
      tableRef,
      attr,
      config,
      wrapperStyle,
      options,
    }
  },
}
</script>
