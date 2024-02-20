<template>
  <g-field label="选择字段">
    <b-select v-model="apiDataConfig.config.dimension">
      <b-option
        v-for="item in apiDataConfig.config.resParam"
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

  <g-field flat v-for="(item, index) in apiDataConfig.config.axisFields.y" :key="index">
    <template #label>
      <span class="mr-5">指标{{ index + 1 }}</span>
      <b-button
        type="text"
        icon="close-circle"
        text-color="danger"
        @click="handleRemoveSaveField(index)"
      />
    </template>
    <g-select
      label="字段"
      inline
      v-model="item.field"
      :data="apiDataConfig.config.resParam.map(i => ({ value: i.desc, label: item.name }))"
    ></g-select>
    <g-input label="标题" inline v-model="item.title"></g-input>
  </g-field>
</template>

<script setup>
import { computed } from 'vue'
import { throwError } from '@/utils/util'
import { useStore } from '@/store'

const { schemaStore, storeToRefs } = useStore()
const { selectedCom } = storeToRefs(schemaStore)
const apiDataConfig = computed(() => selectedCom.value.apiData)

function handleAddSaveField() {
  if (apiDataConfig.value.config.axisFields.y.length > 9) {
    throwError('Radar/handleAddSaveField', { message: '最多可添加10条' })
  } else {
    apiDataConfig.value.config.axisFields.y.push({
      field: '',
      title: '',
    })
  }
}

// 删除存储字段
function handleRemoveSaveField(index) {
  apiDataConfig.value.config.axisFields.y.splice(index, 1)
}
</script>

<style scoped></style>
