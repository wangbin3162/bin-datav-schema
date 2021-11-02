<template>
  <div :class="['toolbox-panel-wp', { 'is-hide':!toolbar.toolbox }]">
    <div class="toolbox-panel" flex="main:justify">
      <div style="width: 500px;" flex>
        <div class="btn-box">参考线&nbsp;&nbsp;
          <b-switch v-model="toolbox.referLine" size="small"></b-switch>
        </div>
        <div class="btn-box">对齐线&nbsp;&nbsp;
          <b-switch v-model="toolbox.markLine" size="small"></b-switch>
        </div>
      </div>
      <div class="ctrl-box">&nbsp;&nbsp;
        <b-button size="mini" icon="clear" @click="clearCanvas">清空画布</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { MessageBox } from 'bin-ui-next'

export default {
  name: 'toolbox-panel',
  setup() {
    const { store, toolbar, toolbox } = useSchemaStore()
    const clearCanvas = () => {
      MessageBox.confirm({
        type: 'error',
        title: '确认清空画布吗？请谨慎操作！',
      }).then(() => {
        store.dispatch('schema/clearScreen')
      }).catch(() => {
      })
    }
    return {
      toolbar,
      toolbox,
      clearCanvas,
    }
  },
}
</script>
