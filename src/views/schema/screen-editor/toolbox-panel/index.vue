<template>
  <div :class="['toolbox-panel-wp', { 'is-hide':!toolbar.toolbox }]">
    <div class="toolbox-panel">
      <div class="btn-box">参考线&nbsp;&nbsp;
        <b-switch v-model="toolbox.referLine" size="small"></b-switch>
      </div>
      <div class="btn-box">对齐线&nbsp;&nbsp;
        <b-switch v-model="toolbox.markLine" size="small"></b-switch>
      </div>
    </div>
  </div>
</template>

<script>
import useSchemaStore from '@/hooks/schema/useSchemaStore'

export default {
  name: 'toolbox-panel',
  setup() {
    const { toolbar, toolbox } = useSchemaStore()
    return {
      toolbar,
      toolbox,
    }
  },
}
</script>
