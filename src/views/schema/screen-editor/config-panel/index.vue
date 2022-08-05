<template>
  <div class="config-panel-wp" :class="{ 'is-hide': !toolbar.config }">
    <div class="config-panel">
      <page-config v-if="!selectedCom"></page-config>
      <div v-else class="page-config-panel">
        <div class="page-config-top">
          <div class="tabs-wrapper">
            <div class="tab-item" :class="{ active: curTabIndex === 0 }" @click="changeTab(0)">
              <b-tooltip content="配置">
                <b-icon name="control" size="20"></b-icon>
              </b-tooltip>
            </div>
            <div class="tab-item" :class="{ active: curTabIndex === 1 }" @click="changeTab(1)">
              <b-tooltip content="数据">
                <b-icon name="cloud-server" size="22"></b-icon>
              </b-tooltip>
            </div>
            <div class="tab-item" :class="{ active: curTabIndex === 2 }" @click="changeTab(2)">
              <b-tooltip content="交互">
                <b-icon name="deploymentunit" size="18"></b-icon>
              </b-tooltip>
            </div>
          </div>
        </div>
        <div class="page-config-content">
          <div v-if="curTabIndex === 0" style="height: 100%">
            <setting-panel :key="selectedCom.id" />
          </div>
          <div v-if="curTabIndex === 1" style="height: 100%">
            <data-center-panel :key="selectedCom.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { Message } from 'bin-ui-next'
import { useStore } from '@/pinia'
import PageConfig from '@/views/schema/screen-editor/config-panel/page-config.vue'
import DataCenterPanel from '@/views/schema/screen-editor/config-panel/data-center-panel/index.vue'
import SettingPanel from '@/views/schema/screen-editor/config-panel/setting-panel/index.vue'

export default {
  name: 'config-panel',
  components: { PageConfig, SettingPanel, DataCenterPanel },
  setup() {
    const { schemaStore, storeToRefs } = useStore()
    const { toolbar, selectedCom } = storeToRefs(schemaStore)
    // tab切换
    const curTabIndex = ref(0)
    const changeTab = index => {
      if (index === 2) {
        Message.warning('暂未开放!')
        return
      }
      if (curTabIndex.value !== index) {
        curTabIndex.value = index
      }
    }
    watch(
      () => selectedCom.value,
      () => {
        curTabIndex.value = 0
      },
    )
    return {
      toolbar,
      selectedCom,
      curTabIndex,
      changeTab,
    }
  },
}
</script>
