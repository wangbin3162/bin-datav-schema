<template>
  <div class="page-container" :class="{ 'in-scroll': innerScroll }" :style="pageStyle">
    <div class="page-header" v-if="!hideHeader">
      <!-- slot header 完全自定义顶部 -->
      <slot name="header">
        <div class="page-header-inner">
          <div class="page-header-heading" v-if="!hideTitle">
            <i v-if="showBack" class="b-iconfont" :class="`b-icon-${backIcon} back-icon`" @click="$emit('back')"></i>
            <b-popover trigger="hover" placement="right" width="" v-if="isBubbles">
              <span class="page-header-heading-title">
                {{ normalTitle }}
                <b-icon name="question-circle-fill"></b-icon>
              </span>
              <template #content>
                <div>{{ normalDesc }}</div>
              </template>
            </b-popover>
            <span class="page-header-heading-title" v-else>{{ normalTitle }}</span>
            <slot name="header-right"></slot>
          </div>
          <div v-if="!hideTitle && ($slots.desc || desc)" class="p5" />
          <div class="page-header-desc" v-if="$slots.desc || desc">
            <slot name="desc">{{ normalDesc }}</slot>
          </div>
          <b-icon v-if="showClose" name="close" type="button" @click="$emit('close')"></b-icon>
        </div>
      </slot>
    </div>
    <div class="page-content" :style="{ margin: innerScroll ? 0 : contentMargin }">
      <!-- 默认插槽 -->
      <div
        v-if="innerScroll"
        :style="{ padding: bg ? contentPadding : null, height: '100%' }"
        :class="{ 'has-bg': bg }"
      >
        <b-scrollbar wrap-class="scrollbar-box" always>
          <div :style="{ padding: contentPadding }">
            <slot></slot>
          </div>
        </b-scrollbar>
      </div>
      <div v-else :style="{ padding: bg ? contentPadding : null }" :class="{ 'has-bg': bg }">
        <slot></slot>
      </div>
    </div>
    <!-- 底部插槽 -->
    <div class="page-footer" :style="footerStyle" v-if="$slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import useSetting from '@/hooks/store/useSetting'
import useMenu from '@/hooks/store/useMenu'

export default {
  name: 'PageContainer',
  props: {
    title: String,
    desc: String,
    isBubbles: Boolean,
    contentMargin: {
      type: String,
      default: '16px',
    },
    contentPadding: {
      type: String,
      default: '16px',
    },
    hideTitle: Boolean,
    hideHeader: Boolean,
    showClose: Boolean,
    bg: Boolean,
    showBack: Boolean, // 返回函数
    backIcon: {
      type: String,
      default: 'arrowleft',
    },
    innerScroll: Boolean, // 内部scrollbar模式，多用于业务列表实用
  },
  emits: ['close', 'back'],
  setup(props) {
    const { getCurrentRouteMenu } = useMenu()
    const normalTitle = computed(() =>
      props.title ? props.title : getCurrentRouteMenu() ? getCurrentRouteMenu().title : 'no-title',
    )
    const normalDesc = computed(() =>
      props.desc ? props.desc : getCurrentRouteMenu() ? getCurrentRouteMenu().desc : '',
    )

    const { contentFull, pageFooterWidth } = useSetting()

    const pageStyle = computed(() => {
      return props.innerScroll
        ? {
            position: 'absolute',
            right: 0,
            width: '100%',
            height: `calc(100vh - ${contentFull.value ? '42px' : '90px'})`,
          }
        : null
    })
    const footerStyle = computed(() => {
      return props.innerScroll ? { width: '100%' } : { ...pageFooterWidth.value }
    })

    return { pageStyle, normalTitle, normalDesc, footerStyle }
  },
}
</script>

<style scoped lang="stylus">
.page-container {
  .page-header {
    position: relative;
    box-sizing: border-box;
    margin: 0;
    background-color: #fff;
    border-bottom: var(--bin-border-base);
    &-inner {
      font-size: 14px;
      font-variant: tabular-nums;
      line-height: 1.5715;
      list-style: none;
      padding: 16px 24px;
    }
    &-heading {
      width: 100%;
      overflow: hidden;
      &-title {
        color: #17233d;
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 0;
        padding-right: 12px;
      }
    }
    .back-icon {
      cursor: pointer;
      font-size: 20px;
      color: rgba(0, 0, 0, .65);
      margin-right: 6px;
      transition: .25s;
      font-weight: 500;
      &:hover {
        color: var(--bin-color-primary);
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
      transition: .25s;
      &:hover {
        color: var(--bin-color-danger);
      }
    }
    :deep(.bin-form) {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      padding: 12px 24px 0;
      .bin-form-item {
        margin-right: 0;
        margin-bottom: 12px;
        width: 25%;
        .bin-form-item__label {
          padding-left: 6px;
          text-align: center;
        }
      }
    }
  }
  .page-content {
    .has-bg {
      background-color: #fff;
    }
  }

  .page-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 10;
    width: 100%;
    padding: 10px 24px;
    background: #fff;
    border-top: var(--bin-border-base);
    box-shadow: 0 -6px 8px -8px rgba(0, 0, 0, 0.08), 0 -9px 10px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
  }

  &.in-scroll {
    display: flex;
    flex-direction: column;
    .page-content {
      flex: 1;
      overflow: auto;
    }
    .page-footer{
      position: static;
    }
  }
}
</style>
