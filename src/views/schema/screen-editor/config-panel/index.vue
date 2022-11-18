<template>
  <div class="config-panel-wp" :class="{ 'is-hide': !toolbar.config }">
    <div class="config-panel">
      <div v-if="selectedCom || isMultiSelect" class="page-config-panel">
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
              <b-tooltip content="事件">
                <b-icon name="deploymentunit" size="18"></b-icon>
              </b-tooltip>
            </div>
          </div>
        </div>
        <div class="page-config-content" v-if="isMultiSelect">
          <multi-setting></multi-setting>
        </div>
        <div class="page-config-content" v-else>
          <div style="height: 100%">
            <SettingPanel :key="selectedCom.id" v-if="curTabIndex === 0" />
            <DataCenterPanel :key="selectedCom.id" v-if="curTabIndex === 1" />
            <EventsPanel :key="selectedCom.id" v-if="curTabIndex === 2" />
          </div>
        </div>
      </div>
      <page-config v-else />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '@/store'
import PageConfig from '@/views/schema/screen-editor/config-panel/page-config.vue'
import DataCenterPanel from '@/views/schema/screen-editor/config-panel/data-center-panel/index.vue'
import SettingPanel from '@/views/schema/screen-editor/config-panel/setting-panel/index.vue'
import MultiSetting from '@/views/schema/screen-editor/config-panel/setting-panel/multi-setting.vue'
import EventsPanel from './events-panel/index.vue'

const { schemaStore, storeToRefs } = useStore()
const { toolbar, selectedCom, isMultiSelect } = storeToRefs(schemaStore)
// tab切换
const curTabIndex = ref(0)
const changeTab = index => {
  if (isMultiSelect.value && index > 0) return

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
</script>
