import { createGroup } from '@/config/components-cfg'
import { getComponentRotatedStyle } from '@/utils/style'
import { mod360 } from '@/utils/translate'
import { EventBus, EventMap } from '@/utils/event-bus'

// 根据多个组件计算包围盒的内容
const calcBoundingBox = comps => {
  // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
  let top = Infinity
  let left = Infinity
  let right = -Infinity
  let bottom = -Infinity
  // 计算边界位置
  comps.forEach(component => {
    let style = {}
    style = getComponentRotatedStyle(component.attr)
    if (style.left < left) left = style.left
    if (style.top < top) top = style.top
    if (style.right > right) right = style.right
    if (style.bottom > bottom) bottom = style.bottom
  })
  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
    middleX: left + (right - left) / 2,
    middleY: top + (bottom - top) / 2,
  }
}

// 根据选中区域计算边界值和中心值
const calcBoundingBoxByArea = ({ x, y, width, height }) => {
  return {
    left: x,
    top: y,
    right: x + width,
    bottom: y + height,
    width,
    height,
    middleX: x + width / 2,
    middleY: y + height / 2,
  }
}

// 根据组件获取宽高，组内组件和rect包围盒区域
const getStyleComsRect = (component, editor) => {
  const parentStyle = { ...component.attr }
  const subComponents = component.components
  const editorRect = editor.getBoundingClientRect()
  return {
    parentStyle,
    subComponents,
    editorRect,
  }
}

// 将组件数据返还至父级画布
const decomposeComponent = (component, editorRect, parentStyle, scale) => {
  const comDom = document.querySelector(`#component_${component.id}`)
  if (!comDom) return
  const componentRect = comDom.getBoundingClientRect()
  // 获取元素的中心点坐标
  const center = {
    x: (componentRect.left - editorRect.left + componentRect.width / 2) / scale,
    y: (componentRect.top - editorRect.top + componentRect.height / 2) / scale,
  }

  component.attr.rotate = mod360(component.attr.rotate + parentStyle.rotate)
  component.attr.w = ((parseFloat(component.groupStyle.width) / 100) * parentStyle.w) | 0
  component.attr.h = ((parseFloat(component.groupStyle.height) / 100) * parentStyle.h) | 0
  // 计算出元素新的 top left 坐标
  component.attr.x = (center.x - component.attr.w / 2) | 0
  component.attr.y = (center.y - component.attr.h / 2) | 0
  component.groupStyle = {}
}

// 组合多选的状态
export default {
  state: {
    editorEL: null,
    areaData: { x: 0, y: 0, width: 0, height: 0, showArea: false },
  },
  actions: {
    getEditor() {
      this.editorEL = document.querySelector('#canvas-components')
    },
    // 设置多选计算区域
    setAreaData(components) {
      // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
      const { left, top, width, height } = calcBoundingBox(components)

      this.areaData.x = left
      this.areaData.y = top
      this.areaData.width = width
      this.areaData.height = height
      this.areaData.showArea = true
    },
    // 单组件设置吸附位置和顶点
    doAdsorption(type) {
      const com = this.selectedCom
      const page = this.pageConfig
      switch (type) {
        case 'align-to-top':
          com.attr.y = 0
          break
        case 'align-to-center':
          com.attr.y = (page.height - com.attr.h) / 2
          break
        case 'align-to-bottom':
          com.attr.y = page.height - com.attr.h
          break
        case 'align-to-left':
          com.attr.x = 0
          break
        case 'align-to-middle':
          com.attr.x = (page.width - com.attr.w) / 2
          break
        case 'align-to-right':
          com.attr.x = page.width - com.attr.w
          break
      }
      this.recordSnapshot()
    },
    // 多组件设置对齐内容
    doAlign(type) {
      const isGroup = this.curComIsGroup
      const coms = isGroup ? this.selectedCom.components : this.selectedComs
      const { x, y, w, h } = this.selectedCom ? this.selectedCom.attr : {}
      let area = isGroup ? { x, y, width: w, height: h } : this.areaData

      // 计算选中组件边界
      const { left, top, right, bottom, middleX, middleY } = calcBoundingBoxByArea(area)

      switch (type) {
        case 'align-top':
          coms.forEach(com => (com.attr.y = top))
          break
        case 'align-bottom':
          coms.forEach(com => (com.attr.y = bottom - com.attr.h))
          break
        case 'align-left':
          coms.forEach(com => (com.attr.x = left))
          break
        case 'align-right':
          coms.forEach(com => (com.attr.x = right - com.attr.w))
          break
        case 'align-center':
          coms.forEach(com => (com.attr.x = middleX - com.attr.w * 0.5))
          break
        case 'align-middle':
          coms.forEach(com => (com.attr.y = middleY - com.attr.h * 0.5))
          break
      }
      this.recordSnapshot()
    },
    // 组合
    group() {
      const areaData = this.areaData // 缓存多选组件区域
      const editor = this.editorEL // 缓存编辑器dom

      const components = [] // 临时存储组合
      this.selectedComs.forEach(com => {
        // 判断是否是group组件
        if (com.name !== 'Group') {
          components.push(com)
        } else {
          // 如果要组合的组件中，已经存在组合数据，则需要提前拆分
          // 1、拆散当前组
          const { parentStyle, subComponents, editorRect } = getStyleComsRect(com, editor)
          // 2、移除当前组
          this.removeCom(com.id)
          // 3、分别再返还设置一下组合的组件
          subComponents.forEach(component => {
            decomposeComponent(component, editorRect, parentStyle, this.canvas.scale)
            this.comps.push(component)
          })
          components.push(...com.components)
          //  4、批量移除刚刚拆开的组件
          this.batchDeleteComs(com.components)
        }
      })
      // 1、获取组配置
      const component = createGroup(areaData, components)
      // 2、批量移除刚刚组合的组件
      this.batchDeleteComs(this.selectedComs)
      // 3、移除多选组件和区域
      this.selectedComIds = []
      EventBus.emit(EventMap.HideArea)
      // 4、将组新增至画布
      this.comps.push(component)
      // 5、设置单选选中当前组
      this.selectCom(component)

      this.recordSnapshot()
    },
    // 拆分组
    ungroup() {
      // 1、拆散当前选中组
      const { parentStyle, subComponents, editorRect } = getStyleComsRect(
        this.selectedCom,
        this.editorEL,
      )
      // 2、移除当前组件
      this.deleteSeletedCom()
      // 3、分别再返还设置一下组合的组件
      subComponents.forEach(component => {
        decomposeComponent(component, editorRect, parentStyle, this.canvas.scale)
        this.comps.push(component)
      })
      this.recordSnapshot()
    },
  },
}
