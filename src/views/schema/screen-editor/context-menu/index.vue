<template>
  <transition name="zoom-in-top">
    <div
      v-if="contextMenu.show"
      class="context-menu-wrap"
      :style="contextMenuStyle"
    >
      <div class="context-menu-item" @click="moveTop">
        <i class="menu-icon b-iconfont b-icon-vertical-align-botto" style="transform: rotate(180deg);"></i>置顶
      </div>
      <div class="context-menu-item" @click="moveBottom">
        <i class="menu-icon b-iconfont b-icon-vertical-align-botto"></i>置底
      </div>
      <div class="context-menu-item" @click="moveUp">
        <i class="menu-icon b-iconfont b-icon-arrowup"></i>上移一层
      </div>
      <div class="context-menu-item" @click="moveDown">
        <i class="menu-icon b-iconfont b-icon-arrowdown"></i>下移一层
      </div>

      <div class="context-menu-divider"></div>

      <div class="context-menu-item" @click="lockCom">
        <template v-if="isLocked">
          <i class="menu-icon b-iconfont b-icon-unlock"></i>解锁
        </template>
        <template v-else>
          <i class="menu-icon b-iconfont b-icon-lock"></i>锁定
        </template>
      </div>
      <div class="context-menu-item" @click="hideCom">
        <template v-if="isHided">
          <i class="menu-icon b-iconfont b-icon-eye"></i>显示
        </template>
        <template v-else>
          <i class="menu-icon b-iconfont b-icon-eye-close"></i>隐藏
        </template>
      </div>

      <div class="context-menu-divider"></div>
      <div class="context-menu-item" @click="renameCom">
        <i class="menu-icon b-iconfont b-icon-edit"></i>重命名
      </div>
      <div class="context-menu-item" @click="toCopyCom">
        <i class="menu-icon b-iconfont b-icon-file-copy"></i>复制
      </div>
      <div class="context-menu-item" @click="toDeleteCom">
        <i class="menu-icon b-iconfont b-icon-delete"></i>删除
      </div>
    </div>
  </transition>
</template>

<script>
import useSchemaContextMenu from '@/hooks/schema/useSchemaContextMenu'
import { onBeforeUnmount, onMounted } from 'vue'
import { on, off } from '@/utils/util'
import { MoveType } from '@/config/enum'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { MessageBox } from 'bin-ui-next'

export default {
  name: 'context-menu',
  setup() {
    const { onCompMoved, deleteCom, copyCom } = useSchemaStore()
    const {
      contextMenu,
      selectedCom,
      isLocked,
      isHided,
      contextMenuStyle,
      renamingCom,
    } = useSchemaContextMenu()

    const moveCom = (moveType) => {
      if (selectedCom.value) {
        onCompMoved(selectedCom.value.id, moveType)
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

    const toDeleteCom = () => {
      const com = selectedCom.value
      if (com) {
        MessageBox.confirm({
          type: 'error',
          title: '是否删除选中的1个组件',
        }).then(() => {
          deleteCom(com.id)
        }).catch(() => {
        })
      }
    }

    const renameCom = () => {
      const com = selectedCom.value
      if (com) {
        renamingCom(com.id)
      }
    }

    const toCopyCom = () => {
      const com = selectedCom.value
      if (com) {
        copyCom(com.id)
      }
    }

    const handleContextmenu = (ev) => ev.preventDefault()

    onMounted(() => {
      on(document, 'contextmenu', handleContextmenu)
    })
    onBeforeUnmount(() => {
      off(document, 'contextmenu', handleContextmenu)
    })
    return {
      contextMenu,
      contextMenuStyle,
      isLocked,
      isHided,
      moveUp,
      moveDown,
      moveTop,
      moveBottom,
      toDeleteCom,
      renameCom,
      toCopyCom,
      lockCom,
      hideCom,
    }
  },
}
</script>

<style lang="stylus" scoped>
.context-menu-wrap {
  position: fixed;
  z-index: 9999;
  display: none;
  width: 111px;
  color: var(--schema-font-color);
  background: #27343e;
  user-select: none;
}

.context-menu-item {
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
