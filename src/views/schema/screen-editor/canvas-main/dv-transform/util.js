// 八个方位点对应的初始角度
import { off, on } from '@/utils/util'
import { EventBus, EventMap } from '@/utils/event-bus'
import { nextTick } from 'vue'
import { useStore } from '@/store'

const { schemaStore, storeToRefs } = useStore()

const initialDirectionAngle = [
  { direction: 'lt', angle: 0 },
  { direction: 't', angle: 45 },
  { direction: 'rt', angle: 90 },
  { direction: 'r', angle: 135 },
  { direction: 'rb', angle: 180 },
  { direction: 'b', angle: 225 },
  { direction: 'lb', angle: 270 },
  { direction: 'l', angle: 315 },
]

// 每个范围的角度对应的光标
const angleToCursor = [
  { start: 338, end: 23, cursor: 'nwse-resize' },
  { start: 23, end: 68, cursor: 'ns-resize' },
  { start: 68, end: 113, cursor: 'nesw-resize' },
  { start: 113, end: 158, cursor: 'ew-resize' },
  { start: 158, end: 203, cursor: 'nwse-resize' },
  { start: 203, end: 248, cursor: 'ns-resize' },
  { start: 248, end: 293, cursor: 'nesw-resize' },
  { start: 293, end: 338, cursor: 'ew-resize' },
]

export const getCursors = startAngle => {
  const rotate = (startAngle + 360) % 360 // 防止角度有负数，所以 + 360
  const result = {}
  let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
  initialDirectionAngle.forEach(point => {
    const angle = (point.angle + rotate) % 360
    const len = angleToCursor.length
    const i = 0
    while (i < len) {
      lastMatchIndex = (lastMatchIndex + 1) % len
      const angleLimit = angleToCursor[lastMatchIndex]
      if (angle < 23 || angle >= 338) {
        result[point.direction] = 'nwse-resize'
        break
      }

      if (angleLimit.start <= angle && angle < angleLimit.end) {
        result[point.direction] = angleLimit.cursor
        break
      }
    }
  })

  return result
}

/**
 * 计算缩放后位置大小 - 自然模式
 * @param dir 拖拽方向
 * @param attr 开始时的基本信息
 * @param startPoint 拖拽起始点位置
 * @param curPosition 当前拖拽位置
 * @param scale 缩放比例
 * @param pos
 * @param ratio 原始宽高比
 */
function calcResizeForNormal(dir, attr, startPoint, curPosition, scale, pos, ratio) {
  if (dir === 't') {
    pos.h = Math.round(attr.h + (startPoint.y - curPosition.y) / scale)
    pos.y = Math.round(attr.y + (curPosition.y - startPoint.y) / scale)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.w = pos.h * ratio
    }
  } else if (dir === 'rt') {
    pos.h = Math.round(attr.h + (startPoint.y - curPosition.y) / scale)
    pos.w = Math.round(attr.w + (curPosition.x - startPoint.x) / scale)
    pos.y = Math.round(attr.y + (curPosition.y - startPoint.y) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.w = pos.h * ratio
    }
  } else if (dir === 'r') {
    pos.w = Math.round(attr.w + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'rb') {
    pos.h = Math.round(attr.h + (curPosition.y - startPoint.y) / scale)
    pos.w = Math.round(attr.w + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'b') {
    pos.h = Math.round(attr.h + (curPosition.y - startPoint.y) / scale)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.w = pos.h * ratio
    }
  } else if (dir === 'lb') {
    pos.h = Math.round(attr.h + (curPosition.y - startPoint.y) / scale)
    pos.w = Math.round(attr.w + (startPoint.x - curPosition.x) / scale)
    pos.x = Math.round(attr.x + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'l') {
    pos.w = Math.round(attr.w + (startPoint.x - curPosition.x) / scale)
    pos.x = Math.round(attr.x + (curPosition.x - startPoint.x) / scale)
    pos.w = Math.max(pos.w, 20)
    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
    }
  } else if (dir === 'lt') {
    pos.h = Math.round(attr.h + (startPoint.y - curPosition.y) / scale)
    pos.w = Math.round(attr.w + (startPoint.x - curPosition.x) / scale)
    pos.w = Math.max(pos.w, 20)
    pos.h = Math.max(pos.h, 20)
    pos.x = Math.round(attr.x + (curPosition.x - startPoint.x) / scale)
    pos.y = Math.round(attr.y + (curPosition.y - startPoint.y) / scale)

    if (attr.lockedRatio) {
      pos.h = pos.w / ratio
      pos.y = Math.round(attr.y + (curPosition.x - startPoint.x) / scale)
    }
  }
}

const setAttr = (ev, dir, com, scale, grid) => {
  const attr = { ...com.attr }
  // 记录原始宽高比
  const ratio = attr.w / attr.h
  const pos = Object.create(null)
  const startX = ev.clientX
  const startY = ev.clientY

  let hasMove = false
  const move = e => {
    const { shortcuts } = storeToRefs(schemaStore)
    const { ctrlKey, shiftKey } = shortcuts.value

    const curX = e.clientX
    const curY = e.clientY
    // 每次移动固定格数
    const moveX = Math.round((curX - startX) / scale / grid) * grid
    const moveY = Math.round((curY - startY) / scale / grid) * grid

    hasMove = Math.abs(moveX) >= 1 || Math.abs(moveY) >= 1

    if (dir) {
      calcResizeForNormal(
        dir,
        attr,
        { x: startX, y: startY },
        { x: curX, y: curY },
        scale,
        pos,
        ratio,
      )
    } else {
      if (ctrlKey) {
        pos.x = attr.x + moveX
      }
      if (shiftKey) {
        pos.y = attr.y + moveY
      }
      if (!ctrlKey && !shiftKey) {
        pos.x = attr.x + moveX
        pos.y = attr.y + moveY
      }
    }

    com.attr = { ...com.attr, ...pos }
    nextTick().then(() => {
      EventBus.emit(EventMap.CompMove, {
        isDownward: curY - startY > 0,
        isRightward: curX - startX > 0,
      })
    })
  }
  const up = () => {
    EventBus.emit(EventMap.CompUnMove)
    hasMove && schemaStore.recordSnapshot()
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
  }

  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}

export const handleMove = (ev, com, scale, grid) => {
  setAttr(ev, null, com, scale, grid)
}

export const handleZoom = (ev, dir, com, scale, grid) => {
  setAttr(ev, dir, com, scale, grid)
}

export const handleRotate = (ev, el, com) => {
  // 获取元素中心点位置
  const rect = el.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  const startAngle =
    (Math.atan2(centerY - ev.clientY, centerX - ev.clientX) * 180) / Math.PI - com.attr.rotate

  // 如果元素没有移动，则不保存快照
  let hasMove = false
  const move = e => {
    hasMove = true
    const angle =
      (Math.atan2(centerY - e.clientY, centerX - e.clientX) * 180) / Math.PI - startAngle
    const rotate = Math.round(angle % 360)
    com.attr.rotate = rotate < 0 ? rotate + 360 : rotate
  }

  const up = () => {
    hasMove && schemaStore.recordSnapshot()
    off(document, 'mousemove', move)
    off(document, 'mouseup', up)
  }

  on(document, 'mousemove', move)
  on(document, 'mouseup', up)
}
