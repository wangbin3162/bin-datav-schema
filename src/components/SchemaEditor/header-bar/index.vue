<template>
  <div class="header-container">
    <div class="left-actions">
      <b-space size="mini">
        <b-tooltip content="图层" theme="light" :open-delay="300">
          <div class="head-btn" :class="{active:pageConfig.layerExpand}" @click="toggleLayerPanel()">
            <b-icon name="container"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="组件列表" theme="light" :open-delay="300">
          <div class="head-btn" :class="{active:pageConfig.componentsExpand}" @click="toggleCompsPanel()">
            <b-icon name="hourglass" class="com-list-icon" :class="{'is-rotate':!pageConfig.componentsExpand}"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="右侧面板" theme="light" :open-delay="300">
          <div class="head-btn" :class="{active:pageConfig.configExpand}" @click="toggleConfigPanel()">
            <b-icon name="control"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="工具箱" theme="light" :open-delay="300">
          <div class="head-btn" :class="{active:pageConfig.toolboxShow}" @click="toggleToolbox()">
            <b-icon name="shopping"></b-icon>
          </div>
        </b-tooltip>
      </b-space>
    </div>
    <div class="screen-info">
      <b-tooltip content="返回" theme="light" :open-delay="300">
        <b-icon name="laptop" type="button" @click="handleBack"></b-icon>
      </b-tooltip>
      <span>工作空间</span>
      <span style="padding: 0 6px 0 12px;">-</span>
      <input
        class="header-input"
        placeholder="请输入名称"
        maxlength="50"
        type="text"
        v-model="name"
        @input="handleInputChange"
      >
    </div>
    <div class="global-actions">
      <b-space size="mini">
        <b-tooltip content="帮助" theme="light" :open-delay="300">
          <div class="head-btn" @click="handleHelp">
            <b-icon name="question-circle"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="保存" theme="light" :open-delay="300">
          <div class="head-btn" @click="handleSave">
            <b-icon name="save"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="预览" theme="light" :open-delay="300">
          <div class="head-btn" @click="handPreview">
            <b-icon name="eye"></b-icon>
          </div>
        </b-tooltip>
        <b-tooltip content="发布" theme="light" :open-delay="300">
          <div class="head-btn" @click="handlePublish">
            <b-icon name="send"></b-icon>
          </div>
        </b-tooltip>
      </b-space>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Message } from 'bin-ui-next'
import { useStore } from 'vuex'
import useSchemaStore from '@/hooks/schema-store/useSchemaStore'

export default {
  name: 'header-bar',
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
    const name = ref('')
    const $router = useRouter()

    const storeStatus = useSchemaStore()

    const handleBack = () => {
      const path = props.backUrl || '/'
      if (props.backTarget === '_blank') {
        const route = $router.resolve(path)
        window.open(route.href, props.backTarget)
      } else {
        $router.push(path)
      }
    }

    const handleSave = () => {
      Message.info({ message: 'handleSave', showClose: true })
    }

    const handleHelp = () => {
      Message.success({ message: 'handleHelp', showClose: true })
    }

    const handPreview = () => {
      Message.warning({ message: 'handPreview', showClose: true })
    }

    const handlePublish = () => {
      Message.error({ message: 'handlePublish', showClose: true })
    }

    const handleInputChange = (e) => {
      storeStatus.pageInfo.value.dashboardName = e.target.value.trim()
    }

    watch(() => storeStatus.pageInfo.value, val => {
      name.value = val.dashboardName || '未命名'
    }, { immediate: true })

    return {
      name,
      ...storeStatus,
      handleBack,
      handleSave,
      handleHelp,
      handPreview,
      handlePublish,
      handleInputChange,
    }
  },
}
</script>
