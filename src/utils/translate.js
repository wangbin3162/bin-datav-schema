// 角度转弧度
function angleToRadian(angle) {
  // Math.PI = 180 度
  return angle * Math.PI / 180
}

export function sin(rotate) {
  return Math.abs(Math.sin(angleToRadian(rotate)))
}

export function cos(rotate) {
  return Math.abs(Math.cos(angleToRadian(rotate)))
}
