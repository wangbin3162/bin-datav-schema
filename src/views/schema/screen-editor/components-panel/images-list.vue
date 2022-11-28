<template>
  <div class="group-wrap">
    <div class="group-list">
      <b-scrollbar native>
        <Collapse
          v-for="group in groups"
          :key="group.key"
          :name="group.key"
          :title="group.value"
          :can-edit="!defaultGroupKeys.includes(group.key)"
          @edit="name => modifyGroup(group, name)"
          @remove="removeGroup(group)"
        >
          <ImagesItem :group-id="group.key" @dragstart="dragStart" @click="click" />
        </Collapse>
        <div class="create-box" v-if="editStatus.create">
          <b-input
            v-model="groupObj.value"
            placeholder="输入名称，回车创建"
            v-focus
            size="small"
            @blur="onAddInput"
            @keyup.enter="onAddInput"
          />
        </div>
      </b-scrollbar>
    </div>
    <div class="create-group">
      <b-button type="primary" transparent @click="handleCreateGroup">创建图片分组</b-button>
    </div>
  </div>
</template>

<script setup>
import * as api from '@/api/images/images.api'
import Collapse from './collapse.vue'
import ImagesItem from './images-item.vue'
import { reactive, ref } from 'vue'
import { generateId } from '@/utils/util'
import { Message, MessageBox } from 'bin-ui-next'
import { defaultGroupKeys } from '@/api/images/default'
import { useCollapse } from '@/hooks/collapseHook'
import { setGlobalLoading } from '@/hooks/schema/useGlobalLoading'

const emit = defineEmits(['dragstart', 'click'])
const groups = ref([]) // 图片分组
useCollapse()

const groupObj = ref({
  key: '',
  value: '',
})

const editStatus = reactive({
  create: false,
  edit: false,
})

// 获取图片分组
const getImagesGroup = () => api.getImagesGroup().then(res => (groups.value = res))

getImagesGroup()

// 点击创建
function handleCreateGroup() {
  groupObj.value = { key: `group_images_${generateId()}`, value: '' }
  editStatus.create = true
}

function onAddInput(e) {
  if (!editStatus.create) return
  const name = (e.target.value || '').trim()
  if (name) addGroup()
  else editStatus.create = false
}

// 编辑
async function modifyGroup(item, name) {
  try {
    setGlobalLoading(true)
    const data = { key: item.key, value: name }
    await api.modifyImagesGroup(data)
    getImagesGroup()
    Message.success('修改成功')
  } catch (error) {
    console.log(error)
  }
  setGlobalLoading(false)
}

// 移除一个分组
async function removeGroup(item) {
  try {
    await MessageBox.confirm({ type: 'error', title: '确定移除当前图片分组吗？' })
    setGlobalLoading(true)
    await api.removeImagesGroup(item.key)
    getImagesGroup()
    Message.success('删除成功！')
  } catch (error) {
    console.log(error)
  }
  setGlobalLoading(false)
}

// 新增一个分组
async function addGroup() {
  try {
    setGlobalLoading(true)
    await api.createImagesGroup(groupObj.value)
    getImagesGroup()
    editStatus.create = false
    Message.success('新增成功！')
  } catch (error) {
    console.log(error)
  }
  setGlobalLoading(false)
}
const dragStart = (e, comp) => emit('dragstart', e, comp)
const click = comp => emit('click', comp)
</script>

<style lang="stylus" scoped>
.group-wrap {
  position: relative;
  height: calc(100vh - 70px);
  .group-list {
    height: calc(100% - 50px);
  }
  .create-group {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    > button {
      width: 80%;
    }
  }
  .create-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
  }
}
</style>
