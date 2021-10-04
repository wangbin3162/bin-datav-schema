import { computed, ref, watch } from 'vue'
import { Message } from 'bin-ui-next'

/**
 * 表单操作、状态内容定义
 */
export default function useForm() {
  const formRef = ref(null) // form组件
  const editStatus = ref('normal')
  const editLoading = ref(false)

  const pageStatus = computed(() => ({
    isNormal: editStatus.value === 'normal',
    isCreate: editStatus.value === 'create',
    isEdit: editStatus.value === 'edit',
    isDetail: editStatus.value === 'detail',
  }))

  // 给弹窗使用的visible
  const modalVisible = computed(() => pageStatus.value.isCreate || pageStatus.value.isEdit)

  watch(() => editStatus.value, () => {
    window.scrollTo(0, 0)
  })

  function openDetail() {
    editStatus.value = 'detail'
  }

  function openCreate() {
    editStatus.value = 'create'
    formRef.value && formRef.value.resetFields()
  }

  function openEdit() {
    editStatus.value = 'edit'
    formRef.value && formRef.value.resetFields()
  }

  function backNormal() {
    editStatus.value = 'normal'
  }

  function submitForm(doneFun, validateErrMsg = '表单校验错误，请填写正确后再次提交！') {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
      if (valid) {
        if (typeof doneFun === 'function') {
          doneFun()
        }
      } else {
        Message.error(validateErrMsg)
        return false
      }
    })
  }

  function resetForm() {
    formRef.value && formRef.value.resetFields()
  }

  function setBtnLoading(flag = true) {
    editLoading.value = flag
  }

  return {
    formRef,
    editLoading,
    editStatus,
    pageStatus,
    openDetail,
    modalVisible,
    setBtnLoading,
    openCreate,
    openEdit,
    backNormal,
    submitForm,
    resetForm,
  }
}
