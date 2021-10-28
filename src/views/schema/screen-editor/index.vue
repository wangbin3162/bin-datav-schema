<template>
  <div class="schema-screen-container">
    <header-bar back-url="/dashboardDemo"></header-bar>
    <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
      <svg-loading name="loading02" />
    </div>
    <div v-else class="editor-main-wrapper">
      <layer-panel></layer-panel>
      <components-panel></components-panel>
      <div class="edit-main-wp">
        <toolbox-panel></toolbox-panel>
        <canvas-main></canvas-main>
        <footer-panel></footer-panel>
      </div>
      <config-panel></config-panel>
    </div>
    <context-menu></context-menu>
  </div>
</template>

<script>
import '@/assets/stylus/schema/index.styl'
import SvgLoading from '@/components/Common/SvgLoading/index.vue'
import HeaderBar from '@/views/schema/screen-editor/header-bar/index.vue'
import LayerPanel from '@/views/schema/screen-editor/layer-panel/index.vue'
import ComponentsPanel from '@/views/schema/screen-editor/components-panel/index.vue'
import CanvasMain from '@/views/schema/screen-editor/canvas-main/index.vue'
import ConfigPanel from '@/views/schema/screen-editor/config-panel/index.vue'
import ToolboxPanel from '@/views/schema/screen-editor/toolbox-panel/index.vue'
import FooterPanel from '@/views/schema/screen-editor/footer-panel/index.vue'
import ContextMenu from '@/views/schema/screen-editor/context-menu/index.vue'
import usePage from '@/hooks/schema/usePage'
import { onMounted } from 'vue'
import { setAttrVar } from '@/config/setting.cfg'

export default {
  name: 'ScreenEditor',
  components: {
    ContextMenu,
    FooterPanel,
    ToolboxPanel,
    CanvasMain,
    ConfigPanel,
    ComponentsPanel,
    LayerPanel,
    HeaderBar,
    SvgLoading,
  },
  setup() {
    const pageStatus = usePage()
    onMounted(() => {
      setAttrVar('data-schema', 'screen-editor')
    })
    return {
      ...pageStatus,
    }
  },
}
</script>
