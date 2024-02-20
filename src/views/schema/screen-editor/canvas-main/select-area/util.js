// 检查坐标是否在区域的范围之内
function isInsideArea(points, area) {
  const { x, y } = points
  return x >= area.x && x <= area.x + area.width && y >= area.y && y <= area.y + area.height
}

// 获取四个角点
function getJiaodian(attr) {
  const { x, y, w, h } = attr

  return [
    { x, y }, // 左上角
    { x: x + w, y }, // 右上角
    { x, y: y + h }, // 左下角
    { x: x + w, y: y + h }, // 右下角
  ]
}

// 判断四个角点任意一个在区域范围内部
function anyPointInArea(attr, area) {
  // 获取左上、右上、左下、右下，四个角点
  const [lt, rt, lb, rb] = getJiaodian(attr)

  return (
    isInsideArea(lt, area) ||
    isInsideArea(rt, area) ||
    isInsideArea(lb, area) ||
    isInsideArea(rb, area)
  )
}

export function getSelectArea(areaData, comps) {
  const result = []

  // 计算所有的组件数据，判断是否在选中区域内
  comps.forEach(component => {
    if (component.hided || component.locked) return
    // 判断任意一个角点在区域内部，即可判定已经选中了这个组件

    if (anyPointInArea(component.attr, areaData)) {
      result.push(component)
    }
  })

  return result
}
