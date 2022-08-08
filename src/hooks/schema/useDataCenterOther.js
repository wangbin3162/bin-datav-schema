import { toRefs, watch, ref } from 'vue'
import { ApiType } from '@/config/data-source'
import { throwError, toJson } from '@/utils/util'
import { useStore } from '@/store'

/**
 * 数据中心hook
 * @param com 传入的组件对象
 */
export const useDataCenterOther = com => {
  const { schemaStore } = useStore() // 执行获取schema专属store
  const { apiData } = toRefs(com)
  const dvData = ref({})

  // 设置dvData，读取数据并塞入存储数据
  const setDvData = async (filters = []) => {
    const { comId, type, config } = apiData.value
    schemaStore.setGlobalLoading(true)
    try {
      // 获取源数据
      if (type === ApiType.static) {
        dvData.value = toJson(config.data, {})
      } else {
        dvData.value = toJson(config.data, {})
        if (dvData.value.list && dvData.value.list.length > 0) {
          config.seriesCount = dvData.value.list.length
        }
        // dvData.value = { list: [] }
        //   const { modelId, y } = config
        //   const cfgFilters = config.filters || []
        //   if (!isEmpty(modelId) && !isEmpty(y)) {
        //     dvData.value = await getModelDataById({
        //       modelId,
        //       y,s
        //       filters: [...cfgFilters, ...filters],
        //     })
        //     logger.primary(`==> 载入动态数据，comId：${comId} ，modelId：${modelId}`)
        //     // 设置系列数量
        //     if (dvData.value.yData && dvData.value.yData.length > 0) {
        //       config.seriesCount = dvData.value.yData.length
        //     }
        //   }
      }
    } catch (e) {
      throwError('useDataCenter/setDvData', e)
    }
    setTimeout(() => {
      schemaStore.setGlobalLoading(false)
    }, 800)
  }

  // 组件事件系统
  const dvEmit = (eventName, data) => {
    // 获取点击内容的所在维度索引seriesIndex，name，value
    const { seriesIndex, name, value } = data
    // 获取当前点击的x轴维度信息
    const xData = apiData.value.config.x[seriesIndex]
    // 如果x轴维度存在切设置过下钻，则拼装下钻filters信息
  }

  // 监听数据变更，如apis配置变化了或数据配置项apiData.source.config中修改了，则需要重新设置数据
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
  return {
    dvData,
    apiData,
    dvEmit,
  }
}
