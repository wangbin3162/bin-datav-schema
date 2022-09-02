import { MoveType } from '@/config/enum'
import { deepCopy, generateId, isEmpty } from '@/utils/util'

const findComIndex = (comps, id) => comps.findIndex(c => c.id === id)

const findCom = (comps, id) => comps.find(c => c.id === id)

// 模拟后端复制
const getNewCom = com => {
  const ncom = deepCopy(com)
  ncom.id = `${ncom.name}_${generateId()}`
  ncom.alias += '_copy'
  ncom.attr.x += 50
  ncom.attr.y += 50

  if (!isEmpty(ncom.apiData)) {
    ncom.apiData.id = `api_${generateId()}`
    ncom.apiData.comId = ncom.id
  }

  return ncom
}

const defaultInfo = {
  pid: '1',
  id: '',
  name: '',
}

const defaultPageCfg = {
  width: 1920,
  height: 1080,
  bgColor: '#0d2a42',
  bgImage: '',
  grid: 1, // 拖拽间隔
  thumbnail: '',
}

// page页面需要保存的信息
export default {
  state: {
    // 当前页面信息
    pageInfo: { ...defaultInfo },
    // 页面存储数据
    pageConfig: { ...defaultPageCfg },
    comps: [], // 画布中的组件，默认插入一个用于调试可动态添加，暂时写死，后期用lowdb缓存
    selectedCom: null, // 单选选中的可拖拽组件
    multipleComs: [],
    hoveredComId: '', // 悬停的组件缓存，保存的内容为id
    renamingComId: '', // 重命名的id
  },
  getters: {
    multiSelect() {
      return this.multipleComs.length > 1
    },
  },
  actions: {
    setPageInfo(info) {
      this.pageInfo = info || { ...defaultInfo }
    },
    addCom({ component, index }) {
      if (index !== undefined) {
        this.comps.splice(index, 0, component)
      } else {
        this.comps.push(component)
      }
      this.recordSnapshot()
    },
    copyCom(id) {
      const ocom = findCom(this.comps, id)
      if (ocom) {
        const ncom = getNewCom(ocom)
        this.comps.push(ncom)
        this.selectedCom = ncom
        this.recordSnapshot()
      }
    },
    deleteCom(id) {
      this.comps.splice(findComIndex(this.comps, id), 1)
      this.recordSnapshot()
      this.selectedCom = null
    },
    selectCom(component) {
      if (!component) {
        this.selectedCom = null
        this.multipleComs = []
        return
      }
      this.selectedCom = component
      // 判断当前点击的时候有没有按下shift，如果按下了之后就追加，否则的话就只更新一个选项
      if (this.shortcuts.shiftKey) {
        // 判断该上一次如果有单选切多选数组中位空则需要先新增一下，在执行追加
        if (this.selectedCom && this.multipleComs.length === 0) {
          this.multipleComs = [this.selectedCom]
        }
        // 判断是否包含当前组件，如没有再新增
        const i = findComIndex(this.multipleComs, component.id)
        if (i === -1) this.multipleComs.push(component)
      } else {
        // 如果是单选模式则需要隐藏上次的多选区域
        this.areaData.showArea = false
        this.multipleComs = [component]
      }
      // 判断多选后，需要设置areaData多选区域
      if (this.multipleComs.length > 1) {
        this.setAreaData(this.multipleComs)
      }
    },
    hoverCom(id) {
      this.hoveredComId = id
    },
    renamingCom(id) {
      this.renamingComId = id
    },
    moveCom({ id, moveType }) {
      const i = findComIndex(this.comps, id)
      if (moveType === MoveType.up) {
        if (i + 1 < this.comps.length) {
          this.comps.splice(i + 1, 0, ...this.comps.splice(i, 1))
        }
      } else if (moveType === MoveType.down) {
        if (i > 0) {
          this.comps.splice(i - 1, 0, ...this.comps.splice(i, 1))
        }
      } else if (moveType === MoveType.top) {
        if (i + 1 < this.comps.length) {
          this.comps.push(...this.comps.splice(i, 1))
        }
      } else if (moveType === MoveType.bottom) {
        if (i > 0) {
          this.comps.unshift(...this.comps.splice(i, 1))
        }
      }
      this.recordSnapshot()
    },
    setShapeSingleStyle({ key, value }) {
      if (!this.selectedCom) return
      this.selectedCom.attr[key] = value
    },
    // 载入全屏数据
    loadScreenData(screenData) {
      const { pageInfo, pageConfig, comps } = screenData
      this.pageInfo = pageInfo || { ...defaultInfo }
      this.pageConfig = pageConfig || { ...defaultPageCfg }
      this.comps = comps || []
      this.recordSnapshot()
    },
    // 设置screen size
    setScreenSize({ width, height }) {
      this.pageConfig.width = width
      this.pageConfig.height = height
    },
    // 请空画布
    clearScreen() {
      this.selectedCom = null
      this.hoveredComId = ''
      this.renamingCom = ''
      this.comps = []
      this.recordSnapshot()
    },
  },
}
