<template>
  <div class="schema-screen-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <header-bar ref="headerRef" back-url="/analysisDashboard" />
    <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
      <svg-loading name="loading02" />
    </div>
    <div v-else class="editor-main-wrapper">
      <components-panel />
      <layer-panel></layer-panel>
      <div class="edit-main-wp">
        <toolbox-panel />
        <canvas-main />
        <footer-panel />
      </div>
      <config-panel />
    </div>
    <context-menu ref="contextMenuRef" />
  </div>
</template>

<script>
import HeaderBar from '@/views/schema/screen-editor/header-bar/index.vue'
import LayerPanel from '@/views/schema/screen-editor/layer-panel/index.vue'
import ComponentsPanel from '@/views/schema/screen-editor/components-panel/index.vue'
import CanvasMain from '@/views/schema/screen-editor/canvas-main/index.vue'
import ConfigPanel from '@/views/schema/screen-editor/config-panel/index.vue'
import ToolboxPanel from '@/views/schema/screen-editor/toolbox-panel/index.vue'
import FooterPanel from '@/views/schema/screen-editor/footer-panel/index.vue'
import ContextMenu from '@/views/schema/screen-editor/context-menu/index.vue'
import usePage from '@/hooks/schema/usePage'
import useShortcuts from '@/hooks/schema/useShortcuts'

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
  },
  setup() {
    return {
      ...usePage(),
      ...useShortcuts(),
    }
  },
}
</script>
