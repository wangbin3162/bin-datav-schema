export const isProd = process.env.NODE_ENV === 'production'

// 拼接publicPath
export function getPublicPath(path) {
  return isProd ? `${import.meta.env.VITE_PUBLIC_PATH}${path}` : path
}

// 获取images/下的图片路径
export function getImagesPath(imgPath) {
  return `${import.meta.env.VITE_PUBLIC_PATH}/images${imgPath}`
}

// 获取images/com 下的图片路径
export function getComPath(imgPath) {
  return getImagesPath(`/com/${imgPath}`)
}

// 拼接cdnPath
export function getCDNPath(path) {
  return `${import.meta.env.VITE_APP_CDN}${path}`
}
