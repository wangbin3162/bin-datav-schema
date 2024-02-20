<template>
  <template v-if="isWord">
    <g-field label="标签标题">
      <b-select v-model="mappingFields.word" size="small">
        <b-option
          v-for="item in dimensionFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
    <g-field label="标签值">
      <b-select v-model="mappingFields.frequency" size="small">
        <b-option
          v-for="item in measureFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
  </template>

  <template v-else-if="isSelect">
    <g-field label="选项标题">
      <b-select v-model="mappingFields.lAbEl" size="small">
        <b-option
          v-for="item in dimensionFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
    <g-field label="选项值">
      <b-select v-model="mappingFields.vAlUe" size="small">
        <b-option
          v-for="item in measureFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
  </template>

  <template v-else-if="isCircle">
    <g-field label="标题">
      <b-select v-model="mappingFields.tItLe" size="small">
        <b-option
          v-for="item in dimensionFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
    <g-field label="选项值">
      <b-select v-model="mappingFields.vAlUe" size="small">
        <b-option
          v-for="item in measureFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
  </template>

  <template v-else>
    <g-field label="标签标题">
      <b-select v-model="mappingFields.nAmE" size="small">
        <b-option
          v-for="item in dimensionFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
    <g-field label="标签值">
      <b-select v-model="mappingFields.vAlUe" size="small" @change="handleChange">
        <b-option
          v-for="item in measureFields"
          :key="item.name"
          :label="item.desc"
          :value="item.name"
        ></b-option>
      </b-select>
    </g-field>
  </template>

  <g-field label="计算方式" v-if="showAgg">
    <b-select v-model="mappingFields.aGgReGaToR" size="small">
      <b-option
        v-for="(value, key) in AGGREGATOR_FUN"
        :key="key"
        :label="value"
        :value="key"
      ></b-option>
    </b-select>
  </g-field>
</template>

<script setup>
import { ref, watch } from 'vue'
import { AGGREGATOR_FUN } from '@/hooks/schema/useModelEnum'

const emit = defineEmits(['update:mapping'])

const props = defineProps({
  mapping: {
    type: Object,
    default: () => ({}),
  },
  dimensionFields: {
    type: Array,
    default: () => [],
  },
  measureFields: {
    type: Array,
    default: () => [],
  },
  isWord: {
    type: Boolean,
    default: false,
  },
  isSelect: {
    type: Boolean,
    default: false,
  },
  isCircle: {
    type: Boolean,
    default: false,
  },
  showAgg: {
    type: Boolean,
    default: false,
  },
})

const mappingFields = ref({})

watch(
  () => props.mapping,
  data => {
    mappingFields.value = data
  },
  { deep: true, immediate: true },
)

watch(
  () => mappingFields.value,
  data => {
    emit('update:mapping', data)
  },
  { deep: true },
)

function handleChange() {
  if (props.showAgg){
    mappingFields.value.aGgReGaToR = 'SUM'
  }
}
</script>

<style scoped></style>
