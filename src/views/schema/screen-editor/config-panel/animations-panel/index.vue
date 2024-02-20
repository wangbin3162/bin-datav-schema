<template>
  <div class="animations-panel">
    <div style="padding: 0 10px">
      <b-space>
        <g-field label="启用动画" style="padding: 4px 0">
          <b-switch v-model="data.enable" size="small"></b-switch>
        </g-field>
        <g-field label="循环播放" style="padding: 4px 0 4px 46px">
          <b-switch v-model="data.loop" size="small"></b-switch>
        </g-field>
      </b-space>
      <g-field label="当前动画">
        <b-tag type="primary">{{ getAnimationName(data.name) }}</b-tag>
      </g-field>
      <g-field label="播放速度">
        <g-select v-model="data.timing" :data="TimingOptions" />
      </g-field>
      <g-field label="交替方向">
        <g-select v-model="data.direction" :data="DirectionOptions" />
      </g-field>
      <b-space>
        <g-field label="动画时长" style="padding: 4px 0">
          <g-input-number v-model="data.duration" suffix="秒" :min="0" inline-flex />
        </g-field>
        <g-field label="动画延迟" style="padding: 4px 0 4px 0">
          <g-input-number v-model="data.delay" suffix="秒" :min="0" inline-flex />
        </g-field>
      </b-space>
    </div>

    <div class="p10">
      <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
      <div style="position: relative; overflow: hidden">
        <b-move-transition>
          <AnimationItem v-if="activeTab === 'tab0'" :list="Animations[0].children" />
          <AnimationItem v-if="activeTab === 'tab1'" :list="Animations[1].children" />
          <AnimationItem v-if="activeTab === 'tab2'" :list="Animations[2].children" />
          <AnimationItem v-if="activeTab === 'tab3'" :list="Animations[3].children" />
          <AnimationItem v-if="activeTab === 'tab4'" :list="Animations[4].children" />
        </b-move-transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store'
import { computed, ref } from 'vue'
import { Animations, TimingOptions, DirectionOptions, getAnimationName } from '@/config/animations'
import AnimationItem from './animation-item.vue'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)

const data = computed({
  get: () => selectedCom.value.animation,
  set: val => (selectedCom.value.animation = val),
})

const tabs = ref([
  { key: 'tab0', title: '常用' },
  { key: 'tab1', title: '强调' },
  { key: 'tab2', title: '移入' },
  { key: 'tab3', title: '退出' },
  { key: 'tab4', title: '其他' },
])
const activeTab = ref('tab0')
</script>

<style scoped>
.animations-panel {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  :deep(.divider) {
    margin: 8px 10px 0;
    height: 1px;
    background: var(--s-border-color);
  }
}
</style>
