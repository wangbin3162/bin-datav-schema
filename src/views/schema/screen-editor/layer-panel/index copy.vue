<template>
  <div class="layer-panel-wp" :class="{ 'is-hide': !toolbar.layer }">
    <div class="layer-panel">
      <div class="layer-top">
        <div class="layer-num pl-10">图层</div>
        <div class="layer-action" @click="schemaStore.toggleLayerPanel(false)">
          <i class="b-iconfont b-icon-left" title="收起"></i>
        </div>
      </div>
      <div class="layer-toolbar layer-toolbar-top">
        <i
          title="上移一层"
          class="b-iconfont b-icon-arrowup toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveUp"
        ></i>
        <i
          title="下移一层"
          class="b-iconfont b-icon-arrowdown toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveDown"
        ></i>
        <i
          title="置顶"
          class="b-iconfont b-icon-vertical-align-botto toolbar-icon standard"
          :class="enableBtnClass"
          :style="{ transform: `rotate(180deg)`, ...enableBtnStyle }"
          @click="moveTop"
        ></i>
        <i
          title="置底"
          class="b-iconfont b-icon-vertical-align-botto toolbar-icon standard"
          :class="enableBtnClass"
          :style="enableBtnStyle"
          @click="moveBottom"
        ></i>
      </div>
      <div class="layer-manager-wrap">
        <draggable v-model="descComs" class="drag-area" item-key="id" v-bind="{ animation: 200 }">
          <template #item="{ element: com }">
            <div
              :title="com.alias"
              class="layer-manager-item"
              :class="[
                {
                  hided: com.hided,
                  locked: com.locked,
                  hovered: com.id === hoveredComId,
                  selected: isSelected(com),
                },
              ]"
              @mousedown="selectCom(com.id)"
              @mouseenter="onEnter(com.id)"
              @mouseleave="onLeave"
              @dblclick="schemaStore.renamingCom(com.id)"
              @contextmenu="showMenu($event)"
            >
              <b-icon :name="com.name === 'VIcon' ? com.config.src : com.icon" size="18"></b-icon>
              <input
                v-if="com.id === renamingComId"
                v-model.trim="com.alias"
                v-focus
                class="layer-item-input"
                @blur="schemaStore.renamingCom('')"
                @keydown.enter="schemaStore.renamingCom('')"
              />
              <span v-else class="layer-item-span">
                <span class="layer-item-text">{{ com.alias }}</span>
              </span>
              <i
                :class="[
                  'b-iconfont',
                  `b-icon-${com.hided ? 'eye-close' : 'eye'}`,
                  'show-toggle-btn',
                ]"
                :title="com.hided ? '显示' : '隐藏'"
                @click="com.hided = !com.hided"
              ></i>
              <i
                :class="[
                  'b-iconfont',
                  `b-icon-${com.locked ? 'lock' : 'unlock'}`,
                  'show-toggle-btn',
                ]"
                :title="com.locked ? '解锁' : '锁定'"
                @click="com.locked = !com.locked"
              ></i>
            </div>
          </template>
        </draggable>
        <div class="last-flex-item" @click="cancelSelectCom"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import draggable from 'vuedraggable'
import { computed } from 'vue'
import { useStore } from '@/store'
import useSchemaContextMenu from '@/hooks/schema/useSchemaContextMenu'
import { MoveType } from '@/config/enum'
import { isEmpty } from '@/utils/util'

const { schemaStore, storeToRefs } = useStore()
const { comps, toolbar, hoveredComId, selectedCom, renamingComId, isMultiSelect, selectedComs } =
  storeToRefs(schemaStore)

const { showMenu } = useSchemaContextMenu()

const enableBtnClass = computed(() => !!selectedCom.value)
const enableBtnStyle = computed(() => ({ opacity: selectedCom.value ? 1 : 0.5 }))

function isSelected(com) {
  if (isMultiSelect.value) return selectedComs.value.map(i => i.id).includes(com.id)
  return !isEmpty(selectedCom.value) && selectedCom.value.id === com.id
}

const descComs = computed({
  get: () => [...comps.value].reverse(),
  set: val => (comps.value = val.reverse()),
})

