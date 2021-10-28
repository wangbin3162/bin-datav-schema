<template>
  <div class="header-container">
    <div class="left-actions">
      <b-space size="mini">
        <b-tooltip content="图层" :open-delay="500">
          <div class="head-btn" :class="{active:toolbar.layer}" @click="toggleLayerPanel()">
            <b-icon name="container"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="组件列表" :open-delay="500">
          <div class="head-btn" :class="{active:toolbar.components}" @click="toggleCompsPanel()">
            <b-icon name="hourglass" class="com-list-icon" :class="{'is-rotate':!toolbar.components}"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="右侧面板" :open-delay="500">
          <div class="head-btn" :class="{active:toolbar.config}" @click="toggleConfigPanel()">
            <b-icon name="control"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="工具箱" :open-delay="500">
          <div class="head-btn" :class="{active:toolbar.toolbox}" @click="toggleToolbox()">
            <b-icon name="shopping"></b-icon>
          </div>
        </b-tooltip>
      </b-space>
    </div>
    <div class="screen-info">
      <b-tooltip content="返回" :open-delay="500">
        <b-icon name="laptop" type="button" @click="handleBack"></b-icon>
      </b-tooltip>
      <span>工作空间</span>
      <span style="padding: 0 6px 0 12px;">-</span>
      <input
        class="header-input"
        placeholder="请输入名称"
        maxlength="50"
        type="text"
        v-model="pageInfo.name"
      >
    </div>
    <div class="global-actions">
      <b-space size="mini">
        <b-tooltip content="保存快照" :open-delay="500">
          <div class="head-btn" @click="copyCfg">
            <b-icon name="codelibrary"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="保存" :open-delay="500">
          <div class="head-btn" @click="handleSave">
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
            <b-icon name="eye"></b-icon>
          </div>
        </b-tooltip>
      </b-space>
    </div>
  </div>
  <head-loading />
  <publish-screen v-model="publishVisible" :project-id="publishAppId"></publish-screen>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { Message } from 'bin-ui-next'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { copyText, logger } from '@/utils/util'
import { ref } from 'vue'
import HeadLoading from '@/views/schema/screen-editor/header-bar/head-loading.vue'
import PublishScreen from '@/views/schema/screen-editor/header-bar/publish-screen.vue'

export default {
  name: 'header-bar',
  components: { PublishScreen, HeadLoading },
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
    const $router = useRouter()
    const $route = useRoute()
    const storeStatus = useSchemaStore()
    const publishVisible = ref(false)
    const publishAppId = ref('')

    const handleBack = () => {
      const path = props.backUrl || '/'
      if (props.backTarget === '_blank') {
        const route = $router.resolve(path)
        window.open(route.href, props.backTarget)
      } else {
        $router.push(path)
      }
    }

    // 复制json至剪切板
    const copyCfg = async () => {
      const { data } = await storeStatus.saveScreenData()
      await copyText(JSON.stringify(data))
      logger.primary('已拷贝配置至剪切板！')
    }

    // 保存
    const handleSave = async () => {
      const oldId = storeStatus.pageInfo.value.id // 缓存原有id
      const { data } = await storeStatus.saveScreenData()
      if (!oldId) {
        let routeData = $router.resolve({
          path: '/schema/screen',
          query: { id: data.pageInfo.id },
        })
        window.location.replace(routeData.href)
      }
      Message.success({ message: '保存成功！', showClose: true })
    }

    // 预览
    const handPreview = async () => {
      const { data } = await storeStatus.saveScreenData()
      let routeData = $router.resolve({ path: `/screen/preview/${data.pageInfo.id}`, query: {} })
      window.open(routeData.href, '_blank')
    }

    // 发布
    const handlePublish = () => {
      publishVisible.value = true
      publishAppId.value = $route.query.id
    }

    return {
      ...storeStatus,
      publishVisible,
      publishAppId,
      copyCfg,
      handleBack,
      handleSave,
      handPreview,
      handlePublish,
    }
  },
}
</script>
