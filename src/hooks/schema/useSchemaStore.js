import { computed } from 'vue'
import { throwError, isEmpty } from '@/utils/util'
import { saveKanban } from '@/api/modules/analysis-dashboard.api'
import { useRoute } from 'vue-router'
import { saveScreenPreview } from '@/api/database.api'
import { ApiType } from '@/config/data-source'
import useSchema from '@/hooks/store/useSchema'

// scheam整体相关的内容值，包括schema 存储的pinia信息和全局封装的操作信息
export default function useSchemaStore() {
  const route = useRoute()
  const schemaStore = useSchema() // 执行获取schema专属store
  const { pageInfo, pageConfig, comps, toolbar } = schemaStore

  // 设置单个位置
  async function setSingleComAttr({ key, value }) {
    const map = { left: 'x', top: 'y' }
    schemaStore.setShapeSingleStyle({ key: map[key], value })
  }

  // 保存screenData
  async function saveScreenData(status = 'edit') {
    const saveData = {
      id: pageInfo.value.id || route.query.id,
      name: pageInfo.value.name,
      pid: pageInfo.value.pid,
      status,
      layout: JSON.stringify(pageConfig.value),
      components: comps.value.map(c => {
        if (!isEmpty(c.apiData)) {
          return {
            name: c.alias,
            componentType: c.componentType,
            componentDataType: c.apiData.type,
            modelId: c.apiData.config.modelId,
            componentContent: JSON.stringify(c),
            x: c.apiData.config.x,
            y: c.apiData.config.y,
            drill: [],
            filters: [],
          }
        } else {
          return {
            name: c.alias,
            componentType: c.componentType,
            componentContent: JSON.stringify(c),
            componentDataType: ApiType.static,
            modelId: '',
            x: [],
            y: [],
            drill: [],
            filters: [],
          }
        }
      }),
    }
    try {
      return await saveKanban(saveData)
    } catch (e) {
      throwError('userSchemaStore/saveScreenData', e)
    }
    return ''
  }

  // 预览本地
  async function previewScreen() {
    let result = {}
    try {
      await schemaStore.setGlobalLoading(true)
      const data = {
        pageInfo: {
          id: pageInfo.value.id,
          name: pageInfo.value.name || '看板预览',
          pid: pageInfo.value.pid || '1',
        },
        pageConfig: pageConfig.value,
        comps: comps.value,
      }
      result = await saveScreenPreview(data)
    } catch (e) {
      result = {}
    }
    await schemaStore.setGlobalLoading(false)
    return result
  }

  return {
    ...schemaStore,
    getPanelOffsetLeft,
    getPanelOffsetTop,
    getPanelOffset,
    autoCanvasScale,
    setCanvasScale,
    setSingleComAttr,
    saveScreenData,
    previewScreen,
  }
}
