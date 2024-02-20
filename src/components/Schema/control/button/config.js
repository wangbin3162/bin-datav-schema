import { ComType } from '@/config/data-source'
import { getComPath } from '@/utils/env'

export const buttonConfig = {
  name: 'VButton',
  alias: '按钮',
  icon: 'image',
  type: ComType.com,
  attr: { w: 120, h: 32, lockedRatio: true },
  config: {
    title: '我是按钮',
    textStyle: {
      fontFamily: 'Microsoft Yahei',
      fontSize: 18,
      color: '#fff',
      fontWeight: 'normal',
    },
    textAlign: 'center',
    writingMode: 'horizontal-tb',
    ellipsis: false,
    backgroundStyle: {
      show: true,
      backgroundType: 'normal', // 取值为normal和image
      bgColor: '#008bff',
      borderColor: '#fff',
      borderStyle: 'solid',
      borderWidth: 1,
      src: getComPath('img.svg'),
      attr: { w: 120, h: 48 },
    },
    radius: 5,
    shadow: {
      show: false,
      size: '0 0 15px inset',
      color: '#003a8c',
    },
    urlConfig: {
      url: '',
      ifBlank: false,
    },
  },
  apiData: {},
  events: {
    click: {
      name: '按钮点击',
      params: [],
      enable: false,
    },
    customScript: {
      augments: ['curComp', 'components'],
      enable: false,
    },
  },
}

export default buttonConfig

// 按钮背景模式
export const BackgroundTypeOptions = [
  { value: 'normal', label: '普通' },
  { value: 'image', label: '图片' },
]
