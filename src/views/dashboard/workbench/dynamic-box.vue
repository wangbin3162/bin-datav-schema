<template>
  <b-card :bordered="false" class="card-panel" shadow="never" :body-style="{padding: '16px'}">
    <template #header>
      <div flex="main:justify cross:center" style="font-weight: normal;">
        <div class="top">
          <iconfont icon="bulb" color="#722ed1" bg round></iconfont>
          <span class="ml-5">最新动态</span>
        </div>
        <a>更多</a>
      </div>
    </template>
    <div class="list-wrap">
      <div
        class="list-item"
        v-for="item in list"
        :key="item.id"
      >
        <div class="avatar">
          <img :src="item.avatar" alt="avatar">
        </div>
        <div class="content">
          <div class="title" v-html="item.title"></div>
          <p class="time">{{ item.time }}</p>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import Iconfont from '@/components/Common/Iconfont/iconfont.vue'
import avatar1 from '@/assets/images/avatar/avatar05.jpeg'
import avatar2 from '@/assets/images/avatar/avatar04.jpeg'
import avatar3 from '@/assets/images/avatar/avatar07.jpeg'
import avatar4 from '@/assets/images/avatar/avatar11.jpeg'
import avatar5 from '@/assets/images/avatar/avatar12.jpeg'
import avatar6 from '@/assets/images/avatar/avatar01.jpeg'

export default {
  name: 'dynamic-box',
  components: { Iconfont },
  data() {
    return {
      list: [
        {
          id: 1,
          avatar: avatar1,
          title: '<strong>Wang</strong> 关注了  <a>Jack</a>',
          time: '2021-06-01 12:35:20',
        },
        {
          id: 2,
          avatar: avatar2,
          title: '<strong>小李子</strong> 提出了问题 <a>组件库如何按需引入</a>',
          time: '2021-06-01 12:35:20',
        },
        {
          id: 3,
          avatar: avatar3,
          title: '<strong>PDD</strong> 发布了文章 <a>Vue页面优化</a>',
          time: '2021-06-01 12:35:20',
        },
        {
          id: 4,
          avatar: avatar4,
          title: '<strong>花仙子</strong> 发现了问题 <a>弹窗bug</a>',
          time: '2021-06-01 12:35:20',
        },
        {
          id: 5,
          avatar: avatar5,
          title: '<strong>Sunny</strong> 实现了 <a>Modal弹窗动画设置</a>',
          time: '2021-06-01 12:35:20',
        },
        {
          id: 6,
          avatar: avatar6,
          title: '<strong>史蒂夫</strong> 回复了 <a>Rose</a> 的问题 <a>如何返回顶部</a>',
          time: '2021-06-01 12:35:20',
        },
      ],
    }
  },
}
</script>

<style scoped lang="stylus">
.list-wrap {
  .list-item {
    display: flex;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eeeeee;
    &:last-child {
      margin-bottom: 0;
      border-bottom: none;
    }
    .avatar {
      font-size: 0;
      margin: 0 32px;
      width: 40px;
      img {
        width: 40px;
        border-radius: 50%;
      }
    }
    .content {
      flex: auto;
      .title {
        font-size: 14px;
        :deep(strong) {
          font-weight: 600;
        }
      }
      .time {
        font-size: 12px;
        color: rgb(128, 134, 149);
        margin-top: 5px;
      }
    }
  }
}
</style>
