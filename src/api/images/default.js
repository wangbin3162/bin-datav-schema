import imageConfig from '@/components/Schema/basic/image/config'
import { getImagesPath } from '@/utils/env'
import { deepMerge, deepCopy } from '@/utils/util'
import axios from 'axios'

// 默认分组
const defaultGroup = [
  { key: 'bg', value: '背景图' },
  { key: 'header', value: '头部' },
  { key: 'box', value: '边框' },
  { key: 'decoration', value: '装饰器' },
  { key: 'widget', value: '小部件' },
]
const defaultGroupKeys = defaultGroup.map(i => i.key)

// 获取一个默认的图片配置项
function getDefaultImageConfig(cfg = {}) {
  return deepMerge(deepCopy(imageConfig), deepCopy(cfg))
}

// 获取预设的图片资源
async function getPresetImages(groupKey) {
  try {
    const path = getImagesPath(`/${groupKey}/index.json`)
    const res = await axios.get(path)
    // 拼接附带组件配置的预设资源
    const list = res.data.map(item =>
      getDefaultImageConfig({
        alias: item.name,
        attr: item.attr ?? {},
        config: {
          imageType: groupKey === 'box' ? 'border' : 'image',
          src: getImagesPath(`/${groupKey}/${item.src}`),
          border: item.border ?? {},
        },
      }),
    )
    return list
  } catch (error) {
    return []
  }
}

// 获取预设的图片资源
function getLibImages(images) {
  return images.map(img =>
    getDefaultImageConfig({
      alias: img.name,
      attr: img.attr ?? {},
      config: {
        imageType: 'image',
        src: img.src,
      },
    }),
  )
}

export { defaultGroup, defaultGroupKeys, getDefaultImageConfig, getPresetImages, getLibImages }
