<template>
  <div class="basic-setting-wp">
    <g-field label="图表尺寸" flat>
      <g-input-number v-model="data.w" label="宽度" :min="10" :max="4000" inline suffix="px" />
      <g-input-number v-model="data.h" label="高度" :min="10" :max="4000" inline suffix="px" />
    </g-field>
    <g-field label="图表位置" flat>
      <g-input-number v-model="data.x" label="X" inline suffix="px" />
      <g-input-number v-model="data.y" label="Y" inline suffix="px" />
    </g-field>
    <g-field label="旋转角度" flat>
      <g-input-number v-model="data.rotate" :min="0" :max="360" :step="1" inline />
      <div style="width: 50%">
        <b-button-group>
          <b-button
            v-for="em in rotateOptions"
            :key="em.value"
            size="mini"
            :title="em.label"
            @click="schemaStore.doRotate(em.value)"
          >
            <i :class="`b-iconfont b-icon-${em.value}`" />
          </b-button>
        </b-button-group>
      </div>
    </g-field>
    <g-field label="透明度">
      <g-slider v-model="data.opacity" :min="0" :max="1" :step="0.05" />
    </g-field>
    <g-field label="位置">
      <b-button-group>
        <b-button
          v-for="em in positionOptions"
          :key="em.value"
          size="mini"
          :title="em.label"
          @click="schemaStore.doAdsorption(em.value)"
        >
          <i :class="`iconfont-align b-icon-${em.value}-vs`" />
        </b-button>
      </b-button-group>
    </g-field>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { positionOptions, rotateOptions } from '@/config/select-options'
import { useStore } from '@/store'

const emit = defineEmits(['update:attr'])
const props = defineProps({
  attr: {
    type: Object,
    required: true,
  },
})
const data = computed({
  get: () => props.attr,
  set: val => emit('update:attr', val),
})

const { schemaStore } = useStore()
</script>
