<template>
  <div class="mark-line">
    <div
      v-for="line in lines"
      :key="line"
      class="line"
      :class="[line.includes('x')? 'xline' : 'yline',line]"
      :ref="el=>{lineRefs[line]=el}"
      v-show="lineStatus[line] || false"
    ></div>
  </div>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import eventBus from '@/utils/event-bus'
import useSchemaStore from '@/hooks/schema/useSchemaStore'
import { getComponentRotatedStyle } from '@/views/schema/screen-editor/canvas-main/mark-line/util'

const DIFF = 5
export default {
  name: 'mark-line',
  setup() {
    const { comps, selectedCom, canvas, setSingleComAttr, toolbox } = useSchemaStore()
    const lineRefs = ref([])
    const lines = ref(['xt', 'xc', 'xb', 'yl', 'yc', 'yr']) // 分别对应三条横线和三条竖线
    const lineStatus = ref({
      xt: false,
      xc: false,
      xb: false,
      yl: false,
      yc: false,
      yr: false,
    })

    const hideLine = () => {
      Object.keys(lineStatus.value).forEach(line => {
        lineStatus.value[line] = false
      })
    }

    const showLine = (isDownward, isRightward) => {
      const lines = lineRefs.value
      const currentComp = selectedCom.value
      // 筛选移除隐藏的组件
      const components = comps.value.filter(v => !v.hided)
      const scale = canvas.value.scale

      const curComponentStyle = getComponentRotatedStyle(compStyle(currentComp.attr))
      const curComponentHalfWidth = curComponentStyle.width / 2
      const curComponentHalfHeight = curComponentStyle.height / 2

      hideLine()
      components.forEach(component => {
        if (component.id === currentComp.id) return
        const { top, left, bottom, right, width, height } = getComponentRotatedStyle(compStyle(component.attr))
        const componentHalfWidth = width / 2
        const componentHalfHeight = height / 2
        const conditions = {
          top: [
            {
              isNearly: isNearly(curComponentStyle.top, top),
              lineNode: lines.xt, // xt
              line: 'xt',
              dragShift: top,
              lineShift: top,
            },
            {
              isNearly: isNearly(curComponentStyle.bottom, top),
              lineNode: lines.xt, // xt
              line: 'xt',
              dragShift: top - curComponentStyle.height,
              lineShift: top,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: isNearly(curComponentStyle.top + curComponentHalfHeight, top + componentHalfHeight),
              lineNode: lines.xc, // xc
              line: 'xc',
              dragShift: top + componentHalfHeight - curComponentHalfHeight,
              lineShift: (top + componentHalfHeight),
            },
            {
              isNearly: isNearly(curComponentStyle.top, bottom),
              lineNode: lines.xb, // xb
              line: 'xb',
              dragShift: bottom,
              lineShift: bottom,
            },
            {
              isNearly: isNearly(curComponentStyle.bottom, bottom),
              lineNode: lines.xb, // xb
              line: 'xb',
              dragShift: bottom - curComponentStyle.height,
              lineShift: bottom,
            },
          ],
          left: [
            {
              isNearly: isNearly(curComponentStyle.left, left),
              lineNode: lines.yl, // yl
              line: 'yl',
              dragShift: left,
              lineShift: left,
            },
            {
              isNearly: isNearly(curComponentStyle.right, left),
              lineNode: lines.yl, // yl
              line: 'yl',
              dragShift: left - curComponentStyle.width,
              lineShift: left,
            },
            {
              // 组件与拖拽节点的中间是否对齐
              isNearly: isNearly(curComponentStyle.left + curComponentHalfWidth, left + componentHalfWidth),
              lineNode: lines.yc, // yc
              line: 'yc',
              dragShift: left + componentHalfWidth - curComponentHalfWidth,
              lineShift: (left + componentHalfWidth),
            },
            {
              isNearly: isNearly(curComponentStyle.left, right),
              lineNode: lines.yr, // yr
              line: 'yr',
              dragShift: right,
              lineShift: right,
            },
            {
              isNearly: isNearly(curComponentStyle.right, right),
              lineNode: lines.yr, // yr
              line: 'yr',
              dragShift: right - curComponentStyle.width,
              lineShift: right,
            },
          ],
        }

        const needToShow = []
        const { rotate } = curComponentStyle
        Object.keys(conditions).forEach(key => {
          // 遍历符合的条件并处理
          conditions[key].forEach((condition) => {
            if (!condition.isNearly) return
            // 修改当前组件位移
            const value = rotate !== 0
              ? translateCurComponentShift(key, condition, curComponentStyle)
              : condition.dragShift
            console.log(top, left, bottom, right, width, height)
            setSingleComAttr({ key, value })
            condition.lineNode.style[key] = `${condition.lineShift * scale + 60}px`
            needToShow.push(condition.line)
          })
        })
        // 同一方向上同时显示三条线可能不太美观，因此才有了这个解决方案
        // 同一方向上的线只显示一条，例如多条横条只显示一条横线
        if (needToShow.length) {
          chooseTheTureLine(needToShow, isDownward, isRightward)
        }
      })
    }

    const translateCurComponentShift = (key, condition, curComponentStyle) => {
      const { w, h } = selectedCom.value.attr
      if (key === 'top') {
        return Math.round(condition.dragShift - (h - curComponentStyle.height) / 2)
      }
      return Math.round(condition.dragShift - (w - curComponentStyle.width) / 2)
    }

    const chooseTheTureLine = (needToShow, isDownward, isRightward) => {
      // 如果鼠标向右移动 则按从右到左的顺序显示竖线 否则按相反顺序显示
      if (isRightward) {
        if (needToShow.includes('yr')) {
          lineStatus.value.yr = true
        } else if (needToShow.includes('yc')) {
          lineStatus.value.yc = true
        } else if (needToShow.includes('yl')) {
          lineStatus.value.yl = true
        }
      } else {
        if (needToShow.includes('yl')) {
          lineStatus.value.yl = true
        } else if (needToShow.includes('yc')) {
          lineStatus.value.yc = true
        } else if (needToShow.includes('yr')) {
          lineStatus.value.yr = true
        }
      }
      // 如果鼠标向下移动 则按从下到上的顺序显示横线 否则按相反顺序显示
      if (isDownward) {
        if (needToShow.includes('xb')) {
          lineStatus.value.xb = true
        } else if (needToShow.includes('xc')) {
          lineStatus.value.xc = true
        } else if (needToShow.includes('xt')) {
          lineStatus.value.xt = true
        }
      } else {
        if (needToShow.includes('xt')) {
          lineStatus.value.xt = true
        } else if (needToShow.includes('xc')) {
          lineStatus.value.xc = true
        } else if (needToShow.includes('xb')) {
          lineStatus.value.xb = true
        }
      }
    }

    const compStyle = (attr) => ({ left: attr.x, top: attr.y, width: attr.w, height: attr.h, rotate: attr.rotate })

    const isNearly = (dragValue, targetValue) => Math.abs(dragValue - targetValue) <= DIFF

    onMounted(() => {
      eventBus.on('move', ({ isDownward, isRightward }) => {
        if (toolbox.value.markLine) {
          showLine(isDownward, isRightward)
        }
      })
      eventBus.on('unmove', () => {
        hideLine()
      })
    })
    onBeforeUnmount(() => {
      eventBus.off('move')
      eventBus.off('unmove')
    })
    return {
      lineRefs,
      lines,
      lineStatus,
    }
  },
}
</script>

<style scoped lang="stylus">
.mark-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.line {
  background: #59c7f9;
  position: absolute;
  z-index: 1000;
}
.xline {
  width: 100%;
  height: 1px;
}
.yline {
  width: 1px;
  height: 100%;
}
</style>
