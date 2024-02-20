// 转换为px
import { addClass } from '@/utils/util'

const pixelize = val => `${val}px`

// 创建高分辨率画布
const createCanvas = (el, width, height, ratio) => {
  const canvas = el ?? document.createElement('canvas')
  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = pixelize(width)
  canvas.style.height = pixelize(height)

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
  }
  return canvas
}

export class RulerBuilder {
  constructor(container, options) {
    this.el = container
    this.options = {
      direction: 'TB',
      width: 1000,
      height: 20,
      bgColor: '#18181c',
      fontFamily: 'sans-serif',
      fontSize: '10px',
      fontColor: '#90a0ae',
      strokeStyle: 'rgba(161, 174, 179, 0.8)',
      lineWidth: 0.5,
      indicatorLineWidth: 1,
      scale: 1,
      offset: 40,
      ratio: 2,
      ...options,
    }
    this.canvas = null
    this.ctx = null
    this.ruler = { width: 0, height: 0 }

    this.constructRuler()
  }

  // 创建标尺
  constructRuler() {
    const { el, options } = this
    const { direction, width, height, ratio } = options

    const deltaW =
      direction === 'TB' ? Math.max(el.offsetWidth, width) : Math.max(el.offsetHeight, width)
    const deltaH = height

    this.ruler.width = deltaW
    this.ruler.height = deltaH

    const canvas = createCanvas(null, deltaW, deltaH, ratio)
    addClass(canvas, 'canvas-ruler')
    el.appendChild(canvas)

    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.drawRuler()
  }

  // 画标尺
  drawRuler() {
    const { ctx, options, ruler } = this
    const { width, height } = ruler

    ctx.beginPath()
    ctx.fillStyle = options.bgColor
    ctx.fillRect(0, 0, width, height)
    ctx.closePath()

    ctx.beginPath()
    ctx.font = `${options.fontSize} ${options.fontFamily}`
    ctx.textAlign = 'left'
    ctx.fillStyle = options.fontColor
    ctx.strokeStyle = options.strokeStyle
    ctx.lineWidth = options.lineWidth
    this.drawPoints()
    ctx.stroke()
  }

  // 画刻度
  drawPoints() {
    const { ctx, options, ruler } = this
    const { width, height } = ruler
    const { offset, scale } = options

    const maxTickLen = 0,
      medTickLen = height / 1.5,
      minTickLen = height / 1.2

    for (let pos = 0; pos <= width; pos += 1) {
      const delta = pos - offset
      if (delta < 0) continue

      let label = -1
      let tickLen = -1
      if (delta % 50 === 0) {
        label = Math.floor(delta / scale)
        tickLen = maxTickLen
      } else if (delta % 25 === 0) {
        tickLen = medTickLen
      } else if (delta % 5 === 0) {
        tickLen = minTickLen
      }

      if (tickLen >= 0) {
        ctx.moveTo(pos + 0.5, height + 0.5)
        ctx.lineTo(pos + 0.5, tickLen)
        if (label > -1) {
          ctx.fillText(`${label}`, pos + 2.5, height / 1.5)
        }
      }
    }
  }

  // 设置画布尺寸和比例
  setSize(w, h, s) {
    const { el, options } = this
    options.width = w
    options.height = h
    options.scale = s
    const { direction, width, height, ratio } = options

    const deltaW =
      direction === 'TB' ? Math.max(el.offsetWidth, width) : Math.max(el.offsetHeight, width)
    const deltaH = height

    this.ruler.width = deltaW
    this.ruler.height = deltaH

    createCanvas(this.canvas, deltaW, deltaH, ratio)
    this.drawRuler()
  }

  destroy() {
    const { el } = this
    el.remove()
  }
}
