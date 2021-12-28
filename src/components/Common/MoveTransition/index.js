import { h, Transition } from 'vue'

export default {
  name: 'MoveTransition',
  functional: true,
  setup(props, { slots }) {
    return () => {
      return h(Transition, {
        name: 'fade-transverse',
        appear: true,
        onBeforeLeave(el) {
          el.style.position = 'absolute'
          el.style.top = '0'
          el.style.left = '0'
          el.style.width = '100%'
          el.style.height = '100%'
          el.style.overflow = 'hidden'
        },
        onAfterLeave(el) {
          el.style = ''
        },
      }, slots.default)
    }
  },
}
