// 操作上移下移类别
export const MoveType = {
  up: '0',
  down: '1',
  top: '2',
  bottom: '3',
}

// screen尺寸枚举
export const screenSizeMap = ['web', 'mobile', 'custom', 'tpl']
// web 尺寸
export const webScreenMap = [
  { label: 'Web 1920', width: 1920, height: 1080, type: 'web' },
  { label: 'Web 2560', width: 2560, height: 1080, type: 'web' },
  { label: 'Web 3440', width: 3440, height: 1080, type: 'web' },
  { label: 'Web 3440 2k', width: 3440, height: 1440, type: 'web' },
]
// 移动端尺寸
export const mobileScreenMap = [
  { label: 'iphone 5/7/8 plus', width: 414, height: 736, type: 'mobile' },
  { label: 'iphone 6/7/8', width: 375, height: 667, type: 'mobile' },
  { label: 'iphone pro/X', width: 375, height: 812, type: 'mobile' },
]
