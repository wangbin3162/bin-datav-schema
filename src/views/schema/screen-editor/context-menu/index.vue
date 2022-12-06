<template>
  <transition name="zoom-in-top">
    <div v-if="contextMenu.show" class="context-menu-wrap" :style="contextMenuStyle">
      <div class="context-menu-item" @click="moveTop">
        <i
          class="menu-icon b-iconfont b-icon-vertical-align-botto"
          style="transform: rotate(180deg)"
        ></i>
        置顶
        <span class="key-code">Alt + Home</span>
      </div>
      <div class="context-menu-item" @click="moveBottom">
        <i class="menu-icon b-iconfont b-icon-vertical-align-botto"></i>
        置底
        <span class="key-code">Alt + End</span>
      </div>
      <div class="context-menu-item" @click="moveUp">
        <i class="menu-icon b-iconfont b-icon-arrowup"></i>
        上移一层
        <span class="key-code">Alt + ↑</span>
      </div>
      <div class="context-menu-item" @click="moveDown">
        <i class="menu-icon b-iconfont b-icon-arrowdown"></i>
        下移一层
        <span class="key-code">Alt + ↓</span>
      </div>

      <div class="context-menu-divider"></div>

      <div class="context-menu-item" @click="lockCom">
        <template v-if="isLocked">
          <i class="menu-icon b-iconfont b-icon-unlock"></i>
          解锁
        </template>
        <template v-else>
          <i class="menu-icon b-iconfont b-icon-lock"></i>
          锁定
        </template>
      </div>
      <div class="context-menu-item" @click="hideCom">
        <template v-if="isHided">
          <i class="menu-icon b-iconfont b-icon-eye"></i>
          显示
        </template>
        <template v-else>
          <i class="menu-icon b-iconfont b-icon-eye-close"></i>
          隐藏
        </template>
      </div>
      <div class="context-menu-item" v-if="groups.length" @click="saveCom">
        <i class="menu-icon b-iconfont b-icon-save"></i>
        保存
      </div>

      <div class="context-menu-divider"></div>
      <div class="context-menu-item" @click="renameCom">
        <i class="menu-icon b-iconfont b-icon-edit"></i>
        重命名
        <span class="key-code">F2</span>
      </div>
      <div class="context-menu-item" @click="toCopyCom">
        <i class="menu-icon b-iconfont b-icon-file-copy"></i>
        复制
        <span class="key-code">Ctrl + C,V</span>
      </div>
      <div class="context-menu-item" @click="toDeleteCom">
        <i class="menu-icon b-iconfont b-icon-delete"></i>
        删除
        <span class="key-code">Delete</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import useSchemaContextMenu from '@/hooks/schema/useSchemaContextMenu'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { on, off, copyText } from '@/utils/util'
import { MoveType } from '@/config/enum'
import { useStore } from '@/store'
import { Message, MessageBox, BSelect, BOption } from 'bin-ui-next'
import * as api from '@/api/comps/comps.api'
import { createPreviewThumb } from '@/hooks/usePreviewImg'

const groups = ref([]) // 组件库
const selectGroup = ref({})
const getCompList = () => api.getCompGroup().then(res => (groups.value = res))

const { schemaStore, storeToRefs } = useStore()
const { selectedCom, selectedComs } = storeToRefs(schemaStore)
const { isLocked, isHided, contextMenu, contextMenuStyle } = useSchemaContextMenu()

const moveCom = moveType => {
  if (selectedCom.value) {
    schemaStore.moveCom({ id: selectedCom.value.id, moveType })
  }
}

const moveUp = () => moveCom(MoveType.up)
const moveDown = () => moveCom(MoveType.down)
const moveTop = () => moveCom(MoveType.top)
const moveBottom = () => moveCom(MoveType.bottom)

const lockCom = () => {
  if (selectedCom.value) {
    selectedCom.value.locked = !selectedCom.value.locked
  }
}

const hideCom = () => {
  if (selectedCom.value) {
    selectedCom.value.hided = !selectedCom.value.hided
  }
}

const saveCom = async () => {
  selectGroup.value = groups.value[0].key // 默认选中第一个组件库
  // const id = `component_${selectedCom.value.id}`

  MessageBox({
    title: '指定组件库',
    message: h(
      BSelect,
      {
        modelValue: selectGroup.value,
        onChange: val => (selectGroup.value = val),
      },
      () => groups.value.map(i => h(BOption, { label: i.value, value: i.key })),
    ),
    showCancelButton: true,
    confirmText: '保存',
    cancelText: '取消',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        try {
          const el = document.getElementById(`component_${selectedCom.value.id}`)
          const tumb = await createPreviewThumb(el)
          // TODO 这里保存了base64格式的缩略图，实际可能需要调用一次上传后存储路径
          await api.saveComps(selectGroup.value, selectedCom.value, tumb)
          instance.confirmButtonLoading = true
        } catch (error) {
          console.log(error)
        }

        instance.confirmButtonLoading = false
        done()
      } else {
        done()
      }
    },
  })
    .then(() => Message.success('保存成功!'))
    .catch(() => {})
}

const toDeleteCom = () => {
  const com = selectedCom.value
  if (com) {
    MessageBox.confirm({
      type: 'error',
      title: '是否删除选中的1个组件',
    })
      .then(() => {
        schemaStore.deleteCom(com.id)
      })
      .catch(() => {})
  }
}

const renameCom = () => {
  const com = selectedCom.value
  if (com) {
    schemaStore.renamingCom(com.id)
  }
}

const toCopyCom = () => {
  schemaStore.copyComs(selectedComs.value)
}

const handleContextmenu = ev => {
  ev.preventDefault()
  getCompList()
}
onMounted(() => {
  on(document, 'contextmenu', handleContextmenu)
})
onBeforeUnmount(() => {
  off(document, 'contextmenu', handleContextmenu)
})

defineExpose({
  moveUp,
  moveBottom,
  moveDown,
  moveTop,
  lockCom,
  hideCom,
  toDeleteCom,
  renameCom,
  toCopyCom,
})
</script>

<style lang="stylus" scoped>
.context-menu-wrap {
  position: fixed;
  z-index: 9999;
  display: none;
  width: 152px;
  color: var(--schema-font-color);
  background: #27343e;
  user-select: none;
  outline: 1px solid var(--schema-ui-border);
}

.context-menu-item {
  position: relative;
  display: flex;
  height: 28px;
  padding: 0 6px;
  padding-right: 3em;
  overflow: hidden;
  line-height: 28px;
  cursor: pointer;
  border-left: 2px solid transparent;
  &:hover {
    color: var(--bin-color-primary);
    background-color: #1d262e;
    border-left: 2px solid var(--bin-color-primary);
  }

  .menu-icon {
    margin-right: 4px;
  }

  .key-code {
    position: absolute;
    top: 0;
    right: 6px;
    color: #9d9d9d;
    font-size: 12px;
    transform: scale(0.9);
  }
  &.disable {
    color: #576369;
    pointer-events: none;
    cursor: auto;
  }
}

.context-menu-divider {
  width: 100%;
  height: 1px;
  background-color: #3a4659;
}
</style>
