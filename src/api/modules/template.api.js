// 数据分析模板操作
import { deepCopy, isEmpty } from '@/utils/util'
import ldb from '@/config/localforage-db'
import dayjs from 'dayjs'
import axios from 'axios'
import { getPublicPath } from '@/utils/env'
import { fetchData } from '@/api/request'

const TEMPLATES_KEY = 'templates_list'

// 保存为模板数据
export function saveTemplate(data) {
  return fetchData({
    url: '/analysis/kanban/tpl/save',
    method: 'post',
    data,
  })
}

// 载入模板数据
export function loadTemplate(id) {
  return fetchData({
    url: '/analysis/kanban/tpl/detail',
    method: 'post',
    data: { id },
  })
}

// 移除模板数据
export function removeTemplate(id) {
  return fetchData({
    url: '/analysis/kanban/tpl/remove',
    method: 'post',
    data: { id },
  })
}

// 获取模板列表
export function getTemplateList(query) {
  return fetchData({
    url: '/analysis/kanban/tpl/search',
    method: 'post',
    data: {
      name: '',
      page: 1,
      size: 50,
      ...query,
    },
  })
}

// 保存模板值模板列表
async function saveTemp2List(id, name, pageConfig) {
  try {
    const { data: list } = await getTemplateList()
    const index = list.findIndex(i => i.id === id)
    const item = {
      id,
      name,
      pageConfig,
      updateDate: dayjs().format('YYYY/MM/DD HH:mm:ss'),
    }
    if (index > -1) {
      list.splice(index, 1, item)
    } else {
      list.push(item)
    }
    // 再保存list
    return await ldb.setItem(TEMPLATES_KEY, deepCopy(list))
  } catch (e) {
    console.log('save mock screen data fail.')
    return []
  }
}
