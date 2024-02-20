<template>
  <g-field label="选择字段">
    <b-select v-model="dimensionModelData">
      <b-option
        v-for="item in dimensionFields"
        :key="item.name"
        :label="item.desc"
        :value="item.name"
      ></b-option>
    </b-select>
  </g-field>

  <div style="padding: 0 10px 8px" flex>
    <b-space>
      <b-tag type="primary">指标配置</b-tag>
      <b-button type="text" icon="plus" title="新增指标配置" @click="handleAddSaveField"></b-button>
    </b-space>
  </div>

  <g-field flat v-for="(item, index) in mappingFields.y" :key="index">
    <template #label>
      <b-dropdown
        trigger="click"
        placement="bottom-start"
        appendToBody
        @command="handleCommand($event, item)"
      >
        <span class="mr-5 aggr">指标{{ index + 1 }}</span>
        <template #dropdown>
          <b-dropdown-menu>
            <template v-for="(value, key) in AGGREGATOR_FUN" :key="key">
              <b-dropdown-item :name="key" :selected="item.aggregator === key">
                {{ value }}
              </b-dropdown-item>
            </template>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
      <b-button
        type="text"
        icon="close-circle"
        text-color="danger"
        @click="handleRemoveSaveField(index)"
      />
    </template>
    <g-select
      :label="`字段(${AGGREGATOR_FUN[item.aggregator]})`"
      inline
      v-model="item.field"
      :data="measureFields.map(i => ({ value: i.name, label: i.desc }))"
    ></g-select>
    <g-input label="标题" inline v-model="item.title"></g-input>
  </g-field>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import { AGGREGATOR_FUN } from '@/hooks/schema/useModelEnum'
import { throwError } from '@/utils/util'

const emit = defineEmits(['update:axisFieldsModel', 'update:dimensionModel'])

const props = defineProps({
  axisFieldsModel: {
    type: Object,
    default: () => ({}),
  },
  dimensionModel: {
    type: String,
    default: '',
  },
  dimensionFields: {
    type: Array,
    default: () => [],
  },
  measureFields: {
    type: Array,
    default: () => [],
  },
})

const mappingFields = ref({
  x: [],
  y: [],
})
const dimensionModelData = ref('')

watch(
  () => [props.axisFieldsModel, props.dimensionModel],
  ([data, dim]) => {
    mappingFields.value = data
    dimensionModelData.value = dim
  },
  { deep: true, immediate: true },
)

watch(
  () => [mappingFields.value, dimensionModelData.value],
  ([data, dim]) => {
    emit('update:axisFieldsModel', data)
    emit('update:dimensionModel', dim)
  },
  { deep: true },
)

function handleAddSaveField() {
  if (mappingFields.value.y.length > 9) {
    throwError('Radar/handleAddSaveField', { message: '最多可添加10条' })
  } else {
    mappingFields.value.y.push({
      field: '',
      title: '',
      aggregator: 'SUM',
    })
  }
}

function handleCommand(name, el) {
  el.aggregator = name
}

// 删除存储字段
function handleRemoveSaveField(index) {
  mappingFields.value.y.splice(index, 1)
}
</script>

<style scoped>
.aggr{
  color: white;
  text-decoration: underline;
  text-decoration-style: dashed;
  text-decoration-color: white;
}
</style>
