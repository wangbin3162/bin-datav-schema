<template>
  <div class="components-bar-container">
    <div class="components-panel">
      <div class="components-charts">
        <div
          v-for="(item,index) in componentList"
          :key="index"
          :data-index="index"
          class="components-item"
          draggable="true"
        >
          <div class="item-icon" :style="item.icon" :title="item.label"></div>
        </div>
      </div>
      <div class="page-config-entry">
        <b-icon name="setting"></b-icon>
        页面设置
      </div>
    </div>
  </div>
</template>

<script>
import { getComponents } from '../../../../config/schema/comonents.cfg'
import { ref } from 'vue'

export default {
  name: 'components-bar',
  setup(props) {
    const componentList = ref(getComponents('common'))
    return {
      componentList,
    }
  },
}
</script>

