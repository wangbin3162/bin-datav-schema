<template>
  <div class="components-panel-wp" :class="{'is-hide':!pageConfig.componentsExpand}">
    <div class="components-panel">
      <div class="panel-title">
        <span class="panel-text" @click="toggleCompsPanel(true)">
          {{ pageConfig.componentsExpand ? '全部组件' : '组件' }}
        </span>
        <i class="b-iconfont b-icon-left comps-action" title="收起" @click="toggleCompsPanel(false)"></i>
      </div>
      <div class="components-panel-content">
        <div class="components-type">
          <b-scrollbar>
            <div class="components-item active">
              <b-icon class="com-tab-icon" name="linechart" size="16"></b-icon>
              <span class="com-tab-title">线图</span>
            </div>
            <div class="components-item">
              <b-icon class="com-tab-icon" name="barchart" size="16"></b-icon>
              <span class="com-tab-title">柱图</span>
            </div>
          </b-scrollbar>
        </div>
        <div class="components-list p5" v-show="pageConfig.componentsExpand">
          组件列表
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'

export default {
  name: 'components-panel',
  setup() {
    const { pageConfig, toggleCompsPanel } = useSchemaStore()
    return {
      pageConfig,
      toggleCompsPanel,
    }
  },
}
</script>

