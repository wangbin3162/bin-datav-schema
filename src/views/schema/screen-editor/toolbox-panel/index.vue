<template>
  <div :class="['toolbox-panel-wp', { 'is-hide': !toolbar.toolbox }]">
    <div class="toolbox-panel" flex="main:justify">
      <div style="width: 500px" flex>
        <b-button size="mini" @click="undo">
          <i class="action-btn b-iconfont b-icon-rollback"></i>
          撤销
        </b-button>
        <b-button size="mini" @click="redo">
          <i class="action-btn b-iconfont b-icon-rollback" style="transform: rotateY(180deg)" />
          重做
        </b-button>
        <div></div>
        <div class="btn-box">
          参考线&nbsp;&nbsp;
          <b-switch v-model="toolbox.referLine" size="small"></b-switch>
        </div>
        <div class="btn-box">
          对齐线&nbsp;&nbsp;
          <b-switch v-model="toolbox.markLine" size="small"></b-switch>
        </div>
      </div>
      <div class="ctrl-box">
        &nbsp;&nbsp;
        <b-button size="mini" icon="clear" @click="clearCanvas">清空画布</b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { MessageBox } from 'bin-ui-next'
import { useStore } from '@/pinia'

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const { toolbar, toolbox } = storeToRefs(schemaStore)

const clearCanvas = () => {
  MessageBox.confirm({
    type: 'error',
    title: '确认清空画布吗？请谨慎操作！',
  })
    .then(() => {
      schemaStore.clearScreen()
    })
    .catch(() => {})
}

const undo = () => schemaStore.undo()
const redo = () => schemaStore.redo()
</script>
