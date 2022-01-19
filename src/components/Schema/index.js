import VBasicBar from './bar/basic-bar'
import VHorizontalBar from './bar/hori-basic-bar'
import VBasicLine from './line/basic-line'
import VBasicArea from './line/basic-area'
import VBasicPie from './pie/basic-pie'
import VBasicRing from './pie/basic-ring'
import VBasicRadar from './radar/basic-radar'
import VMainTitle from './text/main-title'
import VNumberTitleFlop from './text/number-title-flop'
import VTimer from './text/timer'
import VBgBox from './media/bg-box'
import VBorderBox from './media/border-box'
import VDecoration from './media/decoration'
import VMainImg from './media/main-img'
import VScrollTable from './table/scroll-table'

const components = [
  VBasicBar,
  VHorizontalBar,
  VBasicLine,
  VBasicArea,
  VBasicPie,
  VBasicRing,
  VBasicRadar,
  VMainTitle,
  VNumberTitleFlop,
  VTimer,
  VBgBox,
  VBorderBox,
  VDecoration,
  VMainImg,
  VScrollTable,
]

export function registerVCharts(app) {
  // sync register
  components.forEach((component) => {
    app.use(component)
  })
}
