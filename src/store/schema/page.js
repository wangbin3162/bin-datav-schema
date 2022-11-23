import { MoveType } from '@/config/enum'
import { deepCopy, generateId, isEmpty } from '@/utils/util'

const findComIndex = (comps, id) => comps.findIndex(c => c.id === id)

const findCom = (comps, id) => comps.find(c => c.id === id)

// 模拟后端复制
export const getNewCopyCom = com => {
  const ncom = deepCopy(com)
  ncom.id = `${ncom.name}_${generateId()}`

  if (!isEmpty(ncom.apiData)) {
    ncom.apiData.id = `api_${generateId()}`
    ncom.apiData.comId = ncom.id
  }

  // 需要判断当前复制的内容是否是组合
  if (ncom.name === 'Group') {
    // 如果要组合的组件中，已经存在组合数据，需要更新一下子子元素的id
    ncom.components.forEach(component => {
      component.id = `${component.name}_${generateId()}` // 新生成id

      if (!isEmpty(component.apiData)) {
        component.apiData.id = `api_${generateId()}`
        component.apiData.comId = component.id
      }
    })
  }

  return ncom
}

export const defaultInfo = {
  pid: '1',
  id: '',
  name: '',
}

export const defaultPageCfg = {
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
    selectedComIds: [], // 多选选中的ids
    hoveredComId: '', // 悬停的组件缓存，保存的内容为id
    renamingComId: '', // 重命名的id
  },
  getters: {
    // 是否是多选模式
    isMultiSelect() {
      return this.selectedComIds.length > 1 // 判定选中ids数组大于1则为多选模式
    },
    // 多选选中的组件列表（有顺序的）
    selectedComs() {
      return this.comps.filter(com => this.selectedComIds.includes(com.id))
    },
    // 当前选中的组件是不是group组
    curComIsGroup() {
      return this.selectedCom && this.selectedCom.name === 'Group'
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
      if (!ocom) return
      let ncom = getNewCopyCom(ocom)
      ncom.alias += '_copy'
      // 如果复制成功之后则偏移一点位置
      if (ncom) {
        ncom.attr.x += 50
        ncom.attr.y += 50
        this.comps.push(ncom)
      }
    },
    // 复制多个组件
    copyComs(coms) {
      coms.forEach(item => this.copyCom(item.id))
      this.recordSnapshot()
    },
    // 移除一个组件并清空选中，且记录操作
    deleteCom(id) {
      this.removeCom(id)
      this.selectedCom = null
      this.recordSnapshot()
    },
    // 替换一个组件
    replaceCom(id, data) {
      this.comps.splice(findComIndex(this.comps, id), 1, data)
      this.selectedCom = data
      this.recordSnapshot()
    },
    batchDeleteComs(deleteData) {
      deleteData.forEach(component => {
        this.comps.splice(findComIndex(this.comps, component.id), 1)
      })
    },
    // 仅仅移除一个组件（不记录操作和选中)
    removeCom(id) {
      this.comps.splice(findComIndex(this.comps, id), 1)
    },
    // 移除当前选中的组件（并清空选中）
    deleteSeletedCom() {
      this.removeCom(this.selectedCom.id)
      this.selectedCom = null
    },
    selectCom(component) {
      if (!component) {
        this.selectedCom = null
        this.selectedComIds = []
        return
      }
      this.selectedCom = component
      // 判断当前点击的时候有没有按下shift，如果按下了之后就追加，否则的话就只更新一个选项
      if (this.shortcuts.shiftKey) {
        // 判断是否包含当前组件，如没有再新增
        const i = this.selectedComIds.findIndex(id => id === component.id)
        if (i === -1) {
          this.selectedComIds.push(component.id)
        } else {
          this.selectedComIds.splice(i, 1)
          // 判断剩余几个，如剩余一个则设置为单选，
          if (this.selectedComIds.length === 1) {
            this.areaData.showArea = false
            this.selectedCom = findCom(this.comps, this.selectedComIds[0])
          }
        }
      } else {
        // 如果是单选模式则需要隐藏上次的多选区域
        this.areaData.showArea = false
        this.selectedComIds = [component.id]
      }
      // 判断多选后，需要设置areaData多选区域
      if (this.isMultiSelect) {
        this.setAreaData(this.selectedComs)
      }
    },
    multiSelectComs(components) {
      this.selectedComIds = components.map(i => i.id)
      this.setAreaData(components)
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
