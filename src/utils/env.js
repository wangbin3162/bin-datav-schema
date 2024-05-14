export const IS_PROD = process.env.NODE_ENV === 'production'

export const IS_DEV = !IS_PROD

export const PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH

// 拼接publicPath
export function getPublicPath(path) {
  return `${PUBLIC_PATH}${path}`
}

// 获取images/下的图片路径
export function getImagesPath(imgPath) {
  return `${PUBLIC_PATH}/images${imgPath}`
}

// 获取images/下的图片路径
export function getTopoPath(imgPath) {
  return `${PUBLIC_PATH}/topology${imgPath}`
}

// 获取images/com 下的图片路径
export function getComPath(imgPath) {
  return getImagesPath(`/coms/${imgPath}`)
}

// 拼接cdnPath
export function getCDNPath(path) {
  return `${import.meta.env.VITE_APP_CDN}${path}`
}
