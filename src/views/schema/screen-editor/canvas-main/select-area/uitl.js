// 获取转换的选中区域
export const getTransArea = ({ x, y, width, height }) => {
  const X = x
  const Y = y
  const W = width
  const H = height
  return {
    x: X,
    y: Y,
    width: W,
    height: H,
  }
}

export function getSelectArea(areaData, comps) {
  const result = []
  // 区域起点坐标 // 转换区域缩放位置和大小
  const { x, y, width, height } = getTransArea(areaData)
  // 计算所有的组件数据，判断是否在选中区域内
  comps.forEach(component => {
    if (component.hided || component.locked) return
    const { x: left, y: top, w, h } = component.attr
    if (x <= left && y <= top && left + w <= x + width && top + h <= y + height) {
      result.push(component)
    }
  })

  return result
}
