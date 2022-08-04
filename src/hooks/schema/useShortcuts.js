import { onBeforeUnmount, onMounted, ref } from 'vue'
import { off, on } from '@/utils/util'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import useSchema from '@/pinia/schema/index'

export default function useShortcuts() {
  const headerRef = ref(null)
  const contextMenuRef = ref(null) // 右键菜单组件
  const {
    canvas,
    selectedCom,
    autoCanvasScale,
    setCanvasScale,
    toggleLayerPanel,
    toggleCompsPanel,
    toggleConfigPanel,
    toggleToolbox,
    copyCom,
  } = useSchemaStore()

  const schemaStore = useSchema()

  let copyTempCom = null

  // 快捷键监听
  const addShortcuts = ev => {
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
      // ctrl按下之后的操作内容
      if (ev.ctrlKey) {
        keyDown('ctrlKey')
        if (key === 'arrowup') {
          // 组件面板
          toggleCompsPanel()
          ev.preventDefault()
        } else if (key === 'arrowdown') {
          // 配置面板
          toggleToolbox()
          ev.preventDefault()
        } else if (key === 'arrowleft') {
          // 图层
          toggleLayerPanel()
          ev.preventDefault()
        } else if (key === 'arrowright') {
          // 配置面板
          toggleConfigPanel()
          ev.preventDefault()
        } else if (key === 'a') {
          // 最佳视窗缩放
          autoCanvasScale()
          ev.preventDefault()
        } else if (key === 'd') {
          // 100%视角
          setCanvasScale(100)
          ev.preventDefault()
        } else if (key === 'c') {
          // 缓存复制组件
          copyTempCom = selectedCom.value
          ev.preventDefault()
        } else if (key === 'v') {
          // 缓存复制组件
          copyTempCom && copyCom(copyTempCom.id)
          ev.preventDefault()
        } else if (key === 's') {
          // 保存当前面板
          headerRef.value && headerRef.value.handleSaveScreen()
          ev.preventDefault()
        } else if (key === 'z') {
          // 撤销
          schemaStore.undo()
          ev.preventDefault()
        }
      }
      if (ev.shiftKey) {
        keyDown('shiftKey')
      }
      if (ev.keyCode === 32) {
        keyDown('spaceKey')
        ev.preventDefault()
      }
      // 组件微调移动
      const step = ev.shiftKey ? 10 : 1
      if (com) {
        if (key === 'arrowleft') {
          com.attr.x -= step
          ev.preventDefault()
        } else if (key === 'arrowright') {
          com.attr.x += step
          ev.preventDefault()
        } else if (key === 'arrowup') {
          com.attr.y -= step
          ev.preventDefault()
        } else if (key === 'arrowdown') {
          com.attr.y += step
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
    setCanvasScale(next)
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
