import service from './request'
import { getPublicPath } from '@/utils/env'
/**
 * 系统应用相关接口，例如获取应用初始信息、获取应用上下文等
 */

/**
 * 获取平台应用初始、基本信息（例如应用名称等）
 * @returns
 */
export async function getAppPlatformInfo() {
  const path = getPublicPath('/config.json')
  try {
    const { data } = await service({
      url: path,
      method: 'get',
    })
    if (data.platformName) return data
    else return { platformName: '大屏分析设计' }
  } catch (error) {
    return { platformName: '大屏分析设计' }
  }
  // return fetchData({
  //   url: '/form/app/api/platform',
  //   method: 'post',
  // })
}
