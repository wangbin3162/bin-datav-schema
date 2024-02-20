import { ComType } from '@/config/data-source'

export default {
  name: 'VIcon',
  alias: '图标',
  icon: 'smile',
  type: ComType.com,
  attr: { w: 100, h: 100, lockedRatio: true },
  config: {
    attr: { w: 100, h: 100 },
    pointerType: 'other', // 取值为image和border
    src: 'smile',
    color: '#fff',
    size: 180,
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apiData: {},
  events: {},
}

// 图标预设模式
export const pointerType = [
  { value: 'other', label: '图标' },
  { value: 'btn', label: '按钮' },
]
