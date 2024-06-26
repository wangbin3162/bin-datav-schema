import { onBeforeUnmount, onMounted, ref } from 'vue'
import { off, on, copyText, hasClass } from '@/utils/util'
import { useStore } from '@/store'
import { useRoute } from 'vue-router'
import { Message } from 'bin-ui-design'
import useSavePreview from './useSavePreview'
import { sendMsg } from '@/utils/cross-tab-msg'

export default function useShortcuts() {
  const headerRef = ref(null)
  const contextMenuRef = ref(null) // 右键菜单组件
  const { saveScreenData } = useSavePreview()

  const { schemaStore, storeToRefs } = useStore()
  const { pageInfo, canvas, selectedCom, selectedComs, curComIsGroup, isMultiSelect } =
    storeToRefs(schemaStore)

  const route = useRoute()

  let copyTempCom = null

  // 快捷键监听
  const addShortcuts = ev => {
    // 获取body的class，如果有弹窗则跳过
    const hasModal = hasClass(document.body, 'bin-popup-parent--hidden')
    if (hasModal) return
    const target = ev.target
    if (!['input', 'textarea'].includes(target.tagName.toLowerCase())) {
      const key = ev.key.toLowerCase()
      if (key === 'delete') {
        contextMenuRef.value && contextMenuRef.value.toDeleteCom()
        ev.preventDefault()
      } else if (key === 'f2') {
        contextMenuRef.value && contextMenuRef.value.renameCom()
        ev.preventDefault()
      }
      const com = selectedCom.value
      // alt按下之后的图层调整
      if (ev.altKey) {
        keyDown('altKey')
        if (key === 'arrowup') {
          contextMenuRef.value && contextMenuRef.value.moveUp()
        } else if (key === 'arrowdown') {
          contextMenuRef.value && contextMenuRef.value.moveDown()
        } else if (key === 'home') {
          contextMenuRef.value && contextMenuRef.value.moveTop()
        } else if (key === 'end') {
          contextMenuRef.value && contextMenuRef.value.moveBottom()
        }
        ev.preventDefault()
      }
      if (ev.shiftKey) {
        keyDown('shiftKey')
      }
      // ctrl按下之后的操作内容
      if (ev.ctrlKey) {
        keyDown('ctrlKey')
        if (key === 'arrowup') {
          // 组件面板
          schemaStore.toggleCompsPanel()
          ev.preventDefault()
        } else if (key === 'arrowdown') {
          // 配置面板
          schemaStore.toggleToolbox()
          ev.preventDefault()
        } else if (key === 'arrowleft') {
          // 图层
          schemaStore.toggleLayerPanel()
          ev.preventDefault()
        } else if (key === 'arrowright') {
          // 配置面板
          schemaStore.toggleConfigPanel()
          ev.preventDefault()
        } else if (key === 'a') {
          // 最佳视窗缩放
          schemaStore.autoCanvasScale()
          ev.preventDefault()
        } else if (key === 'd') {
          // 100%视角
          schemaStore.setCanvasScale(100)
          ev.preventDefault()
        } else if (key === 'g') {
          // 组合选中
          if (curComIsGroup.value) schemaStore.ungroup()
          if (isMultiSelect.value) schemaStore.group()
          ev.preventDefault()
        } else if (key === 'c') {
          // 缓存复制组件,判断有无多选
          copyTempCom = selectedComs.value
          // console.log(copyTempCom)
          // 复制到剪切板内容
          copyText(JSON.stringify(copyTempCom))
          ev.preventDefault()
        } else if (key === 'v') {
          // 缓存复制组件
          copyTempCom && schemaStore.copyComs(copyTempCom)
          ev.preventDefault()
        } else if (key === 's') {
          const isEdit = pageInfo.value.id || route.query.id
          if (isEdit) {
            saveScreenData('edit').then(() => {
              Message.success('保存成功！')
              sendMsg('save-success')
            })
          } else {
            headerRef.value && headerRef.value.handleSaveScreen()
          }
          ev.preventDefault()
        } else if (key === 'z') {
          // 撤销
          schemaStore.undo()
          ev.preventDefault()
        }
      }
      if (ev.keyCode === 32) {
        keyDown('spaceKey')
        ev.preventDefault()
      }
      // 组件微调移动
      const step = ev.shiftKey ? 10 : 1
      if (com && !ev.altKey) {
        if (key === 'arrowleft') {
          com.attr.x -= step
          schemaStore.recordSnapshot()
          ev.preventDefault()
        } else if (key === 'arrowright') {
          com.attr.x += step
          schemaStore.recordSnapshot()
          ev.preventDefault()
        } else if (key === 'arrowup') {
          com.attr.y -= step
          schemaStore.recordSnapshot()
          ev.preventDefault()
        } else if (key === 'arrowdown') {
          com.attr.y += step
          schemaStore.recordSnapshot()
          ev.preventDefault()
        }
      }
    }
  }

  const keyDown = key => {
    schemaStore.toggleKey({ key, status: true })
  }

  const keyUpEvent = () => {
    schemaStore.resetKeyCode()
  }

  // 鼠标滚动缩放
  const ctrlMouseWheel = ev => {
    const scale = parseInt((canvas.value.scale * 100).toFixed(2))
    const zoom = (ev.wheelDelta > 0 ? 1 : -1) * 5
    // 计算缩放比例
    const next = Math.min(Math.max(scale + zoom, 20), 200)
    schemaStore.setCanvasScale(next)
  }

  onMounted(() => {
    on(document, 'keydown', addShortcuts)
    on(document, 'keyup', keyUpEvent)
  })
  onBeforeUnmount(() => {
    off(document, 'keydown', addShortcuts)
    off(document, 'keyup', keyUpEvent)
  })

  return {
    headerRef,
    contextMenuRef,
    ctrlMouseWheel,
  }
}
