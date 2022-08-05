<template>
  <div class="header-container">
    <div class="left-actions">
      <b-space size="mini">
        <b-tooltip content="组件" :open-delay="500">
          <div class="head-btn" :class="{ active: toolbar.components }" @click="schemaStore.toggleCompsPanel()">
            <b-icon name="hourglass" class="com-list-icon" :class="{ 'is-rotate': !toolbar.components }"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="图层" :open-delay="500">
          <div class="head-btn" :class="{ active: toolbar.layer }" @click="schemaStore.toggleLayerPanel()">
            <b-icon name="container"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="右侧面板" :open-delay="500">
          <div class="head-btn" :class="{ active: toolbar.config }" @click="schemaStore.toggleConfigPanel()">
            <b-icon name="control"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="工具箱" :open-delay="500">
          <div class="head-btn" :class="{ active: toolbar.toolbox }" @click="schemaStore.toggleToolbox()">
            <b-icon name="shopping"></b-icon>
          </div>
        </b-tooltip>
      </b-space>
    </div>
    <div class="screen-info">
      <b-tooltip content="返回" :open-delay="500">
        <b-icon name="laptop" type="button" @click="handleBack"></b-icon>
      </b-tooltip>
      <span>分析看板</span>
      <span style="padding: 0 6px 0 12px">-</span>
      <input class="header-input" placeholder="请输入名称" maxlength="50" type="text" v-model="pageInfo.name" />
    </div>
    <div class="global-actions">
      <b-space size="mini">
        <b-tooltip content="导入json (会覆盖所有内容！)" :open-delay="500">
          <b-upload action="/" :show-upload-list="false" :before-upload="handleUpload">
            <div class="head-btn">
              <b-icon name="Import"></b-icon>
            </div>
          </b-upload>
        </b-tooltip>
        <b-tooltip content="保存模板" :open-delay="500">
          <div class="head-btn" @click="tempVisible = true">
            <b-icon name="Storedprocedure"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="保存" :open-delay="500">
          <div class="head-btn" @click="handleSaveScreen">
            <b-icon name="save"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="发布" :open-delay="500">
          <div class="head-btn" @click="handlePublish">
            <b-icon name="send"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="预览" :open-delay="500">
          <div class="head-btn" @click="handPreview">
            <b-icon name="View"></b-icon>
          </div>
        </b-tooltip>
      </b-space>
    </div>
  </div>
  <head-loading />
  <save-screen v-model="saveVisible" :status="saveStatus" />
  <save-template v-model="tempVisible" />
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import HeadLoading from './head-loading.vue'
import SaveScreen from './save-screen.vue'
import SaveTemplate from './save-template.vue'
import { Message } from 'bin-ui-next'
import { readFileText } from '@/utils/file-helper'
import { useStore } from '@/pinia'
import useSavePreview from '@/hooks/schema/useSavePreview'

export default {
  name: 'header-bar',
  components: { SaveTemplate, SaveScreen, HeadLoading },
  props: {
    backUrl: {
      type: String,
    },
    backTarget: {
      type: String,
      default: '_blank', // _self
      validator: val => ['_self', '_blank'].includes(val),
    },
    pageStatus: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const router = useRouter()
    const { schemaStore, storeToRefs } = useStore()
    const { pageInfo, toolbar } = storeToRefs(schemaStore)
    const { previewScreen } = useSavePreview()
    const saveVisible = ref(false)
    const saveStatus = ref('edit')
    const tempVisible = ref(false)

    const handleBack = () => {
      const path = props.backUrl || '/'
      if (props.backTarget === '_blank') {
        const route = router.resolve(path)
        window.open(route.href, props.backTarget)
      } else {
        router.push(path)
      }
    }

    const handleUpload = file => {
      if (file.type !== 'application/json') {
        Message.warning('请选择正确的json配置文件')
        return false
      }
      readFileText(file).then(data => {
        try {
          const screenData = JSON.parse(data)
          const { comps, pageConfig } = screenData
          schemaStore.loadScreenData({ comps, pageConfig })
        } catch (e) {
          console.warn('The imported file could not be converted to the correct JSON!')
        }
      })
      return false
    }

    // 保存
    const handleSaveScreen = () => {
      saveStatus.value = 'edit'
      saveVisible.value = true
    }

    // 发布
    const handlePublish = () => {
      saveStatus.value = 'audited'
      saveVisible.value = true
    }

    // 预览
    const handPreview = async () => {
      const data = await previewScreen()
      let routeData = router.resolve({ path: `/screen/preview/${data.pageInfo.id}` })
      window.open(routeData.href, '_blank')
    }

    return {
      schemaStore,
      pageInfo,
      toolbar,
      saveVisible,
      saveStatus,
      tempVisible,
      handleBack,
      handleSaveScreen,
      handPreview,
      handlePublish,
      handleUpload,
    }
  },
}
</script>
