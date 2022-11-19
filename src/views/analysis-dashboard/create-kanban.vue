<template>
  <b-modal
    v-model="visible"
    title="新建看板"
    width="1000px"
    custom-class="schema-modal"
    destroy-on-close
  >
    <div>
      <h2 class="title-bar">预设</h2>
      <div class="preset-wp">
        <div
          class="preset-item web-box"
          :class="{ selected: createValue.type === 'web' }"
          @click="selectPreset('web')"
        >
          <i class="b-iconfont b-icon-laptop"></i>
          <div class="label-title">
            <div class="h2">{{ webValue.label }}</div>
            <div class="h4">{{ webValue.width }}x{{ webValue.height }}</div>
          </div>
          <b-dropdown
            trigger="click"
            placement="bottom-end"
            style="width: 24px; height: 46px; line-height: 46px"
            @command="handleWebTrigger"
          >
            <b-icon name="down" type="button"></b-icon>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item v-for="item in webScreenMap" :key="item.label" :name="item">
                  <div flex="main:justify" style="width: 180px">
                    <span>{{ item.label }}</span>
                    <span>{{ item.width }}x{{ item.height }}</span>
                  </div>
                </b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
        <div
          class="preset-item mobile-box"
          :class="{ selected: createValue.type === 'mobile' }"
          @click="selectPreset('mobile')"
        >
          <i class="b-iconfont b-icon-mobile"></i>
          <div class="label-title">
            <div class="h2">{{ mobileValue.label }}</div>
            <div class="h4">{{ mobileValue.width }}x{{ mobileValue.height }}</div>
          </div>
          <b-dropdown
            trigger="click"
            placement="bottom-end"
            style="width: 24px; height: 46px; line-height: 46px"
            @command="handleMobileTrigger"
          >
            <b-icon name="down" type="button"></b-icon>
            <template #dropdown>
              <b-dropdown-menu>
                <b-dropdown-item v-for="item in mobileScreenMap" :key="item.label" :name="item">
                  <div flex="main:justify" style="width: 180px">
                    <span>{{ item.label }}</span>
                    <span>{{ item.width }}x{{ item.height }}</span>
                  </div>
                </b-dropdown-item>
              </b-dropdown-menu>
            </template>
          </b-dropdown>
        </div>
        <div
          class="preset-item custom-box"
          :class="{ selected: createValue.type === 'custom' }"
          @click="selectPreset('custom')"
        >
          <i class="b-iconfont b-icon-gateway"></i>
          <div>
            <p class="mb-5">自定义大小</p>
            <p class="custom-input">
              <span class="mr-5">W:</span>
              <b-input-number
                v-model="customValue.width"
                :min="100"
                :step="1"
                :precision="0"
                size="mini"
                @change="changeSize(customValue)"
              />
              <span class="ml-5 mr-5">H:</span>
              <b-input-number
                v-model="customValue.height"
                :min="100"
                :step="1"
                :precision="0"
                size="mini"
                @change="changeSize(customValue)"
              />
            </p>
          </div>
          <div style="width: 24px"></div>
        </div>
      </div>
      <h2 class="title-bar">模板</h2>
      <div class="template-list">
        <div class="template-grid" v-for="tpl in templates" :key="tpl.id">
          <div
            class="template-item"
            :class="{ selected: createValue.type === 'tpl' && createValue.tpl === tpl.id }"
            @click="selectTpl(tpl)"
          >
            <div class="template-image">
              <div class="preview-image">
                <img v-if="getThumb(tpl.pageConfig)" :src="getThumb(tpl.pageConfig)" alt="" />
                <img
                  v-else
                  src="@/assets/images/logo/logo.png"
                  alt="default"
                  style="width: 147px; height: 147px"
                />
              </div>
              <div class="tpl-remove">
                <b-button
                  type="text"
                  text-color="#f5222d"
                  title="移除模板"
                  icon="delete"
                  @click="removeTpl(tpl)"
                ></b-button>
              </div>
            </div>
            <div class="template-info">
              <div class="template-name" t-ellipsis :title="tpl.name">{{ tpl.name }}</div>
              <div class="template-size">
                <p>画布尺寸</p>
                <p>{{ tpl.pageConfig.width }}x{{ tpl.pageConfig.height }}px</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <b-button @click="closeModal">取消</b-button>
      <b-button type="primary" @click="createScreen">开始创作</b-button>
    </template>
  </b-modal>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { defaultCreateObj, saveCreateData } from '@/api/database.api'
import { getTemplateList, removeTemplate } from '@/api/modules/template.api'
import { throwError } from '@/utils/util'
import { MessageBox, Message } from 'bin-ui-next'
import { webScreenMap, mobileScreenMap } from '@/config/enum'
import { useRouter } from 'vue-router'

const router = useRouter()
const visible = ref(false)
// 实际创建存储值
const createValue = reactive({ ...defaultCreateObj })

// web模式临时存储显示
const webValue = reactive({
  label: webScreenMap[0].label,
  width: webScreenMap[0].width,
  height: webScreenMap[0].height,
})
// mobile模式临时存储显示
const mobileValue = reactive({
  label: mobileScreenMap[0].label,
  width: mobileScreenMap[0].width,
  height: mobileScreenMap[0].height,
})
// custom模式临时存储显示
const customValue = reactive({
  width: 1920,
  height: 1080,
})
// 模板列表
const templates = ref([])

