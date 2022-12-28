<template>
  <div class="components-panel-wp">
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
              :class="{ active: activeIndex === index }"
              @click="changeComp(index)"
            >
              <b-icon class="com-tab-icon" :name="group.icon"></b-icon>
              <span class="com-tab-title">{{ group.name }}</span>
            </div>
          </b-scrollbar>
        </div>
      </div>
      <div class="components-list" :class="{ 'is-hide': !toolbar.components }">
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

            <ImagesList
              v-if="activeIndex === 5"
              @dragstart="dragImageStart"
              @click="toAddImageComp"
            />

            <CompList
              v-if="activeIndex === 6"
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
import Comps from './comps.vue'
import Collapse from './collapse.vue'
import ImagesList from './images-list.vue'
import CompList from './comp-list.vue'
import { useCollapse } from '@/hooks/collapseHook'

const { schemaStore, storeToRefs } = useStore()
const { pageConfig, toolbar, selectedCom } = storeToRefs(schemaStore)
const activeIndex = ref(-1)

useCollapse()
// 当前的分类控件
const groups = computed(() =>
  activeIndex.value === -1 ? [] : componentList[activeIndex.value].group,
)
const comps = computed(() =>
  activeIndex.value === -1 ? [] : componentList[activeIndex.value].comps,
)

function changeComp(index) {
  schemaStore.toggleCompsPanel(true)
  activeIndex.value = index
}

function dragStart(e, comName) {
  e.dataTransfer.setData('normal-comp', comName)
}

async function toAddCom(comName) {
  try {
    const com = createComponent(comName)
    com.attr.x = Math.floor((pageConfig.value.width - com.attr.w) / 2)
    com.attr.y = Math.floor((pageConfig.value.height - com.attr.h) / 2)
    schemaStore.addCom({ component: com })
    // 选中当前
    schemaStore.selectCom(com)
    // 如是静态数据，且存在staticPath，则填充一次数据
    if (com.apiData && com.apiData.type === ApiType.static && com.apiData.staticPath) {
      const { data } = await getStaticData(com.id, com.apiData.staticPath)
      selectedCom.value.apiData.config.data = JSON.stringify(data)
    }
  } catch (error) {
    console.log(error)
  }
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
  e.dataTransfer.setData('custom-comp', JSON.stringify(getNewCopyCom(comp)))
}

// 自定义组件的点击
function toAddCustomComp(comp) {
  const com = getNewCopyCom(comp)
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
    activeIndex.value = -1
  }
}
</script>
