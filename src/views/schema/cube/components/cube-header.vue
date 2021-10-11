<template>
  <div class="action-panel">
    <div class="header-container">
      <div class="simple-header-left">
        <b-tooltip content="返回">
          <div class="simple-header-icon" @click="handleBack">
            <b-icon name="left" size="24"></b-icon>
          </div>
        </b-tooltip>
        <div class="simple-cube-icon">
          <cube-svg></cube-svg>
        </div>
        <input
          class="simple-header-input"
          placeholder="请输入名称"
          maxlength="50"
          type="text"
          v-model="name"
          @input="handleInputChange"
        >
      </div>
      <div class="simple-header-right">
        <div class="cube-btn" flex="cross:center">
          <b-space size="large">
            <b-tooltip content="另存为">
              <b-icon name="file-copy" size="18" type="button"></b-icon>
            </b-tooltip>
            <b-tooltip content="帮助">
              <b-icon name="question-circle" size="18" type="button"></b-icon>
            </b-tooltip>
            <span class="primary-btn" @click="handleSave">保存</span>
          </b-space>
        </div>
        <div class="cube-navigator" @click="handleCreatePc">
          <b-icon name="barchart" size="16"></b-icon>
          开始分析
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import CubeSvg from '@/views/schema/cube/components/cube-svg.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'cube-header',
  components: { CubeSvg },
  emits: ['update:modelValue', 'save', 'back'],
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    backUrl: {
      type: String,
    },
    pageStatus: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const name = ref('')
    const router = useRouter()

    const handleBack = () => {
      emit('back', props.backUrl)
    }

    const handleSave = () => {
      emit('save')
    }

    const handleInputChange = (e) => {
      emit('update:modelValue', e.target.value.trim())
    }

    // 创建仪表板
    const handleCreatePc = () => {
      const { id, workspaceId } = props.pageStatus
      let routeData = router.resolve({
        path: '/schema/screen',
        query: { workspaceId, sourceId: id, sourceType: 'cube' },
      })
      window.open(routeData.href, '_blank')
    }

    watch(() => props.modelValue, val => {
      name.value = val
    }, { immediate: true })

    return {
      name,
      handleSave,
      handleInputChange,
      handleBack,
      handleCreatePc,
    }
  },
}
</script>

<style scoped lang="stylus">
@import "../../../../assets/stylus/base/var.styl"
.action-panel {
  height: 50px;
  display: flex;
  background-color: #1d1e1f;
  .header-container {
    width: 100%;
    height: 50px;
    background-color: #1d1e1f;
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    .simple-header-left, .simple-header-right {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .simple-header-icon {
      cursor: pointer;
      border-right: 1px solid hsla(0, 0%, 100%, .2);
      height: 50px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .simple-cube-icon {
      height: 20px;
      > i {
        margin: 0 10px 0 14px;
        font-size: 20px;
      }
    }
    .simple-header-input {
      background-color: transparent;
      font-size: 16px;
      height: 30px;
      max-width: 236px;
      min-width: 30px;
      border: 1px solid transparent;
      border-radius: 0;
      color: #fff;
      line-height: 30px;
      padding: 4px 11px;
      outline: none;
      &:focus, &:active, &:focus-visible {
        border: 1px solid var(--bin-color-primary);
      }
    }
  }
  .cube-btn {
    height: 100%;
    .primary-btn {
      cursor: pointer;
      display: inline-block;
      width: 100px;
      height: 28px;
      text-align: center;
      line-height: 26px;
      color: #ffffff;
      background-color: var(--bin-color-primary);
      border: 1px solid var(--bin-color-primary);
      border-radius: 14px;
      + .primary-btn {
        margin-left: 14px;
      }
    }
  }
  .cube-navigator {
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 108px;
    height: 100%;
    cursor: pointer;
    font-size: 12px;
    &:hover {
      background: #000;
    }
    > i {
      margin-right: 4px;
    }
  }
}
</style>
