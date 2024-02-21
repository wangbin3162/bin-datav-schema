// 数据分析模板操作
import { deepCopy, findIndex, isEmpty } from '@/utils/util'
import ldb from '@/config/localforage-db'
import dayjs from 'dayjs'
import axios from 'axios'
import { getPublicPath } from '@/utils/env'
import { fetchData } from '@/api/request'

const TEMPLATES_KEY = 'TPL_LIST'

// 保存为模板数据
export async function saveTemplate(tpl) {
  try {
    const data = await ldb.getItem(TEMPLATES_KEY)
    if (data) {
      const tmp = JSON.parse(tpl.content)
      data.push(tmp)
      await ldb.setItem(TEMPLATES_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

// 载入模板数据
export async function loadTemplate(id) {
  try {
    // 请求一个json
    const path = getPublicPath(`/data/template/${id}.json`)
    const res = await axios.get(path)
    const v = res.data
    return {
      id: v.template.id,
      name: v.template.name,
      content: JSON.stringify(v),
    }
  } catch (e) {
    // console.log(e)
    const data = await ldb.getItem(TEMPLATES_KEY)
    if (data) {
      // 存在表
      const index = data.findIndex(i => i.template.id === id)
      if (index > -1) {
        const v = data[index]
        return {
          id: v.template.id,
          name: v.template.name,
          content: JSON.stringify(v),
        }
      }
    }
    return null
  }
}

// 移除模板数据
export async function removeTemplate(id) {
  try {
    const data = await ldb.getItem(TEMPLATES_KEY)
    if (data) {
      // 存在表
      const index = data.findIndex(i => i.id === id)
      data.splice(index, 1)
      await ldb.setItem(TEMPLATES_KEY, data)
    }
    return true
  } catch (e) {
    return false
  }
}

// 获取模板列表
export async function getTemplateList(query) {
  try {
    const data = await ldb.getItem(TEMPLATES_KEY)
    if (data) {
      return {
        rows: data.map(v => ({
          id: v.id,
          name: v.name,
          content: JSON.stringify(v),
        })),
        total: data.length,
      }
    }
    const path = getPublicPath('/data/template/temp_list.json')
    const res = await axios.get(path)
    const list = res.data
    await ldb.setItem(TEMPLATES_KEY, list)
    return {
      rows: list.map(v => ({
        id: v.id,
        name: v.name,
        content: JSON.stringify(v),
      })),
      total: list.length,
    }
  } catch (e) {
    console.log(e)
    return { rows: [], total: 0 }
  }
}
