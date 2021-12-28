<template>
  <div class="layer-panel-wp" :class="{'is-hide':!toolbar.layer}">
    <div class="layer-panel">
      <div class="layer-top">
        <div class="layer-num pl-10">图层</div>
        <div class="layer-action" @click="toggleLayerPanel(false)">
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
          :style="{transform:`rotate(180deg)`, ...enableBtnStyle}"
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
        <template v-for="com in descComs" :key="com.id">
          <div
            :title="com.alias"
            class="layer-manager-item"
            :class="[{
              hided: com.hided,
              locked: com.locked,
              hovered: com.id === hoveredCom,
              selected: selectedCom && com.id === selectedCom.id
            }]"
            @mousedown="selectCom(com.id)"
            @mouseenter="onEnter(com.id)"
            @mouseleave="onLeave"
            @dblclick="renamingCom(com.id)"
            @contextmenu="showMenu($event)"
          >
            <b-icon :name="com.icon" size="18"></b-icon>
            <input
              v-if="com.id === renamingId"
              v-model.trim="com.alias"
              v-focus
              class="layer-item-input"
              @blur="renamingCom('')"
              @keydown.enter="renamingCom('')"
            >
            <span v-else class="layer-item-span">
              <span class="layer-item-text">{{ com.alias }}</span>
            </span>
            <i
              :class="['b-iconfont',`b-icon-${com.hided?'eye-close':'eye'}`,'show-toggle-btn']"
              :title="com.hided?'显示':'隐藏'"
              @click="com.hided = !com.hided"
            ></i>
            <i
              :class="['b-iconfont',`b-icon-${com.locked?'lock':'unlock'}`,'show-toggle-btn']"
              :title="com.locked?'解锁':'锁定'"
              @click="com.locked = !com.locked"
            ></i>
          </div>
        </template>
        <div class="last-flex-item" @click="cancelSelectCom"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import useSchemaContextMenu from '@/hooks/schema/useSchemaContextMenu'
import { MoveType } from '@/config/enum'

export default {
  name: 'layer-panel',
  setup() {
    const {
      toolbar,
      toggleLayerPanel,
      comps,
      selectedCom,
      hoveredCom,
      onCompHovered,
      onCompSelected,
      onCompMoved,
    } = useSchemaStore()
    const { showMenu, renamingId, renamingCom } = useSchemaContextMenu()

    const enableBtnClass = computed(() => !!selectedCom.value)
    const enableBtnStyle = computed(() => {
      return {
        opacity: selectedCom.value ? 1 : 0.3,
      }
    })

    const enableLockBtnClass = computed(() => {
      return {
        enable: !!selectedCom.value,
        checked: selectedCom.value?.locked,
      }
    })
    const enableHideBtnClass = computed(() => {
      return {
        enable: !!selectedCom.value,
        checked: selectedCom.value?.hided,
      }
    })

    const descComs = computed(() => [...comps.value].reverse())

    const moveCom = (moveType) => {
      if (selectedCom.value) {
        onCompMoved(selectedCom.value.id, moveType)
      }
    }

    const moveUp = () => moveCom(MoveType.up)
    const moveDown = () => moveCom(MoveType.down)
    const moveTop = () => moveCom(MoveType.top)
    const moveBottom = () => moveCom(MoveType.bottom)

    const onEnter = (id) => {
      onCompHovered(id)
    }

    const onLeave = () => {
      onCompHovered('')
    }
    const selectCom = (id) => {
      const com = comps.value.find(i => i.id === id)
      if (com) {
        onCompSelected(com)
      }
    }
    const cancelSelectCom = () => {
      onCompSelected()
    }

    return {
      comps,
      toolbar,
      toggleLayerPanel,
      enableBtnClass,
      enableBtnStyle,
      moveUp,
      moveDown,
      moveTop,
      moveBottom,
      descComs,
      enableLockBtnClass,
      enableHideBtnClass,
      onEnter,
      onLeave,
      selectCom,
      hoveredCom,
      selectedCom,
      showMenu,
      cancelSelectCom,
      renamingId,
      renamingCom,
    }
  },
}
</script>
