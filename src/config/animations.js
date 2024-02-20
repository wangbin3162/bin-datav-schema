export const Animations = [
  {
    label: '常用动画',
    children: [
      { label: '渐显', value: 'fadeIn' },
      { label: '渐隐', value: 'fadeOut' },
      { label: '放大缩小', value: 'pulse' },
      { label: '旋转', value: 'rotateIn' },
      { label: '旋转退出', value: 'rotateOut' },
      { label: '弹入', value: 'bounceIn' },
      { label: '弹出', value: 'bounceOut' },
    ],
  },
  {
    label: '强调动画',
    children: [
      { label: '反弹', value: 'bounce' },
      { label: '闪烁', value: 'flash' },
      { label: '放大缩小弹簧', value: 'rubberBand' },
      { label: '左右扇形摇摆', value: 'swing' },
      { label: '放大晃动缩小', value: 'tada' },
      { label: '扇形摇摆', value: 'wobble' },
      { label: '左右上下晃动', value: 'jello' },
    ],
  },
  {
    label: '移入动画',
    children: [
      { label: '向右进入', value: 'fadeInLeft' },
      { label: '向左进入', value: 'fadeInRight' },
      { label: '向上进入', value: 'fadeInUp' },
      { label: '向下进入', value: 'fadeInDown' },
      { label: '向右长距进入', value: 'fadeInLeftBig' },
      { label: '向左长距进入', value: 'fadeInRightBig' },
      { label: '向上长距进入', value: 'fadeInUpBig' },
      { label: '向下长距进入', value: 'fadeInDownBig' },

      { label: '左顺时针旋转', value: 'rotateInDownLeft' },
      { label: '右逆时针旋转', value: 'rotateInDownRight' },
      { label: '左逆时针旋转', value: 'rotateInUpLeft' },
      { label: '右逆时针旋转', value: 'rotateInUpRight' },

      { label: '向右弹入', value: 'bounceInLeft' },
      { label: '向左弹入', value: 'bounceInRight' },
      { label: '向上弹入', value: 'bounceInUp' },
      { label: '向下弹入', value: 'bounceInDown' },

      { label: '光速从右进入', value: 'lightSpeedInRight' },
      { label: '光速从左进入', value: 'lightSpeedInLeft' },

      { label: '中心X轴转入', value: 'flipInX' },
      { label: '中心Y轴转入', value: 'flipInY' },

      { label: '由小变大进入', value: 'zoomIn' },
      { label: '左变大进入', value: 'zoomInLeft' },
      { label: '右变大进入', value: 'zoomInRight' },
      { label: '向上变大进入', value: 'zoomInUp' },
      { label: '向下变大进入', value: 'zoomInDown' },

      { label: '向右滑动展开', value: 'slideInLeft' },
      { label: '向左滑动展开', value: 'slideInRight' },
      { label: '向上滑动展开', value: 'slideInUp' },
      { label: '向下滑动展开', value: 'slideInDown' },
    ],
  },
  {
    label: '退出动画',
    children: [
      { label: '向右退出', value: 'fadeOutLeft' },
      { label: '向左退出', value: 'fadeOutRight' },
      { label: '向上退出', value: 'fadeOutUp' },
      { label: '向下退出', value: 'fadeOutDown' },
      { label: '向右长距退出', value: 'fadeOutLeftBig' },
      { label: '向左长距退出', value: 'fadeOutRightBig' },
      { label: '向上长距退出', value: 'fadeOutUpBig' },
      { label: '向下长距退出', value: 'fadeOutDownBig' },

      { label: '左顺时针旋转', value: 'rotateOutDownLeft' },
      { label: '右逆时针旋转', value: 'rotateOutDownRight' },
      { label: '左逆时针旋转', value: 'rotateOutUpLeft' },
      { label: '右逆时针旋转', value: 'rotateOutUpRight' },

      { label: '向右弹出', value: 'bounceOutLeft' },
      { label: '向左弹出', value: 'bounceOutRight' },
      { label: '向上弹出', value: 'bounceOutUp' },
      { label: '向下弹出', value: 'bounceOutDown' },

      { label: '光速从右退出', value: 'lightSpeedOutRight' },
      { label: '光速从左退出', value: 'lightSpeedOutLeft' },

      { label: '中心X轴转出', value: 'flipOutX' },
      { label: '中心Y轴转出', value: 'flipOutY' },

      { label: '由小变大退出', value: 'zoomOut' },
      { label: '左变大退出', value: 'zoomOutLeft' },
      { label: '右变大退出', value: 'zoomOutRight' },
      { label: '向上变大退出', value: 'zoomOutUp' },
      { label: '向下变大退出', value: 'zoomOutDown' },

      { label: '向右滑动退出', value: 'slideOutLeft' },
      { label: '向左滑动退出', value: 'slideOutRight' },
      { label: '向上滑动退出', value: 'slideOutUp' },
      { label: '向下滑动退出', value: 'slideOutDown' },
    ],
  },
  {
    label: '其他',
    children: [
      { label: '跌落', value: 'hinge' },
      { label: '滚入', value: 'rollIn' },
      { label: '滚出', value: 'rollOut' },
      { label: '转入', value: 'jackInTheBox' },
    ],
  },
]

export function getAnimationName(value) {
  const all = {}
  Animations.forEach(group => {
    group.children.forEach(item => {
      all[item.value] = item.label
    })
  })
  return all[value] ?? 'no-animation-name'
}

// 播放速度枚举
export const TimingOptions = [
  { label: '匀速', value: 'linear' },
  { label: '快-慢-快', value: 'ease' },
  { label: '低速开始', value: 'ease-in' },
  { label: '低速结束', value: 'ease-out' },
  { label: '低速开始结束', value: 'ease-in-out' },
]

// 播放速度枚举
export const DirectionOptions = [
  { label: '默认', value: 'normal' },
  { label: '向后', value: 'reverse' },
  { label: '向前向后', value: 'alternate' },
  { label: '向后向前', value: 'alternate-reverse' },
]
// * 动画
export const animationsClass = animation => {
  let animate = ''
  if (animation.enable) {
    animate = `animate__animated animate__${animation.name} `
    if (animation.loop) {
      animate += 'animate__infinite'
    }
  }
  return animate
}

// 动画设置
export const animationsStyles = animation => {
  if (animation.enable) {
    return {
      animationDuration: `${animation.duration}s`,
      animationDelay: `${animation.delay}s`,
      animationTimingFunction: animation.timing,
      animationDirection: animation.direction,
    }
  }
  return {}
}
