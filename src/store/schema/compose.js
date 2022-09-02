import { getComponentRotatedStyle } from '@/utils/style'
import { getTransArea } from '@/views/schema/screen-editor/canvas-main/select-area/uitl'

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
    setAreaData(components) {
      // 根据选中区域和区域中每个组件的位移信息来创建 Group 组件
      // 要遍历选择区域的每个组件，获取它们的 left top right bottom 信息来进行比较
      let top = Infinity
      let left = Infinity
      let right = -Infinity
      let bottom = -Infinity
      components.forEach(component => {
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

      this.areaData.x = left
      this.areaData.y = top
      this.areaData.width = right - left
      this.areaData.height = bottom - top
      this.areaData.showArea = true

      // 设置多选组件
      this.multipleComs = components
    },
  },
}
