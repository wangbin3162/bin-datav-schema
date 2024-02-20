<template>
  <g-field-collapse label="初始化脚本" default-open>
    <g-field label="脚本配置">
      <div class="func-name" flex="main:justify cross:center">
        <b-checkbox v-model="pageConfig.initScript.enable" />
        <b-button type="text" icon="edit" size="small" @click="openEditor">编辑</b-button>
      </div>
    </g-field>
    <CustomScriptsEditor
      ref="editorRef"
      v-model="pageConfig.initScript.scriptStr"
      :title="label + '编辑器'"
      :funcExplain="funcExplain"
      :augments="['components']"
      :paramsDesc="paramsDesc"
      :exampleDesc="exampleDesc"
      @success="handleSuccess"
    />
  </g-field-collapse>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'

defineOptions({
  name: 'CustomScripts',
})

const props = defineProps({
  // 标题显示标签
  label: {
    type: String,
    default: '初始化脚本',
  },
  // 函数说明
  funcExplain: {
    type: String,
  },
  // 参数描述
  paramsDesc: {
    type: Array,
    default: () => [],
  },
  // 示例代码 {name,code} 的对象数组，name表示示例名称，code表示对应代码
  exampleDesc: {
    type: Array,
    default: () => [{ name: '获取所有组件信息', code: 'console.log(components)' }],
  },
})

const { schemaStore, storeToRefs } = useStore()

const { selectedCom, pageConfig, comps } = storeToRefs(schemaStore)


const editorRef = ref(null)

// const config = computed(() => props.events)
// // 判断是否有脚本事件
// const hasScriptEvent = computed(() => Object.keys(config.value).includes('customScript'))

function openEditor() {
  console.log(pageConfig.value);
  const str = pageConfig.value.initScript.scriptStr
  editorRef.value?.open(str)
}

function handleSuccess(val){
  pageConfig.value.initScript.scriptStr = val
  console.log(pageConfig.value);
  schemaStore.setPageInfo(pageConfig.value)
}
</script>

<style scoped>
/* .custom-scripts {
  width: 100%;
  .func-name {
    width: 100%;
  }
  .fun {
    padding: 4px 0;
    font-size: 13px;
    color: #b478cf;
    .params {
      color: var(--bin-color-warning);
    }
    .bottom {
      margin-bottom: 5px;
    }
    :deep(.hljs) {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
      background: #fff;
      white-space: pre-wrap;
      line-height: 1.5715;
    }
  }
} */
</style>
