<template>
  <div class="custom-scripts">
    <g-field-collapse label="初始化脚本" default-open>
      <g-field label="执行脚本">
        <div class="func-name" flex="main:justify cross:center">
          <b-checkbox v-model="pageConfig.initScript.enable" />
          <b-button type="text" icon="edit" size="small" @click="openEditor">编辑</b-button>
        </div>
      </g-field>
      <div class="fun">
        <p class="top">
          async function (
          <span class="params">{{ params }}</span>
          ){
        </p>
        <p class="code" style="user-select: text">
          <highlightjs language="js" :code="pageConfig.initScript.scriptStr" />
        </p>
        <p class="bottom">}</p>
      </div>

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
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from '@/store'

defineOptions({
  name: 'scriptConfig',
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

const { pageConfig, comps } = storeToRefs(schemaStore)

const editorRef = ref(null)

// 参数
const params = computed(() => ['components', 'userInfo', 'util'].join(', '))

function openEditor() {
  const str = pageConfig.value.initScript.scriptStr
  editorRef.value?.open(str)
}

function handleSuccess(val) {
  pageConfig.value.initScript.scriptStr = val
  schemaStore.setPageInfo(pageConfig.value)
}
</script>

<style scoped>
.custom-scripts {
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
      margin: 5px 0;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-family: Monaco, Menlo, 'Ubuntu Mono', Consolas, source-code-pro, monospace;
      white-space: pre-wrap;
      line-height: 1.5715;
    }
  }
}
</style>
