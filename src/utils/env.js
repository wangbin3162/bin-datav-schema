const isProd = process.env.NODE_ENV === 'production'

// 拼接publicPath
export function getPublicPath(path) {
  return isProd ? `${import.meta.env.VITE_PUBLIC_PATH}${path}` : path
}

// 获取images/下的图片路径
export function getImagesPath(imgName, folder) {
  return getPublicPath(`/images/${folder ? folder + '/' : ''}${imgName}`)
}

// 获取images/bg 下的图片路径
export function getBgPath(imgName) {
  return getImagesPath(imgName, 'bg')
}

// 获取images/com 下的图片路径
export function getComPath(imgName) {
  return getImagesPath(imgName, 'com')
}

// 获取images/box 下的图片路径
export function getBoxPath(imgName) {
  return getImagesPath(imgName, 'box')
}

// 获取images/decoration 下的图片路径
export function getDecorationPath(imgName) {
  return getImagesPath(imgName, 'decoration')
}


// 拼接cdnPath
export function getCDNPath(path) {
  return `${import.meta.env.VITE_APP_CDN}${path}`
}
