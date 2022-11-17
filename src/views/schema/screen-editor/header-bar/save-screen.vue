<template>
  <b-modal
    v-model="visible"
    append-to-body
    :title="btnText"
    top="200px"
    custom-class="schema-modal"
    @close="visible = false"
  >
    <b-form label-width="80px" ref="formRef" :model="pageInfo" label-suffix=":">
      <!-- <b-form-item label="所在目录" class="is-required">
        <b-tree-select :data="dirTree" v-model="pageInfo.pid" titleKey="text" default-expand></b-tree-select>
      </b-form-item> -->
      <b-form-item
        label="看板名称"
        prop="name"
        :rules="{ required: true, message: '看板名称不能为空', trigger: 'blur' }"
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
    <div class="t-center">
      <b-button type="primary" @click="saveKanban" :loading="loading" style="width: 200px">
        {{ btnText }}
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { useStore } from '@/store'
import { computed, nextTick, ref, watch } from 'vue'
import { getKanbanDir } from '@/api/modules/analysis-dashboard.api'
import { copyText, throwError } from '@/utils/util'
import { useRoute, useRouter } from 'vue-router'
import { Message } from 'bin-ui-next'
import useSavePreview from '@/hooks/schema/useSavePreview'
import { getPublicPath } from '@/utils/env'

export default {
  name: 'save-screen',
  props: {
    modelValue: {
      type: Boolean,
    },
    status: {
      type: String,
      default: 'edit',
      validator: val => ['edit', 'audited'].includes(val),
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const visible = computed({
      get: () => props.modelValue,
      set: val => ctx.emit('update:modelValue', val),
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

    const btnText = computed(() => (props.status === 'edit' ? '保存看板' : '发布看板'))

    const saveKanban = () => {
      formRef.value.validate(async valid => {
        if (valid) {
          let id = ''
          try {
            loading.value = true
            id = await saveScreenData(props.status)
            console.log(id)
          } catch (e) {
            throwError('save-screes/saveKanban', e)
          }
          pageInfo.value.id = id
          loading.value = false
          visible.value = false
          Message.success({ message: '保存成功！', showClose: true })
          let routeData = router.resolve({
            path: '/schema/screen',
            query: { id },
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
    return {
      formRef,
      pageInfo,
      dirTree,
      loading,
      visible,
      saveKanban,
      btnText,
      shareUrl,
      copyUrl,
    }
  },
}
</script>
