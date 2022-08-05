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
              v-for="(com, index) in componentsList"
              :key="index"
              :class="{ active: activeIndex === index }"
              @click="changeComp(index)"
            >
              <b-icon class="com-tab-icon" :name="com.icon"></b-icon>
              <span class="com-tab-title">{{ com.name }}</span>
            </div>
          </b-scrollbar>
        </div>
        <div class="components-list" :class="{ 'is-hide': !toolbar.components }" v-click-outside="closePanel">
          <b-scrollbar native>
            <div class="p10">
              <div
                class="comp-item"
                v-for="(com, index) in comps"
                :key="index"
                :title="com.alias"
                :draggable="com.used"
                @dragstart="dragStart($event, com.name)"
                @click="toAddCom(com.name, com.used)"
              >
                <div class="comp-item-text">{{ com.alias }}</div>
                <div class="comp-item-img" :style="`background-image: url(${com.img});`"></div>
              </div>
            </div>
          </b-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { list } from '@/config/components-list'
import { computed, ref } from 'vue'
import { createComponent } from '@/config/components-cfg'
import { getStaticData } from '@/api/database.api'
import { ApiType } from '@/config/data-source'

export default {
  name: 'components-panel',
  setup() {
    const { schemaStore, storeToRefs } = useStore()
    const { pageConfig, toolbar, selectedCom } = storeToRefs(schemaStore)
    const activeIndex = ref(0)
    // 开启的显示组件
    const comps = computed(() => list[activeIndex.value].data)

    const changeComp = index => {
      schemaStore.toggleCompsPanel(true)
      activeIndex.value = index
    }
    const dragStart = (e, comName) => {
      e.dataTransfer.setData('text', comName)
    }
    const toAddCom = async (comName, used) => {
      if (used) {
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
      } else {
        console.log('正在开发中。。。')
        // Message.warning('正在开发中。。。')
      }
    }
    const dragOver = e => {
      e.preventDefault()
      e.stopPropagation()
      e.dataTransfer.dropEffect = 'none'
    }
    const closePanel = () => {
      if (toolbar.value.components) {
        schemaStore.toggleCompsPanel(false)
      }
    }

    return {
      toolbar,
      activeIndex,
      componentsList: list,
      comps,
      changeComp,
      dragStart,
      toAddCom,
      dragOver,
      closePanel,
    }
  },
}
</script>
