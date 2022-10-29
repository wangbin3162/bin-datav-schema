// 生成预览图片方法。存成base64数据存储
import { dom2jpeg } from 'modern-screenshot'

// 生成缩略图
async function createPreviewThumb(el) {
  try {
    return await dom2jpeg(el, { quality: 0.7 })
  } catch (error) {
    console.error(error)
    return ''
  }
}

export { createPreviewThumb }
