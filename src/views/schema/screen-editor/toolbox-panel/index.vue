<template>
  <div :class="['toolbox-panel-wp', { 'is-hide': !toolbar.toolbox }]">
    <div class="toolbox-panel" flex="main:justify">
      <div style="width: 500px" flex>
        <b-button size="mini" @click="undo">
          <i class="action-btn b-iconfont b-icon-rollback"></i>
          撤销
        </b-button>
        <b-button size="mini" @click="redo">
          <i class="action-btn b-iconfont b-icon-rollback" style="transform: rotateY(180deg)" />
          重做
        </b-button>
        <div></div>
        <div class="btn-box">
          参考线&nbsp;&nbsp;
          <b-switch v-model="toolbox.referLine" size="small"></b-switch>
        </div>
        <div class="btn-box">
          对齐线&nbsp;&nbsp;
          <b-switch v-model="toolbox.markLine" size="small"></b-switch>
        </div>
      </div>
      <div class="ctrl-box" flex="cross:center">
        &nbsp;&nbsp;

        <textarea v-if="paseVisible" class="paste-inner" ref="textpasteRef"></textarea>
        <b-button v-else size="mini" icon="diff" @click="pasteOpen">粘贴图表</b-button>
        <b-button size="mini" icon="clear" @click="clearCanvas">清空画布</b-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import { Message, MessageBox } from 'bin-ui-next'
import { useStore } from '@/store'
import { generateId } from '@/utils/util'

const { schemaStore, storeToRefs } = useStore() // 执行获取schema专属store
const { toolbar, toolbox } = storeToRefs(schemaStore)

const paseVisible = ref(false)
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

const undo = () => schemaStore.undo()
const redo = () => schemaStore.redo()

function pasteOpen() {
  paseVisible.value = true
  nextTick(() => {
    textpasteRef.value && textpasteRef.value.addEventListener('paste', paseEvent)
    textpasteRef.value.focus()
    textpasteRef.value.placeholder = '粘贴图表配置'
  })
}
function paseEvent(e) {
  const text = e.clipboardData.getData('Text')
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
    paseVisible.value = false
    textpasteRef.value.removeEventListener('paste', paseEvent)
  }, 100)
}
</script>

<style>
.paste-inner {
  border: 1px solid var(--schema-ui-border);
  color: #a1aeb3;
  background: var(--schema-ui-bg);
  width: 86px;
  padding: 0 4px;
  height: 24px;
  line-height: 22px;
  outline: none;
  resize: none;
  margin-right: 8px;
}
</style>
