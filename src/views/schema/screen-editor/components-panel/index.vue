<template>
  <div class="components-panel-wp" :class="{ 'is-hide': !toolbar.components }">
    <div class="components-panel">
      <div class="panel-title">
        <span class="panel-text">组件</span>
      </div>
      <div class="components-panel-content" @dragover="dragOver">
        <div class="components-type">
          <b-scrollbar native>
            <div
              class="components-item"
              v-for="(group, index) in componentList"
              :key="index"
              :class="{ active: activeGroup.type === group.type }"
              @click="changeComp(group)"
            >
              <b-icon class="com-tab-icon" :name="group.icon"></b-icon>
              <span class="com-tab-title">{{ group.name }}</span>
            </div>
          </b-scrollbar>
        </div>
      </div>
      <div class="components-list" v-show="toolbar.components">
        <div class="components-list-top">
          <div class="action" @click="closePanel">
            <i class="b-iconfont b-icon-left" title="收起"></i>
          </div>
        </div>
        <div class="components-list-content">
          <b-scrollbar native>
            <Collapse
              v-for="(group, index) in groups"
              :key="index"
              :name="index"
              :title="group.name"
            >
              <Comps :comps="group.comps" @dragstart="dragStart" @click="toAddCom" />
            </Collapse>

            <Comps :comps="comps" @dragstart="dragStart" @click="toAddCom" />

            <TopoList
              v-if="activeGroup.type === 'topology'"
              @dragstart="dragTopoStart"
              @click="toAddTopoComp"
            />

            <PresetList
              v-if="activeGroup.type === 'presets'"
              @dragstart="dragImageStart"
              @click="toAddImageComp"
            />

            <ImagesList
              v-if="activeGroup.type === 'images'"
              @dragstart="dragImageStart"
              @click="toAddImageComp"
            />

            <CompList
              v-if="activeGroup.type === 'comps'"
              @dragstart="dragCustomCompStart"
              @click="toAddCustomComp"
            />
          </b-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { componentList } from '@/config/components-list'
import { computed, ref } from 'vue'
import { createComponent } from '@/config/components-cfg'
import { getStaticData } from '@/api/database.api'
import { ApiType } from '@/config/data-source'
import { getNewCopyCom } from '@/store/schema/page'
import { getDefaultImageConfig } from '@/components/Schema/basic/image/config'
import { getDefaultTopoConfig } from '@/components/Schema/topology/topo/config'
import Comps from './comps.vue'
import Collapse from './collapse.vue'
import TopoList from './topo-list.vue'
import PresetList from './preset-list.vue'
import ImagesList from './images-list.vue'
import CompList from './comp-list.vue'
import { useCollapse } from '@/hooks/collapseHook'
import { deepCopy } from '@/utils/util'

const { schemaStore, storeToRefs } = useStore()
const { pageConfig, toolbar } = storeToRefs(schemaStore)
const activeGroup = ref({})

useCollapse()
// 当前的分类控件
const groups = computed(() => activeGroup.value?.group ?? [])

const comps = computed(() => activeGroup.value?.comps ?? [])

function changeComp(group) {
  if (activeGroup.value.type === group.type && toolbar.value.components) {
    schemaStore.toggleCompsPanel(false)
    activeGroup.value = {}
    return
  }
  schemaStore.toggleCompsPanel(true)
  activeGroup.value = deepCopy(group)
}

function dragStart(e, comName) {
  e.dataTransfer.setData('normal-comp', comName)
}

async function toAddCom(comName) {
  try {
    const com = createComponent(comName)
    com.attr.x = Math.floor((pageConfig.value.width - com.attr.w) / 2)
    com.attr.y = Math.floor((pageConfig.value.height - com.attr.h) / 2)
    // 如是静态数据，且存在staticPath，则填充一次数据
    if (com.apiData && com.apiData.type === ApiType.static && com.apiData.staticPath) {
      const { data } = await getStaticData(com.id, com.apiData.staticPath)
      com.apiData.config.data = JSON.stringify(data)
    }
    schemaStore.addCom({ component: com })
    // 选中当前
    schemaStore.selectCom(com)
  } catch (error) {
    console.log(error)
  }
}

// 拓扑组态专属的拖拽
function dragTopoStart(e, img) {
  e.dataTransfer.setData('image-comp', JSON.stringify(getDefaultTopoConfig(img)))
}

