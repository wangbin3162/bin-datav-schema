<template>
  <div class="page-header-wrap">
    <div class="page-header-wrap-page-header-warp">
      <div class="grid-content">
        <div class="page-header has-breadcrumb">
          <div class="page-header-heading">
            <span class="page-header-heading-title">{{ normalTitle }}</span>
            <slot name="right"></slot>
          </div>
          <div class="page-header-desc" v-if="$slots.desc || desc">
            <slot name="desc">{{ desc }}</slot>
          </div>
          <b-icon v-if="showClose" name="close" type="button" @click="$emit('close')"></b-icon>
        </div>
      </div>
    </div>
    <div class="grid-content">
      <div
        class="page-header-wrap-children-content"
        :class="{'has-bg':bg}"
        :style="{margin:contentMargin,padding:bg?contentPadding:null}"
      >
        <slot>
        </slot>
      </div>
    </div>
    <page-footer v-if="getShowFooter">
      <template #left>
        <slot name="leftFooter" />
      </template>
      <template #right>
        <slot name="rightFooter" />
      </template>
    </page-footer>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import useSetting from '@/hooks/store/useSetting'
import useMenu from '@/hooks/store/useMenu'
import PageFooter from '@/components/Common/Page/page-footer.vue'

export default {
  name: 'PageWrapper',
  components: { PageFooter },
  props: {
    title: String,
    desc: String,
    showClose: Boolean,
    bg: Boolean,
    contentPadding: {
      type: String,
      default: '16px',
    },
    contentMargin: {
      type: String,
      default: '16px',
    },
  },
  emits: ['close'],
  setup(props, { slots }) {
    const { showTagsView } = useSetting()
    const { getCurrentRouteMenu } = useMenu()
    const normalTitle = computed(() => props.title ? props.title : (getCurrentRouteMenu() ? getCurrentRouteMenu().title : 'no-title'))

    const getShowFooter = ref(slots.leftFooter || slots.rightFooter)

    return {
      normalTitle,
      showTagsView,
      getShowFooter,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../assets/stylus/base/var.styl"
.page-header-wrap {
  .page-header {
    position: relative;
    box-sizing: border-box;
    margin: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    padding: 16px 24px;
    background-color: #fff;
    border-bottom: $border-base;
    &-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      &-title {
        color: #17233d;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 0;
        padding-right: 12px;
        overflow: hidden;
      }
    }
    .b-icon-close {
      position: absolute;
      right: 24px;
      top: 16px;
      z-index: 1;
      font-weight: normal;
      cursor: pointer;
      font-size: 20px;
      margin-right: 6px;
      color: rgba(0, 0, 0, .65);
      &:hover {
        color: rgba(0, 0, 0, .85);
      }
    }
    &-desc {
      padding-top: 16px;
    }
  }
  &-children-content {
    margin: 16px;
    &.has-bg {
      background-color: #fff;
    }
  }
}
.grid-content {
  width: 100%;
  min-height: 100%;
  transition: .3s;
}
</style>
