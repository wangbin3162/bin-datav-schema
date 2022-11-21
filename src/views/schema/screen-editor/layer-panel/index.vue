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
              <b-icon :name="com.icon" size="18"></b-icon>
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
const enableBtnStyle = computed(() => ({ opacity: selectedCom.value ? 1 : 0.3 }))

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
    schemaStore.selectCom(com)
  }
}
const cancelSelectCom = () => schemaStore.selectCom()
</script>
