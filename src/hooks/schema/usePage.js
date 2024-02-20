import { useRoute } from 'vue-router'
import { nextTick, watch, ref, provide } from 'vue'
import { useStore } from '@/store'
import { loadKanban } from '@/api/modules/analysis-dashboard.api'
import { loadTemplate } from '@/api/modules/template.api'
import { getCreateData } from '@/api/database.api'
import { getModelTree } from '@/api/modules/analysis-model.api'

// 页面创建信息等
export default function usePage() {
  const route = useRoute()
  const { schemaStore } = useStore() // 执行获取schema专属store

  const loading = ref(false)
  const modelTree = ref([])

  getModelTree().then(res => {
    modelTree.value = res
      ? [
          {
            id: '1',
            code: null,
            directory: 'Y',
            info: null,
            modelType: null,
            name: '分析模型',
            pid: '0',
            title: null,
            children: handleLoopChild(res), //dataSource.children(item => ({ id: item.key, text: item.value, type: item.dsType }))
          },
        ]
      : []
  })

  function handleLoopChild(data) {
    const mapper = node => {
      const mapperNode = {
        id: node?.id,
        code: node?.code,
        directory: node?.directory,
        info: node?.info,
        modelType: node?.modelType,
        name: node?.name,
        pid: node?.pid,
        title: node?.name,
      }
      if (node.models && node.models.length) {
        mapperNode.directory = 'Y'
        mapperNode.children = node.models.map(mapper)
      }
      return mapperNode
    }
    return data.map(mapper)
  }

  const getBaseInfo = async id => {
    try {
      loading.value = true
      const data = await loadKanban(id)
      if (data) {
        const { id, name, pid, layout, components } = data
        const screenData = {
          pageInfo: { id, name, pid },
          pageConfig: JSON.parse(layout),
          comps: components.map(c => JSON.parse(c.componentContent)),
        }
        schemaStore.loadScreenData(screenData)
        await nextTick()
        document.title = name
      }
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }

  const getCreateInfo = async () => {
    try {
      loading.value = true
      const createData = await getCreateData()
      // 模板创建
      if (createData.tpl.length > 0) {
        const data = await loadTemplate(createData.tpl)
        if (data) {
          const screenData = JSON.parse(data.content)
          const { comps, pageConfig } = screenData
          schemaStore.loadScreenData({ comps, pageConfig })
        }
      } else {
        // 预设创建
        schemaStore.setScreenSize(createData)
      }
    } catch (e) {
      console.log(e)
    }
    loading.value = false
  }

  watch(
    () => route.path,
    async () => {
      const { id } = route.query
      if (id) {
        // 如果是有id表示为修改，无id则获取创建对象来进行设置
        await getBaseInfo(id)
      } else {
        await getCreateInfo()
      }
    },
    { immediate: true },
  )

  provide('ModelTree', modelTree)
  return {
    loading,
  }
}
