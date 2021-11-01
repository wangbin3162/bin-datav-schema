import VBasicBar from './bar/basic-bar'
import VMainTitle from './text/main-title'
import VNumberTitleFlop from './text/number-title-flop'
import VTimer from './text/timer'
import VBgBox from './media/bg-box'
import VBorderBox from './media/border-box'
import VDecoration from './media/decoration'
import VMainImg from './media/main-img'

const components = [
  VBasicBar,
  VMainTitle,
  VNumberTitleFlop,
  VTimer,
  VBgBox,
  VBorderBox,
  VDecoration,
  VMainImg,
]

export function registerVCharts(app) {
  // sync register
  components.forEach(component => {
    app.use(component)
  })
}
