<template>
  <div class="action-panel">
    <div class="header-container">
      <div class="simple-header-left">
        <b-tooltip content="返回" theme="light">
          <div class="simple-header-icon" @click="handleBack">
            <b-icon name="left" size="24"></b-icon>
          </div>
        </b-tooltip>
        <div class="simple-cube-icon">
          <i class="iconfont svg-icon-wrapper">
            <svg class="svg-icon" viewBox="0 0 1024 1024" aria-hidden="true" width="1em" height="1em"
                 fill="currentColor">
              <path
                d="M93.090909 605.090909h153.6v256H93.090909zM777.309091 162.909091H930.909091v698.181818h-153.6zM437.527273 381.672727h153.6v479.418182H437.527273z"
                data-spm-anchor-id="0.0.0.i8.7ecf4666dsN92y"></path>
            </svg>
          </i>
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
            <b-tooltip content="帮助" theme="light">
              <b-icon name="question-circle" size="18" type="button"></b-icon>
            </b-tooltip>
            <span class="primary-btn transparent" @click="handleSave">预览</span>
            <span class="primary-btn transparent" @click="handleSave">保存</span>
            <span class="primary-btn" @click="handleSave">保存并发布</span>
          </b-space>
        </div>
        <div class="cube-navigator">
          <b-dropdown trigger="click">
            <i class="iconfont svg-icon-wrapper icon-qbi-gengduo"
               data-spm-anchor-id="0.0.0.i22.7ecf4666dsN92y">
              <svg class="svg-icon" viewBox="0 0 1024 1024" aria-hidden="true" width="1em" height="1em"
                   fill="currentColor"
                   data-spm-anchor-id="0.0.0.i21.7ecf4666dsN92y">
                <path
                  d="M393.846154 787.692308h236.307692v236.307692H393.846154zM393.846154 393.846154h236.307692v236.307692H393.846154zM393.846154 0h236.307692v236.307692H393.846154z"
                  fill="" data-spm-anchor-id="0.0.0.i7.7ecf4666dsN92y"></path>
              </svg>
            </i>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item icon="file-copy">复制</b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'header-bar',
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

    const handleBack = () => {
      emit('back', props.backUrl)
    }

    const handleSave = () => {
      emit('save')
    }

    const handleInputChange = (e) => {
      emit('update:modelValue', e.target.value.trim())
    }

    watch(() => props.modelValue, val => {
      name.value = val
    }, { immediate: true })

    return {
      name,
      handleSave,
      handleInputChange,
      handleBack,
    }
  },
}
</script>
