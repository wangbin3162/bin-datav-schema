<template>
  <div class="action-bar-wrap" :style="actionStyle">
    <b-tooltip content="适应尺寸" placement="left">
      <i class="action-btn b-iconfont b-icon-aim" @click.stop="schemaStore.autoCanvasScale()" />
    </b-tooltip>
    <b-tooltip content="原始尺寸" placement="left">
      <i
        class="action-btn b-iconfont b-icon-icon-test"
        @click.stop="schemaStore.setCanvasScale(100)"
      />
    </b-tooltip>

    <b-tooltip content="编辑配置" placement="left">
      <i class="action-btn b-iconfont b-icon-edit-square" @click.stop="openDetail" />
    </b-tooltip>

    <b-tooltip content="工具设置" placement="left">
      <i
        class="action-btn b-iconfont b-icon-setting"
        @click.stop="toolbar.toolbox = !toolbar.toolbox"
      />
    </b-tooltip>

    <!-- 工具设置 -->
    <b-modal
      title="工具设置"
      v-model="toolbar.toolbox"
      append-to-body
      custom-class="schema-modal"
      width="600px"
    >
      <b-form label-position="left" label-width="100px">
        <b-form-item label="参考线">
          <b-space>
            <b-switch v-model="toolbox.referLine"></b-switch>
            选中组件时，左上角距离标尺的参考线，方便对齐使用
          </b-space>
        </b-form-item>
        <b-form-item label="对齐线">
          <b-space>
            <b-switch v-model="toolbox.markLine"></b-switch>
            开启后，拖拽组件至相邻组件时，达到一定距离后会自动吸附
          </b-space>
        </b-form-item>
        <b-form-item label="画布">
          <b-space>
            <g-input-number
              v-model="toolbox.grid"
              :min="1"
              :max="20"
              suffix="px"
              style="width: 120px"
            ></g-input-number>
            鼠标拖拽组件时移动的步长，单位px
          </b-space>
        </b-form-item>
        <b-form-item label="清空画布">
          <b-space>
            <b-button style="width: 120px" size="small" @click.stop="clearCanvas">
              清空
              <i class="action-btn b-iconfont b-icon-clear" />
            </b-button>
            画布清空会清除所有配置，请谨慎操作
          </b-space>
        </b-form-item>

        <b-form-item label="跨屏粘贴">
          <textarea
            class="paste-inner"
            ref="textpasteRef"
            placeholder="复制组件内容后在此处粘贴即可"
            @paste="paseEvent"
          ></textarea>
        </b-form-item>
      </b-form>
    </b-modal>

    <b-modal
      v-model="detailVisible"
      title="页面编辑器"
      append-to-body
      fullscreen
      custom-class="schema-modal"
    >
      <div class="data-editor" style="margin: 0">
        <b-ace-editor
          v-model="compJson"
          theme="tomorrow_night"
          :height="staticEditorHeight"
          :styles="{ border: 'none' }"
        />
      </div>
      <div class="t-right pt-16">
        <b-button size="small" type="primary" icon="snippets" @click="putJson">应用配置</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script setup>
import { computed, ref, onBeforeUnmount, onMounted } from 'vue'
import { useStore } from '@/store'
import { MessageBox, Message } from 'bin-ui-design'
import { generateId } from '@/utils/util'
import { on, off } from '@/utils/util'

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store

const { toolbar, toolbox, pageConfig, comps } = storeToRefs(schemaStore)

const actionStyle = computed(() => (schemaStore.toolbar.config ? { right: '360px' } : { right: 0 }))

const textpasteRef = ref(null)

const clearCanvas = () => {
  MessageBox.confirm({
    type: 'error',
    title: '确认清空画布吗？请谨慎操作！',
  })
    .then(() => {
      schemaStore.clearScreen()
    })
    .catch(() => {})
}

// 粘贴图表TODO：目前情况暂时还有点问题
function paseEvent(e) {
  const text = e.clipboardData.getData('Text')
  console.log(text)

  // 获取了数据之后进行转换，如果转换成json成功且是组件类型则进行复制
  try {
    const component = JSON.parse(text)
    if (component?.type === 'com' || component?.type === 'group') {
      component.id = `${component.name}_${generateId()}`
      if (component.name === 'Group') {
        // 如果要组合的组件中，已经存在组合数据，需要更新一下子子元素的id
        component.components.forEach(sub => {
          sub.id = `${sub.name}_${generateId()}` // 新生成id
        })
      }
      schemaStore.addCom({ component })

      Message.success('粘贴图表成功！')
    }
  } catch (error) {
    console.log(error)
    Message.error('粘贴的内容不是图表组件！')
  }

  setTimeout(() => {
    textpasteRef.value.value = ''
  }, 100)
}

const detailVisible = ref(false)
const compJson = ref('')
const staticEditorHeight = ref('360px')

const calcEdit = () => {
  staticEditorHeight.value = `${document.body.clientHeight - 125}px`
}

const openDetail = () => {
  detailVisible.value = true
  compJson.value = JSON.stringify(
    { pageConfig: pageConfig.value, components: comps.value },
    null,
    2,
  )
}

// 应用图表
const putJson = () => {
  try {
    const jsonData = JSON.parse(compJson.value)

    pageConfig.value = jsonData.pageConfig
    comps.value = jsonData.components

    Message.success('应用成功！')
    detailVisible.value = false
  } catch (error) {
    Message.error('配置项格式不正确，请检查后再应用配置！')
  }
}

onMounted(() => {
  calcEdit()
  on(window, 'resize', calcEdit)
})
onBeforeUnmount(() => {
  off(window, 'resize', calcEdit)
})
</script>

<style scoped>
.action-bar-wrap {
  position: fixed;
  right: var(--schema-options-width);
  bottom: 48px;
  z-index: 2;
  min-height: 32px;
  display: flex;
  flex-direction: column;
  transition: 0.25s ease-in-out;
  .action-btn {
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 4px;
    background-color: var(--s-color-3);
    margin-bottom: 6px;
    text-align: center;
    transition: 0.25s ease-in-out;
    &:hover {
      background-color: var(--s-color-2);
    }
  }
}

.paste-inner {
  border: 1px solid var(--s-border-color);
  color: var(--s-text-color);
  background: var(--schema-color-bg-2);
  width: 100%;
  padding: 0 4px;
  height: 64px;
  line-height: 22px;
  outline: none;
  resize: none;
}
</style>
