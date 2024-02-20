<template>
  <b-modal
    v-model="visible"
    append-to-body
    :title="btnText"
    top="200px"
    custom-class="schema-modal"
    @close="visible = false"
  >
    <b-form label-width="100px" ref="formRef" :model="pageInfo" label-suffix=":" v-if="visible">
      <b-form-item label="所在目录" class="is-required" v-if="!route.query.isShow">
        <b-tree-select
          :data="dirTree"
          v-model="pageInfo.pid"
          titleKey="text"
          default-expand
        ></b-tree-select>
      </b-form-item>
      <b-form-item
        label="大屏名称"
        prop="name"
        :rules="{ required: true, message: '大屏名称不能为空', trigger: 'blur' }"
      >
        <b-input v-model="pageInfo.name"></b-input>
      </b-form-item>
      <template v-if="status === 'audited' && $route.query.id">
        <b-form-item label="预览地址">
          <g-input v-model="shareUrl" readonly type="textarea" :autosize="{ minRows: 3 }" />
        </b-form-item>
        <b-form-item>
          <b-button type="text" @click="copyUrl">复制预览地址</b-button>
        </b-form-item>
      </template>
    </b-form>
    <template #footer>
      <b-button type="primary" icon="save" @click="saveKanban" :loading="loading">
        {{ btnText }}
      </b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { useStore } from '@/store'
import { computed, nextTick, ref, watch } from 'vue'
import { getKanbanDir } from '@/api/modules/analysis-dashboard.api'
import { copyText, throwError } from '@/utils/util'
import { useRoute, useRouter } from 'vue-router'
import { Message } from 'bin-ui-design'
import useSavePreview from '@/hooks/schema/useSavePreview'
import { getPublicPath } from '@/utils/env'
import { setGlobalLoading } from '@/hooks/schema/useGlobalLoading'
import { sendMsg } from '@/utils/cross-tab-msg'

defineOptions({
  name: 'SaveScreen',
})
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  status: {
    type: String,
    default: 'edit',
    validator: val => ['edit', 'audited'].includes(val),
  },
})
const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const { schemaStore, storeToRefs } = useStore()
const { pageInfo } = storeToRefs(schemaStore)
const { saveScreenData } = useSavePreview()

const router = useRouter()
const route = useRoute()

const dirTree = ref([])
const formRef = ref(null)
const loading = ref(false)

const shareUrl = computed(
  () => window.location.origin + getPublicPath(`/#/screen/${route.query.id}`),
)

getKanbanDir().then(res => {
  dirTree.value = res.data ? [res.data] : []
})

const btnText = computed(() => (props.status === 'edit' ? '保存大屏' : '发布大屏'))

const saveInterval = 60 * 1000 // 每1分钟保存一次

// 定时保存函数
function saveData() {
  const isEdit = pageInfo.value.id || route.query.id
  if (isEdit) {
    saveScreenData('edit').then(() => sendMsg('save-success'))
  }
  setTimeout(saveData, saveInterval)
}

// 启动定时保存
setTimeout(saveData, saveInterval)

const saveKanban = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      let id = ''
      try {
        setGlobalLoading(true)
        loading.value = true
        id = await saveScreenData(props.status)
      } catch (e) {
        throwError('save-screes/saveKanban', e)
      }
      setGlobalLoading(false)
      pageInfo.value.id = id
      loading.value = false
      visible.value = false
      Message.success({ message: `${btnText.value}成功！`, showClose: true })
      sendMsg('save-success')
      let routeData = router.resolve({
        path: '/schema/screen',
        query: { id: id, isShow: route.query.isShow },
      })
      window.location.replace(routeData.href)
    }
  })
}

const copyUrl = () => {
  nextTick(() => {
    if (copyText(shareUrl.value)) {
      Message.success('复制发布地址成功!')
    }
  })
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      nextTick(() => {
        formRef.value && formRef.value.resetFields()
      })
    }
  },
)
</script>
