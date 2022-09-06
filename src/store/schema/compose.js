import { getComponentRotatedStyle } from '@/utils/style'
import { getTransArea } from '@/views/schema/screen-editor/canvas-main/select-area/uitl'

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
    // 如果当前选中的组件为组
    if (component.componentType === 'Group') {
      // component.propValue.forEach(item => {
      //     const rectInfo = $(`#component${item.id}`).getBoundingClientRect()
      //     style.left = rectInfo.left - this.editorX
      //     style.top = rectInfo.top - this.editorY
      //     style.right = rectInfo.right - this.editorX
      //     style.bottom = rectInfo.bottom - this.editorY
      //     if (style.left < left) left = style.left
      //     if (style.top < top) top = style.top
      //     if (style.right > right) right = style.right
      //     if (style.bottom > bottom) bottom = style.bottom
      // })
    } else {
      style = getComponentRotatedStyle(component.attr)
    }
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

// 组合多选的状态
export default {
  state: {
    editorEL: null,
    areaData: { x: 0, y: 0, width: 0, height: 0, showArea: false },
  },
  getters: {
    areaDataAttr() {
      const { x, y, width, height } = getTransArea(this.areaData, this.canvas.scale)
      return { x, y, width, height }
    },
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
      const coms = this.multipleComs
      // 计算选中组件边界
      const { left, top, right, bottom, middleX, middleY } = calcBoundingBoxByArea(this.areaData)

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
  },
}