const moveCom = moveType => {
  if (selectedCom.value) {
    schemaStore.moveCom({ id: selectedCom.value.id, moveType })
  }
}

const moveUp = () => moveCom(MoveType.up)
const moveDown = () => moveCom(MoveType.down)
const moveTop = () => moveCom(MoveType.top)
const moveBottom = () => moveCom(MoveType.bottom)

const onEnter = id => schemaStore.hoverCom(id)

const onLeave = () => schemaStore.hoverCom('')

const selectCom = id => {
  const com = comps.value.find(i => i.id === id)
  if (com) {
    schemaStore.selectCom(com) // 层级不允许ctrl 进行多选 , false
  }
}
const cancelSelectCom = () => schemaStore.selectCom()
</script>

<style scoped>
.layer-panel-wp {
  position: relative;
  z-index: 5;
  display: flex;
  width: var(--schema-layer-width);
  height: 100%;
  overflow: hidden;
  background: var(--schema-color-bg-2);
  border-right: 1px solid var(--schema-color-border);
  transition: width 0.2s ease;
  flex: none;
  flex-direction: column;
  .layer-panel {
    z-index: 9;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.2s ease;
    flex-direction: column;
    flex: auto;
    .layer-top {
      position: relative;
      height: 30px;
      line-height: 30px;
      user-select: none;
      background: var(--schema-color-bg-3);
      border-bottom: 1px solid var(--schema-color-border);
    }
    .layer-action {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 100%;
      > i {
        cursor: pointer;
        width: 20px;
        font-size: 14px;
      }
    }
  }
  &.is-hide {
    width: 0;
    .layer-panel {
      transform: translateX(-100%);
    }
  }
}

.layer-toolbar {
  display: flex;
  height: 32px;
  padding: 0 18px;
  background: var(--schema-color-bg-2);
  align-items: center;
  justify-content: center;
  flex: none;

  &.layer-toolbar-top {
    border-bottom: 1px solid var(--schema-color-border);
  }
  .toolbar-icon {
    width: 24px;
    height: 24px;
    font-size: 16px;
    transition: background 0.2s;
    margin: 0 10px;
    line-height: 24px;
    text-align: center;
    border-radius: 3px;
    background: var(--schema-color-bg-1);

    &.standard:hover {
      cursor: pointer;
      background: var(--s-color-1);
      opacity: 1 !important;
    }
  }
}

.layer-manager-wrap {
  position: relative;
  display: flex;
  width: 100%;
  height: calc(100% - 62px);
  overflow-y: auto;
  font-size: 12px;
  line-height: 2;
  padding: 6px;
  color: var(--schema-font-color);
  list-style: none;
  background: var(--schema-color-bg-2);
  user-select: none;
  flex: auto;
  flex-direction: column;

  .layer-manager-item {
    position: relative;
    display: flex;
    width: 100%;
    height: 40px;
    padding: 0 6px;
    padding-left: 8px;
    margin-bottom: 4px;
    cursor: pointer;
    box-sizing: border-box;
    transition: background 0.2s;
    align-items: center;
    border-radius: var(--bin-border-radius-default);
    border: 1px solid transparent;
    flex: none;
    &.hided,
    &.locked {
      color: var(--s-text-color-2);
    }

    .layer-item-span {
      width: 126px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 4px;
      .layer-item-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
      }
    }

    .layer-item-input {
      width: 126px;
      padding: 0 4px;
      height: 20px;
      line-height: 20px;
      background: 0 0;
      border: none;
      outline: 0;
      font-size: 12px;
    }

    .show-toggle-btn {
      padding: 0 2px;
      font-size: 18px;
      display: none;
    }
    &.hovered {
      background: var(--s-color-1);
      .show-toggle-btn {
        display: block;
      }
    }
    &.hided,
    &.locked {
      .show-toggle-btn {
        display: block;
        &.b-icon-lock {
          color: var(--bin-color-primary);
        }
      }
    }

    &.selected {
      background: var(--bin-color-input-shadow);
      border: 1px solid var(--bin-color-primary);
      .show-toggle-btn {
        display: block;
      }
    }

    &.sortable-ghost {
      opacity: 0.4;
    }
  }
  .last-flex-item {
    flex: auto;
    min-height: 40px;
  }
}
</style>
