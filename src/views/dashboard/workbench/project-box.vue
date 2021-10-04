<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '0'}" divider="no">
    <template #header>
      <div flex="main:justify cross:center" style="font-weight: normal;">
        <div class="top">
          <iconfont icon="block" color="primary" bg round></iconfont>
          <span class="ml-5">我的项目</span>
        </div>
        <a>更多</a>
      </div>
    </template>
    <div class="items-wrap">
      <a class="hover-item" href="https://wangbin3162.gitee.io/bin-ui-next" target="_blank">
        <div class="title">
          <iconfont icon="appstore" color="#25bbe3" :size="36" bg round />
          <span class="ml-15">Bin UI Next</span>
        </div>
        <div class="desc">一个基于 vue3 的组件库</div>
        <div class="desc" flex="main:justify"><span>开源库</span><span>1.0.0</span></div>
      </a>
      <a class="hover-item" href="https://wangbin3162.gitee.io/bin-editor-next" target="_blank">
        <div class="title">
          <iconfont icon="codelibrary" color="#4ab017" :size="36" bg round />
          <span class="ml-15">Ace Editor</span>
        </div>
        <div class="desc">基于 vue3 的json编辑器组件</div>
        <div class="desc" flex="main:justify"><span>开源库</span><span>1.0.0</span></div>
      </a>
      <a class="hover-item" href="https://wangbin3162.gitee.io/bin-charts-next" target="_blank">
        <div class="title">
          <iconfont icon="barchart" color="#304255" :size="36" bg round />
          <span class="ml-15">Charts</span>
        </div>
        <div class="desc">基于 vue3,echart5的图表组件</div>
        <div class="desc" flex="main:justify"><span>开源库</span><span>1.0.0</span></div>
      </a>
      <a class="hover-item" href="https://wangbin3162.gitee.io/bin-tree-org" target="_blank">
        <div class="title">
          <iconfont icon="cluster" color="#fa8c16" :size="36" bg round />
          <span class="ml-15">Tree Org</span>
        </div>
        <div class="desc">树形组织结构</div>
        <div class="desc" flex="main:justify"><span>开源库</span><span>1.3.0</span></div>
      </a>
      <a class="hover-item" href="https://wangbin3162.gitee.io/bin-animation" target="_blank">
        <div class="title">
          <iconfont icon="thunderbolt" color="#eb2f96" :size="36" bg round />
          <span class="ml-15">Animation</span>
        </div>
        <div class="desc">CSS3动画库</div>
        <div class="desc" flex="main:justify"><span>Javascript</span><span>1.1.1</span></div>
      </a>
      <a class="hover-item" href="https://wangbin3162.gitee.io/bin-admin-pro" target="_blank">
        <div class="title">
          <iconfont icon="sketch" color="#8e58da" :size="36" bg round />
          <span class="ml-15">Admin Pro</span>
        </div>
        <div class="desc">基于 bin-ui 的集成管理平台</div>
        <div class="desc" flex="main:justify"><span>admin</span><span>1.0.0</span></div>
      </a>
    </div>
  </b-card>
</template>

<script>
import Iconfont from '@/components/Common/Iconfont/iconfont.vue'

export default {
  name: 'project-box',
  components: { Iconfont },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
.card-panel {
  margin-bottom: 16px;
}
.items-wrap {
  display: flex;
  flex-wrap: wrap;
}
.hover-item {
  width: 33.33%;
  padding: 20px;
  border: 0;
  border-radius: 0;
  box-shadow: 1px 0 0 0 #f0f0f0, 0 1px 0 0 #f0f0f0, 1px 1px 0 0 #f0f0f0, 1px 0 0 0 #f0f0f0 inset, 0 1px 0 0 #f0f0f0 inset;
  transition: all .3s;
  &:hover {
    position: relative;
    z-index: 1;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  .title {
    color: $color-text-primary;
    font-size: 18px;
    padding-bottom: 4px;
    > span {
      font-weight: 600;
    }
  }
  .desc {
    color: $color-text-secondary;
    margin-top: 12px;
  }
}
</style>
