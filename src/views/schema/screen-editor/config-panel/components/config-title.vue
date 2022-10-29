<template>
  <div class="com-title-wp">
    <div class="com-title">
      <div class="title-name">
        <span class="alias-name">{{ comAlias }}</span>
      </div>
      <div class="version-tag">
        <span>{{ comTitle }}</span>
      </div>
    </div>
    <slot>
      <div v-if="showCfg" class="search-config" @click="openDetail" title="查看配置项">
        <b-icon name="filesearch" size="14" />
        <span>配置项</span>
      </div>
    </slot>

    <b-modal
      v-model="detailVisible"
      :title="`[${comAlias}] 配置项 `"
      append-to-body
      top="60px"
      custom-class="schema-modal"
    >
      <div class="data-editor" style="margin: 0">
        <b-ace-editor v-model="compJson" theme="tomorrow_night" wrap :styles="{ border: 'none' }" />
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

<script>
import { computed, ref } from 'vue'
import { findComByName } from '@/config/components-list'
import { copyText } from '@/utils/util'
import { Message } from 'bin-ui-next'
import { useStore } from '@/store'

const { schemaStore, storeToRefs } = useStore()

const { selectedCom } = storeToRefs(schemaStore)

export default {
  name: 'config-title',
  props: {
    comName: {
      type: String,
    },
    comAlias: {
      type: String,
    },
    com: {
      type: Object,
      default: () => ({}),
    },
    showCfg: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:com'],
  setup(props) {
    const detailVisible = ref(false)
    const compJson = ref('')

    const comTitle = computed(() => {
      const obj = findComByName(props.comName)
      return obj ? obj.com.name : props.comName
    })

    const openDetail = () => {
      detailVisible.value = true
      compJson.value = JSON.stringify(props.com, null, 2)
    }

    const copyCom = () => {
      copyText(JSON.stringify(props.com))
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

    return {
      openDetail,
      compJson,
      comTitle,
      copyCom,
      putJson,
      detailVisible,
    }
  },
}
</script>

<style scoped lang="stylus">
.com-title-wp {
  position: relative;
  display: flex;
  height: 60px;
  padding-top: 12px;
  padding-right: 8px;
  color: #fff;
  align-items: flex-start;
  justify-content: space-between;
  .com-title {
    padding-right: 5px;
    padding-left: 10px;
    overflow: hidden;
    flex: 1;
    .title-name {
      display: flex;
      padding-bottom: 3px;
      font-size: 14px;
      flex-wrap: nowrap;
      align-items: center;
    }
    .alias-name {
      max-width: 160px;
      line-height: 24px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .version-tag {
      display: flex;
      font-size: 12px;
      color: #647279;
      flex-wrap: nowrap;
      align-items: center;
    }
  }
  .search-config {
    display: flex;
    max-width: 140px;
    line-height: 19px;
    color: #2681ff;
    cursor: pointer;
    align-items: center;
    > i {
      font-size: 12px;
    }
  }
}
</style>
