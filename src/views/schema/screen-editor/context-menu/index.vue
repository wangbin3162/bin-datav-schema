<template>
  <transition name="fade-scale-move">
    <div v-if="contextMenu.show" class="context-menu-wrap" :style="contextMenuStyle">
      <template v-if="isMultiSelect && !selectedCom">
        <div class="context-menu-item" @click="schemaStore.group()">
          <i class="menu-icon b-iconfont b-icon-group"></i>
          创建分组
        </div>
        <div class="context-menu-divider"></div>
        <div
          class="context-menu-item"
          v-for="em in MultiplAlignOptions"
          :key="em.value"
          @click="schemaStore.doAlign(em.value)"
          style="padding-right: 8px"
        >
          <i :class="`menu-icon iconfont-align b-icon-${em.value}`" />
          {{ em.label }}
        </div>

        <div class="context-menu-divider"></div>
        <div class="context-menu-item" @click="toDeleteCom">
          <i class="menu-icon b-iconfont b-icon-delete"></i>
          删除
          <span class="key-code">Delete</span>
        </div>
      </template>
      <!-- 单选组件内容 -->
      <template v-if="selectedCom">
        <template v-if="curComIsGroup">
          <div class="context-menu-item" @click="schemaStore.ungroup()">
            <i class="menu-icon b-iconfont b-icon-ungroup"></i>
            解除分组
          </div>
          <div class="context-menu-divider"></div>
        </template>

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
        <div class="context-menu-item" @click="saveCom">
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
      </template>
    </div>
  </transition>
</template>

<script setup>
import useSchemaContextMenu from '@/hooks/schema/useSchemaContextMenu'
import { h, onBeforeUnmount, onMounted, ref } from 'vue'
import { on, off, throwError } from '@/utils/util'
import { MoveType } from '@/config/enum'
import { useStore } from '@/store'
import { Message, MessageBox, BSelect, BOption } from 'bin-ui-design'
import * as api from '@/api/comps/comps.api'
import { uploadImagesToGroup } from '@/api/images/images.api'
import { createPreviewThumb } from '@/hooks/usePreviewImg'
import { dataURLtoFile } from '@/utils/file-helper'
import { EventBus, EventMap } from '@/utils/event-bus'
import { MultiplAlignOptions } from '@/config/select-options'

const groups = ref([]) // 组件库
const selectGroup = ref({})

const { schemaStore, storeToRefs } = useStore()
const { selectedCom, selectedComs, curComIsGroup, isMultiSelect, areaData } =
  storeToRefs(schemaStore)

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
  groups.value = await api.getCompGroup()
  if (groups.value.length === 0) {
    Message.warning('请先创建一个默认的组件分组在进行保存！')
    return
  }
  selectGroup.value = groups.value[0].key // 默认选中第一个组件库
  // const id = `component_${selectedCom.value.id}`
  MessageBox({
    type: 'success',
    title: '指定组件分组',
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
          const img = {
            groupKey: 'analysis_material',
            name: selectedCom.value.alias,
            attr: { w: el.clientWidth, h: el.clientHeight },
            file: dataURLtoFile(tumb, selectedCom.value.alias),
          }
          // 上传缩略图
          const tumbUrl = await uploadImagesToGroup(img)
          // TODO 这里保存了base64格式的缩略图，实际可能需要调用一次上传后存储路径
          await api.saveComps(selectGroup.value, selectedCom.value, tumbUrl)
          instance.confirmButtonLoading = true
          Message.success('保存成功!')
          EventBus.emit(EventMap.SaveCompSuccess)
        } catch (error) {
          console.log(error)
          throwError('createPreviewThumb', error)
        }

        instance.confirmButtonLoading = false
        done()
      } else {
        done()
      }
    },
  })
    .then(() => {})
    .catch(() => {})
}

const toDeleteCom = () => {
  const coms = selectedComs.value
  // 暂时去掉删除拦截
  if (coms && coms.length > 0) {
    // MessageBox.confirm({
    //   type: 'error',
    //   title: '提示',
    //   message: '是否删除选中的组件?',
    // })
    //   .then(() => {
    schemaStore.batchDeleteComs(coms)
    schemaStore.recordSnapshot()
    areaData.value.showArea = false
    // })
    // .catch(() => {})
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

<style scoped>
.context-menu-wrap {
  position: fixed;
  z-index: 9999;
  width: 152px;
  background: var(--s-color-2);
  border-radius: var(--bin-border-radius-default);
  user-select: none;
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
  margin: 4px;
  color: var(--s-text-color);
  border-radius: var(--bin-border-radius-default);
  &:hover {
    background-color: var(--s-color-1);
  }

  .menu-icon {
    margin-right: 6px;
  }

  .key-code {
    position: absolute;
    top: 0;
    right: 6px;
    color: var(--s-text-color-3);
    font-size: 12px;
    transform: scale(0.9);
  }
}

.context-menu-divider {
  width: 100%;
  height: 1px;
  background-color: var(--s-border-color-2);
}
</style>
