<template>
  <b-modal
    v-model="visible"
    append-to-body
    title="保存为模板"
    top="200px"
    custom-class="schema-modal"
    @close="visible = false"
  >
    <b-form label-width="100px" ref="formRef" :model="formStatus" label-suffix=":">
      <b-form-item
        label="模板名称"
        prop="name"
        :rules="{ required: true, message: '模板名称不能为空', trigger: 'blur' }"
      >
        <b-input v-model="formStatus.name"></b-input>
      </b-form-item>
    </b-form>
    <template #footer>
      <b-button type="primary" icon="save" :loading="formStatus.loading" @click="saveAsTemplate">
        保存模板
      </b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import { generateId, throwError } from '@/utils/util'
import { Message } from 'bin-ui-design'
import { saveTemplate } from '@/api/modules/template.api'
import { setGlobalLoading } from '@/hooks/schema/useGlobalLoading'

defineOptions({
  name: 'SaveTemplate',
})

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
const visible = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const { schemaStore, storeToRefs } = useStore()
const { pageConfig, comps } = storeToRefs(schemaStore)

const formRef = ref(null)
const formStatus = reactive({ loading: false, id: `temp_${generateId()}`, name: '' })

const tempData = computed(() => ({
  template: { id: formStatus.id, name: formStatus.name },
  pageConfig: pageConfig.value,
  comps: comps.value,
}))

const saveAsTemplate = async () => {
  formRef.value &&
    formRef.value.validate(async valid => {
      if (valid) {
        try {
          setGlobalLoading(true)
          formStatus.loading = true
          const screenData = tempData.value
          const tmpName = screenData.template.name
          const jsonStr = JSON.stringify(screenData) //  把 JSON 对象转换为字符串
          await saveTemplate({ name: tmpName, content: jsonStr })
        } catch (e) {
          throwError('save-template/saveAsTemplate', e)
        }
        setGlobalLoading(false)
        formStatus.loading = false
        visible.value = false
        Message.success({ message: '模板已保存！', showClose: true })
      }
    })
}

watch(
  () => props.modelValue,
  val => {
    if (val) {
      formRef.value && formRef.value.resetFields()
      formStatus.id = `temp_${generateId()}`
    }
  },
)
</script>
