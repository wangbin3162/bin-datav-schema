<template>
  <div class="schema-screen-container">
    <header-bar back-url="/dashboardDemo"></header-bar>
    <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
      <svg-loading name="loading02" />
    </div>
    <div v-else class="editor-main-wrapper">
      <layer-panel></layer-panel>
      <components-panel></components-panel>
      <canvas-main></canvas-main>
      <config-panel></config-panel>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { compileFlatState, throwError } from '@/utils/util'
import { getSchema } from '@/api/modules/bi-cube.api'
import useSchemaStore from '@/hooks/schema-store/useSchemaStore'
import '@/assets/stylus/schema/index.styl'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'
import HeaderBar from '@/components/SchemaEditor/header-bar/index.vue'
import LayerPanel from '@/components/SchemaEditor/layer-panel/index.vue'
import ComponentsPanel from '@/components/SchemaEditor/components-panel/index.vue'
import CanvasMain from '@/components/SchemaEditor/canvas-main/index.vue'
import ConfigPanel from '@/components/SchemaEditor/config-panel/index.vue'

export default {
  name: 'schema-editor',
  components: { CanvasMain, ConfigPanel, ComponentsPanel, LayerPanel, HeaderBar, SvgLoading },
  setup() {
    const status = reactive({
      loading: false,
      dimensionTree: {}, // 维度树
      dimensionTreeFlats: [], // 维度树拉平
      dimensionFields: [],
      measureTree: {}, // 度量树
      measureTreeFlats: [], // 度量树拉平
      measureFields: [],
    })
    const schemaStore = useSchemaStore()

    // 更新字段数据
    const updateFieldState = (cubeSchema) => {
      const { dimension, measure } = cubeSchema || {}
      // 维度、度量树
      status.dimensionTree = dimension || { title: '维度', nodeType: 'root', children: [] }
      status.measureTree = measure || { title: '度量', nodeType: 'root', children: [] }
      status.dimensionTreeFlats = compileFlatState(status.dimensionTree)
      status.measureTreeFlats = compileFlatState(status.measureTree)
      status.dimensionFields = status.dimensionTreeFlats.filter(v => v.node.nodeType === 'attribute')
      status.measureFields = status.measureTreeFlats.filter(v => v.node.nodeType === 'attribute')
    }
    // 初始化数据表
    const initData = async () => {
      status.loading = true
      try {
        const { pageId, workspaceId, sourceId } = schemaStore.pageInfo.value
        const { cubeSchema } = await getSchema({ workspaceId, id: pageId || sourceId })
        updateFieldState(cubeSchema)
      } catch (e) {
        throwError('schema/index', e)
      }
      status.loading = false
    }

    initData()
    return {
      ...toRefs(status),
      ...schemaStore,
    }
  },
}
</script>
