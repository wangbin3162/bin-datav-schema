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
      <div class="search-config" @click="toSearch" title="echarts option config">
        <i class="b-iconfont b-icon-search"></i>
        <span>搜索配置</span>
      </div>
    </slot>
  </div>
</template>

<script>
import { computed } from 'vue'
import { findComByName } from '@/config/components-list'

export default {
  name: 'config-title',
  props: {
    comName: {
      type: String,
      required: true,
    },
    comAlias: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const comTitle = computed(() => {
      const obj = findComByName(props.comName)
      return obj?.com.name
    })
    const toSearch = () => {
      window.open('https://echarts.apache.org/zh/option.html#title', '_blank')
    }

    return {
      toSearch,
      comTitle,
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
