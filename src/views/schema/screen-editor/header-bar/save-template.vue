<template>
  <b-modal
    v-model="visible"
    append-to-body
    title="保存为模板"
    top="200px"
    custom-class="schema-modal"
    @close="visible = false"
  >
    <b-form label-width="80px" ref="formRef" :model="formStatus" label-suffix=":">
      <b-form-item
        label="模板名称"
        prop="name"
        :rules="{ required: true, message: '模板名称不能为空', trigger: 'blur' }"
      >
        <b-input v-model="formStatus.name"></b-input>
      </b-form-item>
    </b-form>
    <div class="t-center">
      <b-button
        type="primary"
        icon="vertical-align-botto"
        transparent
        style="width: 120px"
        @click="downloadCfg"
      >
        配置文件
      </b-button>
      <b-button
        type="primary"
        icon="save"
        style="width: 120px"
        :loading="formStatus.loading"
        @click="saveAsTemplate"
      >
        保存模板
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from '@/store'
import { generateId, throwError } from '@/utils/util'
import { downloadFile } from '@/utils/file-helper'
import { Message } from 'bin-ui-next'
import { saveTemplate } from '@/api/modules/template.api'

export default {
  name: 'save-template',
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const { schemaStore, storeToRefs } = useStore()
    const { pageConfig, comps } = storeToRefs(schemaStore)

    const formRef = ref(null)
    const formStatus = reactive({ loading: false, id: `temp_${generateId()}`, name: '' })

    const visible = computed({
      get: () => props.modelValue,
      set: val => ctx.emit('update:modelValue', val),
    })

    const tempData = computed(() => ({
      template: { id: formStatus.id, name: formStatus.name },
      pageConfig: pageConfig.value,
      comps: comps.value,
    }))

    const downloadCfg = () => {
      formRef.value &&
        formRef.value.validate(async valid => {
          if (valid) {
            const screenData = tempData.value
            const jsonStr = JSON.stringify(screenData) //  把 JSON 对象转换为字符串
            downloadFile(jsonStr, `${screenData.template.id}.json`)
            Message.success({ message: '模板文件已保存！', showClose: true })
          }
        })
    }

    // 复制json至剪切板
    const saveAsTemplate = async () => {
      formRef.value &&
        formRef.value.validate(async valid => {
          if (valid) {
            try {
              formStatus.loading = true
              const screenData = tempData.value
              const tmpName = screenData.template.name
              const jsonStr = JSON.stringify(screenData) //  把 JSON 对象转换为字符串
              await saveTemplate({ name: tmpName, content: jsonStr })
            } catch (e) {
              throwError('save-template/saveAsTemplate', e)
            }
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

    return {
      formRef,
      formStatus,
      visible,
      downloadCfg,
      saveAsTemplate,
    }
  },
}
</script>
