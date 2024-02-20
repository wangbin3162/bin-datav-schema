<template>
  <div class="top" style="width: 100%">
    <div flex>
      <b-input
        :size="size"
        :placeholder="placeholder"
        :model-value="showText"
        readonly
        clearable
        @clear="handleClear"
      ></b-input>
      <b-button :size="size" background @click="handleOpen" style="margin-left: 2px">选择</b-button>
    </div>

    <b-modal
      v-model="visible"
      title="接口选择"
      width="800px"
      append-to-body
      custom-class="schema-modal"
      destroy-on-close
    >
      <div>


        <b-row :gutter="16">
          <b-col span="6">
            <b-tree
              width="220px"
              ref="treeRef"
              tree-title="服务类别"
              :title-key="'name'"
              :data="dataTree"
              @select-change="handleTreeSelect"
            ></b-tree>
          </b-col>

          <b-col span="18">
            <div class="mb-8">
              <b-space>
                名称
                <b-input
                  v-model="query.interfaceName"
                  clearable
                  size="small"
                  @keyup.enter.stop="handleSearch"
                  :maxlength="100"
                ></b-input>
                <b-button type="primary" :loading="loading" @click="handleSearch" size="small">
                  查询
                </b-button>
                <b-button @click="handleReset" size="small">重置</b-button>
              </b-space>
            </div>

            <b-table :columns="columns" :data="list" :loading="loading" size="small">
              <template #action="{ row }">
                <b-button type="text" size="small" @click="handleSelect(row)">选择</b-button>
              </template>
            </b-table>
          </b-col>
        </b-row>

        <div class="pt-16 t-right">
          <b-page
            :total="total"
            :current="query.page"
            :page-size="query.size"
            show-total
            @change="pageChange"
          ></b-page>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue'
import useTable from '@/hooks/service/useTable'
import { getInterfaceList, getServiceTree } from '@/api/modules/analysis-dashboard.api'

defineOptions({
  name: 'ServiceSelect',
})

const emit = defineEmits(['update:modelValue', 'update:name', 'closeEdit', 'select'])
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    // 存储显示名称
    type: String,
    default: '',
  },
  compType: {
    // 组件数据类型
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请选择服务',
  },
  size: String,
})

const columns = [
  { title: '服务名称', key: 'interfaceName', ellipsis: true, tooltip: true },
  { title: '请求类型', key: 'reqType', width: 90, align: 'center', ellipsis: true, tooltip: true },
  { title: '服务地址', key: 'interfaceUrl', ellipsis: true, tooltip: true },
  { title: '版本', key: 'version', width: 70, align: 'center' },
  { title: '操作', slot: 'action', width: 70, align: 'center' },
]

const visible = ref(false)
const showText = ref('') // 展示文字

const dataTree = ref()
const routers = ref('')

const query = reactive({
  interfaceName: '',
  categoryId: '',
  engineType: 'analysis_engine',
  size: 10,
  page: 1,
})

watch(
  () => props.name,
  name => (showText.value = name),
  { immediate: true },
)

async function handleOpen() {
  //用于字段模板编辑界面重置为关闭状态
  emit('closeEdit')
  visible.value = true
  await getMenuTree()
  handleReset()
}

function handleTreeSelect(node) {
  if (node[0].selected) {
    query.categoryId = node[0].id
    handleSearch()
  } else {
    node[0].selected = true
  }
}

function handleSelect(row) {
  showText.value = row.interfaceName
  emit('select', row)
  emit('update:modelValue', row.id)
  emit('update:name', row.interfaceName)
  visible.value = false
}

async function getMenuTree() {
  const res = await getServiceTree()
  const data = [
    {
      name: '服务管理',
      expand: true,
      children: res,
      selected: true,
      code: 'root',
    },
  ]

  dataTree.value = restructureData(data)
  return dataTree.value
}

function restructureData(data = []) {
  const mapper = node => {
    const expanded = routers.value.indexOf(node.id) > -1 ? true : false
    const mapperNode = {
      expand: expanded,
      ...node,
    }
    if (node.children && node.children.length) {
      mapperNode.children = node.children.map(mapper)
    }
    return mapperNode
  }
  return data.map(mapper)
}

function handleClear() {
  showText.value = ''
  emit('update:modelValue', '')
  emit('update:name', '')
  emit('select', null)
  visible.value = false
}

const { list, total, loading, getListData, handleSearch, pageChange } = useTable(
  getInterfaceList,
  query,
)

function handleReset() {
  query.page = 1
  query.size = 10
  query.interfaceName = ''
  getListData()
}
</script>

<style scoped></style>