const closeModal = () => {
  visible.value = false
}

const openCreate = () => {
  // 初始化
  createValue.label = webScreenMap[0].label
  createValue.width = webScreenMap[0].width
  createValue.height = webScreenMap[0].height
  createValue.type = 'web'
  createValue.tpl = ''
  getTplList()
  visible.value = true
}

const selectTpl = tpl => {
  createValue.type = 'tpl'
  createValue.tpl = tpl.id
}

const changeSize = ({ width, height }) => {
  createValue.label = '自定义'
  createValue.width = width
  createValue.height = height
  createValue.tpl = ''
}

const handleWebTrigger = item => {
  webValue.label = item.label
  webValue.width = item.width
  webValue.height = item.height
  // 更新实际值
  createValue.label = item.label
  createValue.type = item.type
  createValue.width = item.width
  createValue.height = item.height
  createValue.tpl = ''
}

const handleMobileTrigger = item => {
  mobileValue.label = item.label
  mobileValue.width = item.width
  mobileValue.height = item.height
  // 更新实际值
  createValue.label = item.label
  createValue.type = item.type
  createValue.width = item.width
  createValue.height = item.height
  createValue.tpl = ''
}

const getTplList = () => {
  getTemplateList().then(res => {
    templates.value = (res.rows || []).map(item => {
      let json = {}
      try {
        json = JSON.parse(item.content)
      } catch (e) {
        json = { pageConfig: {} }
      }
      return {
        id: item.id,
        name: item.name,
        pageConfig: json.pageConfig,
      }
    })
  })
}

const removeTpl = tpl => {
  MessageBox.confirm({
    type: 'error',
    title: '确定删除当前模板吗？',
  })
    .then(async () => {
      try {
        await removeTemplate(tpl.id)
        getTplList()
        Message.success('移除模板成功！')
      } catch (e) {
        throwError('create-screen/removeTpl', e)
      }
    })
    .catch(() => {})
}

const selectPreset = type => {
  if (type === 'web') {
    createValue.label = webValue.label
    createValue.width = webValue.width
    createValue.height = webValue.height
  } else if (type === 'mobile') {
    createValue.label = mobileValue.label
    createValue.width = mobileValue.width
    createValue.height = mobileValue.height
  } else if (type === 'custom') {
    createValue.label = '自定义'
    createValue.width = customValue.width
    createValue.height = customValue.height
  }
  createValue.type = type
  createValue.tpl = ''
}

const createScreen = async () => {
  closeModal()
  await saveCreateData(createValue)

  const route = router.resolve('/schema/screen')
  window.open(route.href, '_blank')
}

function getThumb(pageConfig) {
  return pageConfig.thumbnail || pageConfig.bgImage
}

defineExpose({
  openCreate,
})
</script>

<style scoped lang="stylus">
.title-bar {
  font-size: 18px;
  margin-bottom: 8px;
  font-weight: normal;
  font-family: YouSheBiaoTiHei, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial, Helvetica, sans-serif;
}
.preset-wp {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  .preset-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    width: 32%;
    padding-right: 20px;
    background: #262c33;
    border: 1px solid #0b0c0d;
    transition: 0.2s;
    &.selected {
      border: 1px solid var(--bin-color-primary);
    }
    > i {
      font-size: 40px;
      padding: 0 20px;
      font-weight lighter;
    }
    .label-title {
      width: 140px;
      .h2 {
        font-size: 14px;
      }
      .h4 {
        color: #666;
      }
    }
    .b-icon-down {
      width: 24px;
      text-align: center;
      &:hover {
        color: var(--bin-color-primary);
        background: #414750;
        border-radius: 5px;
      }
    }
    .custom-input {
      display: flex;
      align-items: center;
      :deep(.bin-input-number) {
        border: none;
        width: 75px;
        border-bottom: 1px solid #0b0c0d;
        .bin-input-number-handler {
          display: none;
        }
      }
    }
  }
}
.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: -8px;
  margin-right: -8px;
  color: #fff;
  font-size: 12px;
  .template-grid {
    width: 25%;
    padding: 0 8px;
  }
  .template-item {
    cursor: pointer;
    height: 184px;
    box-shadow: 0 0 10px -6px #000;
    border: 1px solid #0b0c0d;
    margin-bottom: 16px;
    transition: 0.2s;
    &:hover {
      border: 1px solid var(--bin-color-primary);
      .preview-image img {
        transform: scale(1.15);
      }
    }
    .template-image {
      width: 100%;
      height: 146px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s;
      position: relative;
    }

    .template-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      height: 36px;
      background: #1d262e;
      transition: 0.2s;
    }
    .tpl-remove {
      position: absolute;
      top: 4px;
      right: 8px;
    }
    .preview-image {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        opacity: 0.7;
        transition: .2s;
        object-fit: cover;
      }
    }
    .template-name {
      font-size: 12px;
    }
    .template-size {
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: right center;
      color: #999;
      text-align: right;
      font-family: Orbitron-Bold, PingFangSC-Medium, PingFang SC, Microsoft YaHei, Arial, Helvetica, sans-serif;
    }
    &.selected {
      border: 1px solid var(--bin-color-primary);
    }
  }
  .template-item-placeholder {
    width: 258px;
    margin: 16px;
  }
}
</style>
