<template>
  <div class="api-editor">
    <div class="attr-source-wp">
      <div class="data-source">
        <div class="data-result-title">数据源配置</div>
        <div class="data-source-config">
          <g-field label="数据来源">
            <b-radio-group v-model="apiDataConfig.type" type="button" size="mini">
              <b-radio v-for="(val, key) in ApiTypeMap" :key="key" :label="key">{{ val }}</b-radio>
            </b-radio-group>
          </g-field>
          <!--静态编辑器-->
          <data-editor
            v-if="apiDataConfig.type === ApiType.static"
            :model-value="apiDataConfig.config.data"
            :height="staticEditorHeight"
            @change="updateData"
          />
          <!--选择分析模型-->
          <div v-else class="pt-10">
            <div class="data-result-title">选择分析模型</div>
            <div class="p16">
              <b-tree :data="modelTree" titleKey="name" default-expand @select-change="handleChange"></b-tree>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <source-drawer ref="sourceDrawerRef" /> -->
  </div>
</template>

<script>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { createDataSources, ApiType } from '@/config/data-source'
import { loadAsyncComponent } from '@/utils/async-component'
import { useStore } from '@/store'
import { on, off } from '@/utils/util'
import { Message } from 'bin-ui-next'
// import SourceDrawer from './source-drawer.vue'

export default {
  name: 'source-panel',
  components: {
    // SourceDrawer,
    DataEditor: loadAsyncComponent(() => import('../components/data-editor.vue')),
  },
  setup() {
    const staticEditorHeight = ref('260px')
    const sourceDrawerRef = ref(null)

    const treeData = inject('ModelTree', [])
    const modelTree = computed(() => {
      const mapper = node => {
        const modelId = apiDataConfig.value.config ? apiDataConfig.value.config.modelId : ''
        const mapperNode = {
          ...node,
          icon: node.directory === 'Y' ? 'folder' : node.modelType === 'DM' ? 'deploymentunit' : 'database',
          selected: modelId === node.id,
        }
        if (node.children && node.children.length) {
          mapperNode.children = node.children.map(mapper)
        }
        return mapperNode
      }
      return treeData.value.map(mapper)
    })

    const { schemaStore, storeToRefs } = useStore()
    const { selectedCom } = storeToRefs(schemaStore)
    const apiDataConfig = computed(() => selectedCom.value.apiData)

    const updateData = data => {
      apiDataConfig.value.config.data = data
    }

    const calcEdit = () => {
      staticEditorHeight.value = `${document.body.clientHeight - 260}px`
    }

    const handleChange = (val, node) => {
      if (node.directory === 'Y') {
        node.selected = false
        Message.warning('不能选择文件夹！')
      } else {
        if (apiDataConfig.value.config.modelId === node.id) {
          node.selected = true
        }
        sourceDrawerRef.value?.open({ modelId: node.id, modelName: node.name })
      }
    }

    onMounted(() => {
      calcEdit()
      on(window, 'resize', calcEdit)
    })
    onBeforeUnmount(() => {
      off(window, 'resize', calcEdit)
    })

    return {
      staticEditorHeight,
      sourceDrawerRef,
      ApiType,
      apiDataConfig,
      modelTree,
      handleChange,
      ApiTypeMap: createDataSources(),
      updateData,
    }
  },
}
</script>

<style lang="stylus" scoped>
.data-source-config {
  :deep(.bin-tree) {
    color: var(--schema-font-color);
    .bin-tree-title, .bin-tree-render-title {
      border: 1px solid transparent;
      &.is-selected, &:hover {
        background: rgba(118, 150, 202, .1);
        border-color: var(--bin-color-primary);
      }
    }
  }
}
</style>
