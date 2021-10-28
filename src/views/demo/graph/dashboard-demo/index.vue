<template>
  <page-wrapper>
    <template #desc>
      <div style="margin:0 0 -16px">
        <b-tabs v-model="activeTab" :data="tabs"></b-tabs>
      </div>
    </template>
    <b-collapse-wrap title="仪表板" shadow="none">
      <template #right>
        <b-space>
          <b-input size="small" placeholder="请输入..." search @search="initList"></b-input>
          <b-button size="small" icon="plus" type="primary" @click="handleCreate">新建仪表板</b-button>
          <b-button size="small" icon="plus" type="primary" transparent>新建文件夹</b-button>
        </b-space>
      </template>
      <div class="p16">
        <ul class="list-wrap" v-loading="loading" v-no-data="list.length===0">
          <li v-for="item in list" :key="item.id" class="base-list-item">
            <div class="list-item-meta">
              <b-icon name="barchart"></b-icon>
              <div class="list-item-meta-content">
                <div class="list-item-meta-title">
                  <a @click="handleEdit(item)">{{ item.datasetName }}</a>
                </div>
                <div class="list-item-meta-description">{{ item.workspaceId }}</div>
              </div>
            </div>
            <div class="list-item-content">
              <div class="list-item-content-item" style="width: 180px;">
                <span>创建者</span>
                <p>{{ item.creator }}</p>
              </div>
              <div class="list-item-content-item">
                <span>修改人：{{ item.updater }}</span>
                <p>修改时间：{{ item.updateDate }}</p>
              </div>
              <div class="list-item-content-item pt-8" style="width: 120px;">
                <span>{{ item.datasourceName }}</span>
              </div>
            </div>
            <div class="list-item-action">
              <action-button type="text" icon="edit-square" @click="handleEdit(item)"></action-button>
              <action-button
                type="text"
                icon="delete"
                color="#f5222d"
                confirm
                :disabled="['screen_0001','screen_0002'].includes(item.id)"
                @click="handleRemove(item.id)"
              ></action-button>
            </div>
          </li>
        </ul>
      </div>
    </b-collapse-wrap>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/Common/Page/page-wrapper.vue'
import ActionButton from '@/components/Common/ActionButton/index.vue'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { getAnalysisList, removeScreen } from '@/api/database.api'
import { Message } from 'bin-ui-next'

export default {
  name: 'DatasetDemo',
  components: { ActionButton, PageWrapper },
  setup() {
    const tabStatus = reactive({
      tabs: [
        { key: 'all', title: '全部' },
        { key: 'mine', title: '我的' },
      ],
      activeTab: 'all',
    })
    const listStatus = reactive({
      loading: false,
      list: [],
    })
    const router = useRouter()

    const handleEdit = (item) => {
      let routeData = router.resolve({
        path: '/schema/screen',
        query: { id: item.id },
      })
      window.open(routeData.href, '_blank')
    }

    const handleCreate = () => {
      let routeData = router.resolve({
        path: '/schema/screen',
        query: {},
      })
      window.open(routeData.href, '_blank')
    }

    const handleRemove = async (id) => {
      const res = await removeScreen(id)
      if (res) {
        Message.error('删除成功！')
        await initList()
      }
    }

    async function initList() {
      try {
        listStatus.loading = true
        const { data } = await getAnalysisList()
        listStatus.list = data
      } catch (e) {
        console.log(e)
      }
      listStatus.loading = false
    }

    initList()
    return {
      ...toRefs(tabStatus),
      ...toRefs(listStatus),
      handleEdit,
      handleCreate,
      handleRemove,
      initList,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/var.styl"
@import "../../../../assets/stylus/base/mixins.styl"
.list-wrap {
  min-height: 200px;
}
.base-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: $border-base;
  .list-item-meta {
    display: flex;
    width: 40%;
    align-items: flex-start;
    font-size: 0;
    > .b-iconfont {
      background-color: #fa8c16;
      color: #fff;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 32px;
      margin-right: 16px;
      margin-left: 8px;
    }
    .list-item-meta-content {
      flex: 1;
      .list-item-meta-title a {
        font-weight: 500;
        margin-bottom: 4px;
        color: $color-text-default;
        font-size: 14px;
        line-height: 22px;
        &:hover {
          color: getColor();
        }
      }
      .list-item-meta-description {
        color: $color-text-secondary;
        font-size: 12px;
        line-height: 22px;
      }
    }
  }
  .list-item-content {
    display: flex;
    width: 45%;
    &-item {
      display: inline-block;
      line-height: 1.5;
      margin-left: 32px;
      color: $color-text-secondary;
      font-size: 12px;
      vertical-align: middle;
    }
  }
  .list-item-action {
    width: 10%;
  }
  &:hover {
    background-color: #fafafa;
  }
}
</style>
