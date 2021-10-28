<template>
  <b-input
    :model-value="modelValue"
    :placeholder="placeholder"
    :prefix="prefixIcon"
    size="small"
    @update:model-value="handleInput"
  >
    <template #suffix v-if="showSuffix">
      <b-dropdown trigger="click" placement="bottom-end" append-to-body @command="handleCommand" style="width: 32px;">
        <b-icon :name="suffixIcon" :title="suffixTitle" size="16" type="button"></b-icon>
        <template #dropdown>
          <b-dropdown-menu style="width: 200px;max-height: 240px;overflow-y: auto;">
            <b-dropdown-item
              v-for="(item,index) in images"
              :key="index"
              :name="item"
              style="height: 60px;"
            >
              <div flex="cross:center">
                <div style="width: 65px;height: 50px;margin-right: 16px;">
                  <img :src="getImgUrl(item)" style="width:100%;height: 100%;object-fit: contain;" alt="">
                </div>
                <div>{{ item.name }}</div>
              </div>
            </b-dropdown-item>
          </b-dropdown-menu>
        </template>
      </b-dropdown>
    </template>
  </b-input>
</template>

<script>
import { getImagesPath } from '@/utils/env'

export default {
  name: 'g-images',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    showSuffix: {
      type: Boolean,
      default: false,
    },
    suffixTitle: {
      type: String,
      default: '预设',
    },
    prefixIcon: {
      type: String,
      default: 'link',
    },
    suffixIcon: {
      type: String,
      default: 'sketch',
    },
    placeholder: {
      type: String,
    },
    staticPath: {
      type: String,
    },
    images: {
      type: Array,
      default: () => ([]),
    },
  },
  setup(props, ctx) {
    const handleInput = (value) => {
      ctx.emit('update:modelValue', value)
    }

    const getImgUrl = (img) => {
      const path = img.path
      const folder = props.staticPath || img.folder
      return (folder) ? getImagesPath(path, folder) : path
    }

    const handleCommand = (img) => {
      const path = props.staticPath ? img.path : getImgUrl(img) // 如果组件设置了本地路径，则只提交本地路径
      handleInput(path)
    }
    return {
      getImgUrl,
      handleInput,
      handleCommand,
    }
  },
}
</script>
