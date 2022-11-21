<template>
  <div class="action-bar-wrap" :style="actionStyle">
    <i
      class="action-btn b-iconfont b-icon-aim"
      title="最佳画布比例"
      @click.stop="schemaStore.autoCanvasScale()"
    />
    <i
      class="action-btn b-iconfont b-icon-icon-test"
      title="1:1画布大小"
      @click.stop="schemaStore.setCanvasScale(100)"
    />
    <i
      class="action-btn b-iconfont b-icon-rollback"
      title="撤销"
      :class="{ disabled: undoDisable }"
      @click.stop="undo"
    />
    <i
      class="action-btn b-iconfont b-icon-rollback"
      title="重做"
      :class="{ disabled: redoDisable }"
      @click.stop="redo"
      style="transform: rotateY(180deg)"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const { undoDisable, redoDisable } = storeToRefs(schemaStore)
const actionStyle = computed(() => (schemaStore.toolbar.config ? { right: '330px' } : { right: 0 }))

const undo = () => schemaStore.undo()
const redo = () => schemaStore.redo()
</script>

<style scoped lang="stylus">
.action-bar-wrap {
  position: fixed;
  width: 32px;
  right: 330px;
  z-index: 2;
  min-height: 32px;
  background-color: var(--schema-color-bg-dark);
  border-left: 1px solid var(--schema-color-bg-deep);
  border-right: 1px solid var(--schema-color-bg-deep);
  display: flex;
  flex-direction: column;
  transition: .25s ease-in-out;
  .action-btn {
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-bottom: 1px solid var(--schema-color-bg-deep);
    &:hover {
      background-color: var(--schema-color-bg-deep);
    }
    &.disabled {
      background: var(--schema-color-bg-disabled);
      border-color: var(--schema-ui-border);
      color: #86898f;
      cursor: not-allowed;
    }
  }
}
</style>
