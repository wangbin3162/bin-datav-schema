<template>
  <div class="setting-panel">
    <div class="page-config-top">
      <b-radio-group model-value="多选区域" size="large" type="capsule" style="width: 100%">
        <b-radio label="多选区域"></b-radio>
      </b-radio-group>
    </div>

    <div class="page-config-content">
      <g-field label="位置" flat>
        <g-input-number v-model="attr.x" suffix="X" inline disabled />
        <g-input-number v-model="attr.y" suffix="Y" inline disabled />
      </g-field>
      <g-field label="大小" flat>
        <g-input-number v-model="attr.w" suffix="W" :min="10" :max="4000" inline disabled />
        <g-input-number v-model="attr.h" suffix="H" :min="10" :max="4000" inline disabled />
      </g-field>

      <g-field label="对齐">
        <div flex="main:justify" style="width: 100%">
          <span
            v-for="em in MultiplAlignOptions"
            :key="em.value"
            :title="em.label"
            @click="schemaStore.doAlign(em.value)"
            class="align-btn"
          >
            <i :class="`menu-icon iconfont-align b-icon-${em.value}`" />
          </span>
        </div>
      </g-field>

      <g-field label="组合">
        <b-button-group>
          <b-button size="small" icon="group" @click="schemaStore.group()">组合</b-button>
        </b-button-group>
      </g-field>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { computed } from 'vue'
import { MultiplAlignOptions } from '@/config/select-options'

const { schemaStore, storeToRefs } = useStore()
const { areaData } = storeToRefs(schemaStore)

const attr = computed(() => {
  return {
    x: areaData.value.x,
    y: areaData.value.y,
    w: areaData.value.width,
    h: areaData.value.height,
  }
})
</script>

<style scoped>
.page-config-top {
  width: 100%;
  padding: 10px 10px 0;
}
.page-config-content {
  padding: 0 10px 10px;
}
.align-btn {
  padding: 0 8px;
  background-color: var(--s-border-color);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s;
  color: var(--s-text-color-2);
  &:hover {
    background-color: var(--s-color-3);
  }
  > i {
    font-size: 18px;
  }
}
</style>
