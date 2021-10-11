<template>
  <div class="layer-panel-wp" :class="{'is-hide':!pageConfig.layerExpand}">
    <div class="layer-panel">
      <div class="layer-top">
        <div class="layer-num pl-10">图层</div>
        <div class="layer-action" @click="toggleLayerPanel(false)">
          <i class="b-iconfont b-icon-left" title="收起"></i>
        </div>
      </div>
      <div class="p5">图层功能面板</div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'

export default {
  name: 'layer-panel',
  setup() {
    const { pageConfig, toggleLayerPanel } = useSchemaStore()
    return {
      pageConfig,
      toggleLayerPanel,
    }
  },
}
</script>
