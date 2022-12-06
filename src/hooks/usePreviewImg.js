// 生成预览图片方法。存成base64数据存储
import { toJpeg } from 'html-to-image'

// 生成缩略图
async function createPreviewThumb(el) {
  try {
    const width = el.clientWidth
    const height = el.clientHeight
    return await toJpeg(el, { quality: 0.7, width, height })
  } catch (error) {
    console.error(error)
    return ''
  }
}

export { createPreviewThumb }
