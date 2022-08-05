import { fetchData } from '@/api/request'
import ldb from '@/config/localforage-db'
import { findIndex, uuid, isEmpty, deepCopy } from '@/utils/util'

// 文件夹key
const FOLDER_KEY = 'DASHBOARD_FOLDER'
// 文件夹key
const LIST_KEY = 'DASHBOARD_LIST'
// 默认文件夹对象
const DEFAULT_FOLDER = {
  id: '1',
  text: '分析看板',
  parentId: '0',
  children: [{ id: '7f0000017da314fa817dbc02cbb800ea', text: '我的看板', parentId: '1', children: [] }],
}
// 默认list
const DEFAULT_LIST = [
  {
    id: '7f0000017de61662817e03c021cc0047',
    layout:
      '{"width":1920,"height":1080,"bgColor":"#0d2a42","bgImage":"https://wangbin3162.gitee.io/bin-files/background/bg6.png","grid":1,"thumbnail":""}',
    name: '测试看板',
    pid: '1',
    status: 'edit',
    components: [
      {
        componentContent:
          '{"id":"MainTitle_6941","name":"VMainTitle","alias":"通用标题","type":"com","locked":false,"hided":false,"attr":{"x":507,"y":277,"w":300,"h":48,"rotate":0,"opacity":1},"apiData":{},"events":{},"icon":"file-word","config":{"title":"我是标题数据","textStyle":{"fontFamily":"Microsoft Yahei","fontSize":24,"color":"#fff","fontWeight":"normal"},"textAlign":"center","writingMode":"horizontal-tb","backgroundStyle":{"show":false,"bgColor":"#008bff","borderRadius":15,"borderColor":"#fff","borderStyle":"solid","borderWidth":1},"ellipsis":false,"urlConfig":{"url":"","isBlank":false}}}',
        componentDataType: 'static',
        componentId: null,
        componentName: null,
        componentType: null,
        drill: [],
        filters: [],
        kanbanId: '7f0000017de61662817e03c021cc0047',
        limitNum: 0,
        modelId: '',
        name: '通用标题',
        x: [],
        y: [],
      },
    ],
  },
]

/**
 * 获取看板目录
 */
export async function getKanbanDir() {
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) return data
    await ldb.setItem(FOLDER_KEY, DEFAULT_FOLDER)
    return DEFAULT_FOLDER
  } catch (e) {
    return DEFAULT_FOLDER
  }
}

/**
 * 创建目录
 */
export async function createFolder(folder) {
  const newObj = { id: uuid(), parentId: folder.pid, text: folder.name, children: [] }
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) {
      // 存在表
      data.children.push(newObj)
      await ldb.setItem(FOLDER_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 修改目录
 */
export async function modifyFolder(folder) {
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) {
      // 存在表
      const index = findIndex(data.children, folder.id)
      data.children[index] = { ...data.children[index], text: folder.name }
      await ldb.setItem(FOLDER_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 移除文件夹
 */
export async function removeFolder(id) {
  try {
    const data = await ldb.getItem(FOLDER_KEY)
    if (data) {
      // 存在表
      const index = findIndex(data.children, id)
      data.children.splice(index, 1)
      await ldb.setItem(FOLDER_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 移除
 */
export async function removeKanban(id) {
  try {
    const data = await ldb.getItem(LIST_KEY)
    if (data) {
      // 存在表
      const index = findIndex(data, id)
      data.splice(index, 1)
      await ldb.setItem(LIST_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 获取分析看板列表
 */
export async function getDashboardList() {
  try {
    const data = await ldb.getItem(LIST_KEY)
    if (data) return { rows: data, total: data.length }
    await ldb.setItem(LIST_KEY, DEFAULT_LIST)
    return { rows: DEFAULT_LIST, total: DEFAULT_LIST.length }
  } catch (e) {
    return { rows: DEFAULT_LIST, total: DEFAULT_LIST.length }
  }
}

/**
 * 发布已保存的看板
 */
export async function publishKanban(id) {
  try {
    const data = await ldb.getItem(LIST_KEY)
    if (data) {
      const index = findIndex(data, id)
      data[index].status = 'audited'
      await ldb.setItem(LIST_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

/**
 * 保存分析看板
 * id: 当id为空时，创建看板，当id不为空时，更新看板
 * name: 看板名称
 */
export async function saveKanban({ id, name, pid, status, layout, components }) {
  try {
    const data = await ldb.getItem(LIST_KEY)
    if (data) {
      if (isEmpty(id)) {
        // 为空的时候新增
        const newId = uuid()
        data.push({
          id: newId,
          name,
          pid,
          status,
          layout,
          components,
        })
        await ldb.setItem(LIST_KEY, deepCopy(data))
        return newId
      } else {
        // 修改
        const index = findIndex(data, id)
        data[index] = { id, name, pid, status, layout, components }
        await ldb.setItem(LIST_KEY, deepCopy(data))
        return id
      }
    }
  } catch (e) {
    return false
  }
}

/**
 * 载入看板详情
 */
export async function loadKanban(id) {
  try {
    const data = await ldb.getItem(LIST_KEY)
    if (data) {
      const index = findIndex(data, id)
      return data[index]
    }
    return {}
  } catch (e) {
    return {}
  }
}

/**
 * 获取所有发布过的看板
 */
export function getPublishList(name) {
  return fetchData({
    url: '/analysis/kanban/publish/list',
    method: 'post',
    data: { name },
  })
}

/**
 * 查询模型数据
 */
export function getModelDataById({ modelId, x, y, filters }) {
  return fetchData({
    url: '/analysis/component/getdata',
    method: 'post',
    data: { modelId, x, y, filters },
  })
}

/**
 * 根据模型获取立方体数据
 */
export function getCubeById(id) {
  return fetchData({
    url: '/analysis/model/cubeById',
    method: 'post',
    data: { id },
  })
}
