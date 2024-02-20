import axios from 'axios'

// 传入的是public重的路径地址
export async function requireJson(path) {
  try {
    const { data } = await axios.get(path)
    return data
  } catch (error) {
    return null
  }
}
