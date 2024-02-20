<template>
  <div class="schema-screen-container" @wheel.ctrl.prevent="ctrlMouseWheel">
    <header-bar ref="headerRef" back-url="/" />
    <div v-if="loading" flex="main:center cross:center" class="full-wrapper">
      <g-loading spinning />
    </div>
    <div v-else class="editor-main-wrapper">
      <components-panel />
      <layer-panel></layer-panel>
      <div class="edit-main-wp">
        <canvas-main />
        <footer-panel />
      </div>
      <config-panel />
    </div>
    <context-menu ref="contextMenuRef" />
  </div>
</template>

<script setup>
import HeaderBar from '@/views/schema/screen-editor/header-bar/index.vue'
import ComponentsPanel from '@/views/schema/screen-editor/components-panel/index.vue'
import LayerPanel from '@/views/schema/screen-editor/layer-panel/index.vue'
import CanvasMain from '@/views/schema/screen-editor/canvas-main/index.vue'
import ConfigPanel from '@/views/schema/screen-editor/config-panel/index.vue'
import FooterPanel from '@/views/schema/screen-editor/footer-panel/index.vue'
import ContextMenu from '@/views/schema/screen-editor/context-menu/index.vue'
import usePage from '@/hooks/schema/usePage'
import useShortcuts from '@/hooks/schema/useShortcuts'

defineOptions({
  name: 'ScreenEditor',
})

const { loading } = usePage()
const { headerRef, contextMenuRef, ctrlMouseWheel } = useShortcuts()
</script>

<style scoped>
.schema-screen-container {
  position: relative;
  min-width: 1200px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  font-size: 14px;
  color: var(--s-text-color);
  .editor-main-wrapper {
    display: flex;
    width: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
    flex-wrap: nowrap;
    height: calc(100% - 50px);
    .edit-main-wp {
      position: relative;
      z-index: 2;
      height: 100%;
      overflow: hidden;
      flex-direction: column;
      flex: 1;
    }
  }
}
</style>
