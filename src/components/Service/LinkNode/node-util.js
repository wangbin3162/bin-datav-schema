// 连接类别
export const JOIN_TYPE = {
  LEFT_OUTER_JOIN: { label: '左外连接' },
  INNER_JOIN: { label: '内连接' },
  FULL_OUTER_JOIN: { label: '全连接' },
}
// 字段类别
export const FIELD_TYPE = {
  measure: 'M',
  dimension: 'D',
  mapping: {
    M: { label: '度量' },
    D: { label: '维度' },
  },
}
// 节点高度
export const NODE_HEIGHT = 30
// 节点宽度
export const NODE_WIDTH = 180
// 节点tip宽度
export const NODE_TIP_WIDTH = 90
// 节点偏移
export const NODE_MARGIN = 18
// 节点一半高度
export const HALF_H = NODE_HEIGHT / 2

/**
 * 获取link-margin style
 */
export function getLinkMarginStyle(maxLevel, maxRow, defaultStyle = {}) {
  const left = NODE_WIDTH * (maxLevel + 1) + NODE_TIP_WIDTH * maxLevel + NODE_MARGIN
  const top = (NODE_HEIGHT + NODE_MARGIN) * (maxRow + 1)
  return [
    { top: 0, left: `${left}px`, ...defaultStyle },
    { left: 0, top: `${top}px`, ...defaultStyle },
  ]
}

/**
 * 获取 Node节点样式
 * @param row 行
 * @param level 列
 * @returns {{nodeStyle: {top, left, width, height}, tipStyle: {top, left, width, height}}}
 */
export function getNodeStyle(row, level) {
  const top = `${row === 0 ? 0 : row * (NODE_HEIGHT + NODE_MARGIN)}px`
  const left = `${(NODE_WIDTH + NODE_TIP_WIDTH) * level}px`
  const tipLeft = `${level === 1 ? (NODE_WIDTH * level) : (NODE_WIDTH * level + NODE_TIP_WIDTH * (level - 1))}px`
  const nodeStyle = {
    top,
    left,
    height: `${NODE_HEIGHT}px`,
    width: `${NODE_WIDTH}px`,
  }
  const tipStyle = {
    top,
    left: tipLeft,
    height: `${NODE_HEIGHT}px`,
    width: `${NODE_TIP_WIDTH}px`,
  }
  return { nodeStyle, tipStyle }
}

/**
 * tip-line style
 * @param row
 * @param isKnee
 * @param parentRow
 * @returns {({top: string, width: string}|{bottom: string, height: (string|number)})[]}
 */
export function getTipLineStyle(row, isKnee, parentRow) {
  const hStyle = {
    top: `${HALF_H}px`,
    width: isKnee ? `${NODE_TIP_WIDTH - NODE_MARGIN}px` : `${NODE_TIP_WIDTH}px`,
  }
  const vStyle = {
    height: isKnee ? `${(row - parentRow) * (NODE_HEIGHT + NODE_MARGIN)}px` : 0,
    bottom: `${HALF_H}px`,
  }
  return [hStyle, vStyle]
}
