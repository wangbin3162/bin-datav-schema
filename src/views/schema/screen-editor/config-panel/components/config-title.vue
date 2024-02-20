<template>
  <div class="com-title-wp">
    <g-field
      label="组件ID"
      style="padding-top: 0; padding-bottom: 0; color: rgba(255, 255, 255, 0.5); font-size: 12px"
    >
      {{ selectedCom.id }}
    </g-field>
    <g-field label="名称" style="padding-top: 8px; padding-bottom: 8px">
      <template #label>
        <div flex="main:justify cross:center" class="pr-8">
          <span>名称</span>
          <b-icon
            v-if="showCfg"
            name="setting"
            title="查看配置项"
            type="button"
            @click="openDetail"
          ></b-icon>
        </div>
      </template>
      <g-input v-model="selectedCom.alias" />
    </g-field>

    <b-modal
      v-model="detailVisible"
      :title="`[${selectedCom.alias}] 配置项 `"
      append-to-body
      top="60px"
      custom-class="schema-modal"
      @opened="render = true"
    >
      <div class="data-editor" style="margin: 0; height: 350px">
        <b-ace-editor
          v-if="render"
          v-model="compJson"
          theme="tomorrow_night"
          wrap
          :styles="{ border: 'none' }"
        />
      </div>
      <div class="t-right pt-8">
        <b-button size="small" type="primary" icon="snippets" @click="putJson">应用配置项</b-button>
        <b-button size="small" type="primary" icon="file-copy" @click="copyCom">
          复制配置项
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { copyText } from '@/utils/util'
import { Message } from 'bin-ui-design'
import { useStore } from '@/store'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)

defineOptions({
  name: 'ConfigTitle',
})

defineProps({
  showCfg: {
    type: Boolean,
    default: false,
  },
})

const detailVisible = ref(false)
const compJson = ref('')
const render = ref(false)

const openDetail = () => {
  detailVisible.value = true
  render.value = false
  compJson.value = JSON.stringify(selectedCom.value, null, 2)
}

const copyCom = () => {
  copyText(JSON.stringify(selectedCom.value))
  Message.success('已复制配置项至剪切板')
  detailVisible.value = false
}

// 应用图表
const putJson = () => {
  try {
    const data = JSON.parse(compJson.value)
    // 再次格式化一下
    compJson.value = JSON.stringify(data, null, 2)
    paseComp(data)
    Message.success('图表应用成功！')
    detailVisible.value = false
  } catch (error) {
    Message.error('配置项格式不正确，请检查后再应用配置！')
  }
}

// 转换应用控件
function paseComp(data) {
  // 记录当选中的组件id，进行移除操作
  const oldId = selectedCom.value.id
  schemaStore.replaceCom(oldId, data)
}
</script>

<style scoped>
.com-title-wp {
  padding: 0 10px;
}
</style>
