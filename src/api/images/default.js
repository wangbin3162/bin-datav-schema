import { getImagesPath } from '@/utils/env'
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

// 获取预设的图片资源
async function getPresetImages(groupKey) {
  try {
    const path = getImagesPath(`/${groupKey}/index.json`)
    const res = await axios.get(path)
    // 拼接附带组件配置的预设资源
    const list = res.data.map(item => ({
      ...item,
      group: groupKey,
      src: getImagesPath(`/${groupKey}/${item.src}`),
    }))
    return list
  } catch (error) {
    return []
  }
}

export { defaultGroup, defaultGroupKeys, getPresetImages }
