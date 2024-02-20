<template>
  <div class="config-panel-wp" :class="{ 'is-hide': !toolbar.config }">
    <div class="config-panel">
      <div v-if="selectedCom || isMultiSelect" class="page-config-panel">
        <template v-if="selectedCom">
          <div class="page-config-top">
            <b-radio-group v-model="curTabIndex" size="large" type="capsule" style="width: 100%">
              <b-radio :label="0">
                <span class="mr-8">定制</span>
                <b-icon name="project"></b-icon>
              </b-radio>
              <b-radio :label="1" :disabled="isGroupChild">
                <span class="mr-8">动画</span>
                <b-icon name="shake"></b-icon>
              </b-radio>
              <b-radio :label="2" :disabled="curComIsGroup">
                <span class="mr-8">数据</span>
                <b-icon name="thunderbolt"></b-icon>
              </b-radio>
              <b-radio :label="3" :disabled="curComIsGroup">
                <span class="mr-8">事件</span>
                <b-icon name="rocket"></b-icon>
              </b-radio>
            </b-radio-group>
          </div>
          <div class="page-config-content">
            <b-scrollbar>
              <SettingPanel :key="selectedCom.id" v-if="curTabIndex === 0" />
              <AnimationsPanel :key="selectedCom.id" v-if="curTabIndex === 1" />
              <DataCenterPanel :key="selectedCom.id" v-if="curTabIndex === 2" />
              <EventsPanel :key="selectedCom.id" v-if="curTabIndex === 3" />
            </b-scrollbar>
          </div>
        </template>

        <div class="page-config-content" v-if="isMultiSelect">
          <multi-setting></multi-setting>
        </div>
      </div>
      <page-config v-else />
    </div>

    <div
      class="cfg-toggle-bar"
      :class="{ open: toolbar.config }"
      @click="schemaStore.toggleConfigPanel()"
    >
      <div class="cfg-toggle-bar__top"></div>
      <div class="cfg-toggle-bar__bottom"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from '@/store'
import PageConfig from '@/views/schema/screen-editor/config-panel/page-config.vue'
import DataCenterPanel from '@/views/schema/screen-editor/config-panel/data-center-panel/index.vue'
import SettingPanel from '@/views/schema/screen-editor/config-panel/setting-panel/index.vue'
import AnimationsPanel from '@/views/schema/screen-editor/config-panel/animations-panel/index.vue'
import MultiSetting from '@/views/schema/screen-editor/config-panel/setting-panel/multi-setting.vue'
import { isEmpty } from '@/utils/util'
import EventsPanel from './events-panel/index.vue'

const { schemaStore, storeToRefs } = useStore()
const { toolbar, selectedCom, isMultiSelect, curComIsGroup } = storeToRefs(schemaStore)
// tab切换
const curTabIndex = ref(0)

const isGroupChild = computed(() => !isEmpty(selectedCom.value.groupStyle))

watch(
  () => selectedCom.value,
  () => {
    curTabIndex.value = 0
  },
)
</script>

<style scoped>
.config-panel-wp {
  position: relative;
  z-index: 90;
  width: var(--schema-options-width);
  height: 100%;
  background: var(--schema-color-bg-2);
  transition: width 0.25s ease-in-out;
  border-left: 1px solid var(--schema-color-border);
  .page-config-panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .config-panel {
    width: var(--schema-options-width);
    height: 100%;
    background: var(--schema-color-bg-2);
    transition: 0.25s ease-in-out;
    user-select: none;
    overflow: hidden;

    .page-config-top {
      width: 100%;
      height: 56px;
      padding: 10px;
    }

    .page-config-content {
      overflow: hidden;
      height: calc(100% - 60px);
      :deep(.setting-panel-gui) {
        padding: 0 10px 32px;
        .series-title {
          position: relative;
          padding: 0 12px 0 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          &::before {
            content: '';
            position: absolute;
            top: 12px;
            left: 0px;
            width: 6px;
            height: 6px;
            background: var(--bin-color-primary);
          }
        }
      }
    }
  }
  &.is-hide {
    width: 0;
    .config-panel {
      transform: translateX(100%);
    }
  }
  .cfg-toggle-bar {
    cursor: pointer;
    height: 72px;
    width: 32px;
    position: absolute;
    top: calc(50% - 36px);
    left: -28px;

    .cfg-toggle-bar__top,
    .cfg-toggle-bar__bottom {
      position: absolute;
      width: 4px;
      border-radius: 2px;
      height: 38px;
      left: 14px;
      background-color: rgb(64, 64, 67);
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .cfg-toggle-bar__bottom {
      position: absolute;
      top: 34px;
    }
    &:hover {
      .cfg-toggle-bar__top {
        transform: rotate(12deg) scale(1.15) translateY(-2px);
      }
      .cfg-toggle-bar__bottom {
        transform: rotate(-12deg) scale(1.15) translateY(2px);
      }
    }
    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>
