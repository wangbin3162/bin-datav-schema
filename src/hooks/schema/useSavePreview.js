import { throwError, isEmpty, generateId } from '@/utils/util'
import { saveKanban } from '@/api/modules/analysis-dashboard.api'
import { saveScreenPreview } from '@/api/database.api'
import { ApiType } from '@/config/data-source'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

// 保存和预览hook
export default function useSavePreview() {
  const route = useRoute()
  const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
  const { pageInfo, pageConfig, comps } = storeToRefs(schemaStore)

  function buildPageJson() {
    const uid = generateId()
    const screenData = {
      template: { id: `tmp_${uid}`, name: `模板_${uid}` },
      pageConfig: pageConfig.value,
      comps: comps.value,
    }
    //  把 JSON 对象转换为字符串
    return {
      templateName: `模板_${uid}`,
      pageJson: JSON.stringify(screenData)
    }
  }

  // 保存screenData
  async function saveScreenData(status = 'edit') {
    const { pageJson} = buildPageJson()
    const saveData = {
      id: pageInfo.value.id || route.query.id,
      name: pageInfo.value.name,
      pid: route.query.isShow ? '1' : pageInfo.value.pid,
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
      pageJson
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
      schemaStore.setGlobalLoading(true)
      const data = {
        pageInfo: {
          id: pageInfo.value.id,
          name: pageInfo.value.name || '大屏预览',
          pid: pageInfo.value.pid || '1',
        },
        pageConfig: pageConfig.value,
        comps: comps.value,
      }
      result = await saveScreenPreview(data)
    } catch (e) {
      result = {}
    }
    schemaStore.setGlobalLoading(false)
    return result
  }

  return {
    saveScreenData,
    previewScreen,
    buildPageJson
  }
}
