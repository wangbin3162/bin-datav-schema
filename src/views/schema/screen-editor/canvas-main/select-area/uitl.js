import { useStore } from '@/store'
const { schemaStore } = useStore()

// 获取转换的选中区域
export const getTransArea = ({ x, y, width, height }) => {
  const scale = schemaStore.canvas.scale
  const X = (x - 60) / scale
  const Y = (y - 60) / scale
  const W = width / scale
  const H = height / scale
  return {
    x: X,
    y: Y,
    width: W,
    height: H,
  }
}
