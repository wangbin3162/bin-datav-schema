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
      <div class="search-config" @click="openDetail" title="查看配置项">
        <b-icon name="filesearch" size="14" />
        <span>配置项</span>
      </div>
    </slot>

    <b-modal
      v-model="detailVisible"
      :title="`[${comAlias}] 配置项 `"
      append-to-body
      custom-class="schema-modal"
    >
      <div class="data-editor" style="margin: 0">
        <b-ace-editor
          :model-value="JSON.stringify(com, null, 2)"
          readonly
          theme="tomorrow_night"
          wrap
          :styles="{ border: 'none' }"
          height="500"
        />
      </div>
      <div class="t-right pt-8">
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
  },
  setup(props) {
    const detailVisible = ref(false)

    const comTitle = computed(() => {
      const obj = findComByName(props.comName)
      return obj ? obj.com.name : props.comName
    })

    const openDetail = () => {
      detailVisible.value = true
    }

    const copyCom = () => {
      copyText(JSON.stringify(props.com))
      Message.success('已复制配置项至剪切板')
    }

    return {
      openDetail,
      comTitle,
      copyCom,
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
