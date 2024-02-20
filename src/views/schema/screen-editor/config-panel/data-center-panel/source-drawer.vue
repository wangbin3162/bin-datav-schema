<template>
  <b-drawer
    v-model="visible"
    class-name="source-drawer"
    append-to-body
    :width="500"
    :title="`模型 [${selectedModelName}] 配置`"
    :styles="{ padding: 0 }"
    :mask-closable="false"
    @close="close"
  >
    <ds-api
      v-if="visible"
      :selected-model-id="selectedModelId"
      :selected-model-name="selectedModelName"
      :enable-legend="enableLegend"
      :is-box="isBox"
      @save="close"
    ></ds-api>
  </b-drawer>
</template>

<script>
import { computed, ref } from 'vue'
import DsApi from '@/views/schema/screen-editor/config-panel/data-center-panel/ds-api.vue'
import { useStore } from '@/store'

export default {
  name: 'source-drawer',
  components: { DsApi },
  props: {
    enableLegend: {
      type: Boolean,
      default: true,
    },
    isBox: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(false)
    const { schemaStore, storeToRefs } = useStore()
    const { selectedCom } = storeToRefs(schemaStore)
    const apiDataConfig = computed(() => selectedCom.value.apiData)
    const selectedModelId = ref('')
    const selectedModelName = ref('')

    const open = ({ modelId, modelName }) => {
      visible.value = true
      selectedModelId.value = modelId
      selectedModelName.value = modelName
    }
    const close = () => {
      visible.value = false
      selectedModelId.value = ''
      selectedModelName.value = ''
      emit('close')
    }
    return {
      visible,
      apiDataConfig,
      open,
      close,
      selectedModelId,
      selectedModelName,
    }
  },
}
</script>

<style scoped></style>