// 拓扑组态专属的点击
function toAddTopoComp(img) {
  const com = getDefaultTopoConfig(img)
  com.attr.x = Math.floor((pageConfig.value.width - com.attr.w) / 2)
  com.attr.y = Math.floor((pageConfig.value.height - com.attr.h) / 2)
  schemaStore.addCom({ component: com })
  // // 选中当前
  schemaStore.selectCom(com)
}

// 图片专属的拖拽
function dragImageStart(e, img) {
  e.dataTransfer.setData('image-comp', JSON.stringify(getDefaultImageConfig(img)))
}

// 图片专属的点击
function toAddImageComp(img) {
  const com = getDefaultImageConfig(img)
  com.attr.x = Math.floor((pageConfig.value.width - com.attr.w) / 2)
  com.attr.y = Math.floor((pageConfig.value.height - com.attr.h) / 2)
  schemaStore.addCom({ component: com })
  // // 选中当前
  schemaStore.selectCom(com)
}

// 自定义组件的拖拽和点击
function dragCustomCompStart(e, comp) {
  e.dataTransfer.setData('custom-comp', JSON.stringify(getNewCopyCom(JSON.parse(comp))))
}

// 自定义组件的点击
function toAddCustomComp(comp) {
  const com = getNewCopyCom(JSON.parse(comp))
  schemaStore.addCom({ component: com })
  // 选中当前
  schemaStore.selectCom(com)
}

function dragOver(e) {
  e.preventDefault()
  e.stopPropagation()
  e.dataTransfer.dropEffect = 'none'
}

function closePanel() {
  if (toolbar.value.components) {
    schemaStore.toggleCompsPanel(false)
  }
}
</script>

<style scoped>
.components-panel-wp {
  position: relative;
  flex: none;
  z-index: 6;
  width: calc(var(--schema-comps-width) + 200px);
  height: 100%;
  background: var(--schema-color-bg-4);
  user-select: none;
  transition: width 0.2s ease;
  &.is-hide {
    width: var(--schema-comps-width);
  }
  .components-panel {
    position: relative;
    z-index: 9;
    display: flex;
    width: var(--schema-comps-width);
    height: 100%;
    transition: 0.2s ease;
    flex-direction: column;
    flex: auto;
    background: var(--schema-color-bg-2);

    .panel-title {
      position: relative;
      user-select: none;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background: var(--schema-color-bg-3);
      border-bottom: 1px solid var(--schema-color-border);
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      border-right: 1px solid var(--schema-color-border);
    }
  }

  .components-panel-content {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    z-index: 2;

    .components-type {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      padding: 6px;

      .components-item {
        position: relative;
        cursor: pointer;
        width: 100%;
        height: 50px;
        margin-bottom: 6px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: 0.2s;
        border-radius: var(--bin-border-radius-default);

        .com-tab-icon {
          font-size: 20px;
          color: var(--bin-color-text-secondary);
        }

        .com-tab-title {
          text-align: center;
          opacity: 1;
          font-size: 12px;
          line-height: 18px;
        }

        &:hover {
          background: var(--s-color-1);
        }

        &.active {
          color: var(--bin-color-primary);
          background: var(--bin-color-input-shadow);
          .com-tab-icon {
            color: var(--bin-color-primary);
          }
        }
      }
    }
  }

  .components-list-top {
    position: relative;
    height: 30px;
    line-height: 30px;
    background: var(--schema-color-bg-3);
    user-select: none;
    border-bottom: 1px solid var(--schema-color-border);

    .action {
      position: absolute;
      top: 0;
      right: 1px;
      letter-spacing: 4px;

      > i {
        text-indent: 0;
        cursor: pointer;
        transition: color 0.2s;
        width: 20px;
        height: 30px;
        display: inline-block;

        &:hover {
          color: #fff;
        }
      }
    }
  }

  .components-list-content {
    height: calc(100% - 30px);
  }

  .components-list {
    position: absolute;
    width: var(--schema-comps-width-open);
    height: 100%;
    top: 0;
    right: 0;
    z-index: 1;
    transform: translateX(100%);
    background: var(--schema-color-bg-2);
    border-right: 1px solid var(--schema-color-border);
    opacity: 1;
    transition: 0.2s;
    overflow: auto;

    &.is-hide {
      opacity: 0;
    }
  }
}
</style>
