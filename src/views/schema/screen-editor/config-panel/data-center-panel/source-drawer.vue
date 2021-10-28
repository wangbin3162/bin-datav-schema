<template>
  <b-drawer
    v-model="visible"
    class-name="source-drawer"
    :width="500"
    title="配置数据源"
    append-to-body
    :styles="{padding: 0}"
  >
    <ds-api v-if="visible"></ds-api>
  </b-drawer>
</template>

<script>
import { ref } from 'vue'
import DsApi from '@/views/schema/screen-editor/config-panel/data-center-panel/ds-api.vue'

export default {
  name: 'source-drawer',
  components: { DsApi },
  setup() {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }
    return {
      visible,
      open,
    }
  },
}
</script>

<style lang="stylus">
.bin-drawer-wrap.source-drawer {
  .bin-drawer-content {
    background: #1d2126;
  }
  .bin-drawer-header {
    border-bottom: 1px solid var(--schema-color-border);
    padding: 16px;
    p, .bin-drawer-header-inner {
      color: #fff;
    }
  }
}
</style>
