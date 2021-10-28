<template>
  <b-modal v-model="visible" append-to-body title="发布" top="200px" custom-class="publish-modal" @close="closeDialog">
    <div style="padding-bottom: 24px;">
      <div style="color: #fff; font-size: 14px;padding-bottom: 12px;">发布链接</div>
      <div flex="">
        <g-input
          v-model="shareUrl"
          readonly
          type="textarea"
          :autosize="{minRows:3}"
          style="width: 80%;line-height: 22px;background: #1d262e;cursor: pointer; margin-right: 16px;"
        />
        <b-button type="text" @click="copyUrl">复制</b-button>
      </div>
    </div>
    <div class="t-center">
      <b-button type="primary" @click="handlePublishDown" style="width: 200px;">发布大屏</b-button>
    </div>
  </b-modal>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue'
import { copyText } from '@/utils/util'
import { Message } from 'bin-ui-next'
import useSchemaStore from '@/hooks/schema/useSchemaStore'

export default {
  name: 'publish-screen',
  props: {
    projectId: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const visible = ref(false)
    const { saveScreenData } = useSchemaStore()
    const shareUrl = computed(() => `${window.location.origin}/#/screen/${props.projectId}`)

    const closeDialog = () => {
      visible.value = false
      ctx.emit('update:modelValue', false)
    }
    const copyUrl = () => {
      nextTick(() => {
        if (copyText(shareUrl.value)) {
          Message.success('复制成功')
        }
      })
    }

    const handlePublishDown = async () => {
      await saveScreenData()
      Message.success('发布成功！')
    }
    watch(() => props.modelValue, val => {
      visible.value = val
    })
    return {
      visible,
      shareUrl,
      closeDialog,
      copyUrl,
      handlePublishDown,
    }
  },
}
</script>

<style scoped lang="stylus">

</style>
