/*
 * Create by wb on 2020-10-12
 * 通用正则校验
  */

// 校验合法日期 满足yyyy-MM-dd HH:mm:ss、yyyyMMdd HH:mm:ss、yyyy-MM-dd HH:mm、yyyyMMdd HH:mm、yyyy-MM-dd和yyyyMMdd
export function isDate(str) {
  const reg = /^(([1-3][0-9]{3})[-]{0,1}(((0[13578]|1[02])[-]{0,1}(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)[-]{0,1}(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))\s\d{1,2}:\d{1,2}:\d{1,2})|(([1-3][0-9]{3})[-]{0,1}(((0[13578]|1[02])[-]{0,1}(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))\s\d{1,2}:\d{1,2})|(([1-3][0-9]{3})[-]{0,1}(((0[13578]|1[02])[-]{0,1}(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)[-]{0,1}(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))$/
  return reg.test(str)
}

// 校验路由路径path
export function isRoutePath(path) {
  const reg = /^(\/\w+)|(\/\w+\/\w+)$/
  return !reg.test(path)
}

// 匹配合法文件相对路径
export function isFilePath(str) {
  const reg = /^((\w+\/)*[a-zA-Z0-9+&%$#=~_-]+(\.\w+)*)$/
  return reg.test(str)
}

// 合法uri
export function isURL(textval) {
  const urlregex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

// 小写字母
export function isLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 大写字母
export function isUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// 大小写字母
export function isAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 是否带有小数
export function isDecimal(strValue) {
  const objRegExp = /^\d+\.\d+$/
  return objRegExp.test(strValue)
}

// 校验是否中文名称组成
export function isChinese(str) {
  const reg = /^[\u4E00-\u9FA5]{2,64}$/
  return reg.test(str)
}

// 校验是否中文名称带字母组成
export function isChineseAndLetter(str) {
  const reg = /^[\u4E00-\u9FA5,A-Za-z]{2,64}$/
  return reg.test(str)
}

// 匹配非中文编码
export function isNonChinese(str) {
  const reg = /^\w+$/
  return reg.test(str)
}

// 字母开头，字母数字下划线
export function isLetterW(str) {
  const reg = /^([a-zA-Z][a-zA-Z0-9_])|(0-9]+)*$/
  return reg.test(str)
}

// 中文、字母的字符串
export function isTitleNotStartNum(str) {
  const reg = /^[\u4E00-\u9FA5a-zA-Z]*$/
  return reg.test(str)
}

// 校验正整数
export function isInteger(str) {
  const reg = /^\d+$/
  return reg.test(str)
}

// 校验电话码格式
export function isTel(str) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[35874]\d{9}))$/
  return reg.test(str)
}

// 校验身份证号
export function isIdCard(str) {
  const aCity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '河南',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(str)) {
    return false
  }
  str = str.replace(/x$/i, 'a')
  if (aCity[parseInt(str.substr(0, 2))] == null) {
    return false
  }
  const sBirthday = str.substr(6, 4) + '-' + Number(str.substr(10, 2)) + '-' + Number(str.substr(12, 2))
  const d = new Date(sBirthday.replace(/-/g, '/'))
  if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
    return false
  }
  let iSum = 0
  for (let i = 17; i >= 0; i--) {
    iSum += (Math.pow(2, i) % 11) * parseInt(str.charAt(17 - i), 11)
  }
  return iSum % 11 === 1
}

// 校验一般密码格式：8-16位，同时包含字母和数字
export function isPassword(password) {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z_*~!@#$%,.^`+=]{8,16}$/
  return reg.test(password)
}

// 校验统一社会信用代码
export function isUnifiedCode(unifiedCode) {
  // begin2021-5-18增加登记管理部门+机构类别代码验证
  const REGIST_CODE = ['11', '12', '13', '19', '21', '29', '31', '32', '33', '34', '35', '39', '41', '49', '51', '52', '53', '59', '54', '61', '62', '69', '71', '72', '79', '81', '89', '91', '92', '93', 'A1', 'A9', 'N1', 'N2', 'N3', 'N9', 'Y1']
  if (!'00000000000000000X' === unifiedCode.toUpperCase() && REGIST_CODE.indexOf(unifiedCode.substring(0, 2)) <= -1) {
    return false
  }
  // end2021-5-18增加登记管理部门+机构类别代码验证
  if (!/^[0-9ABCDEFGHJKLMNPQRTUWXY]{18}$/.test(unifiedCode)) {
    return false
  }
  const CVAL = '0123456789ABCDEFGHJKLMNPQRTUWXY'
  const MD = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
  let sum = 0
  for (let i = 0; i < 17; i++) {
    const a = CVAL.indexOf(unifiedCode[i])
    if (a < 0) return false
    sum += a * MD[i]
  }
  sum %= 31
  const checkCode = CVAL[(31 - sum) % 31]
  return checkCode === unifiedCode[17]
}

// 校验统行政区划代码代码
export function isAreaCode(areaCode) {
  // 县级以上,前6位有意义，后6位为0
  const upCounty = areaCode.substring(0, 6)
  // 县级以下行政区划代码，由9位组成，后3位为0
  const belowCounty = areaCode.substring(0, 9)
  if (/^[1-8][1-7]\d{7}$/.test(belowCounty) || /^[1-8][1-7]\d{4}$/.test(upCounty)) {
    return false
  }
}

// 校验编码（GB/T 17710，MOD 11,10）
function checkCode(code) {
  code = String(code)
  let p = 10
  let s
  for (let i = 0; i < 15; i++) {
    s = (p % 11) + parseInt(code[i])
    p = (s % 10) * 2
    p === 0 && (p = 20)
  }
  return (s % 10 === 1)
}

// 校验工商注册号
export function isRegNo(regNo) {
  const regex = /^[0-9]{15}$/
  return (regex.test(regNo) && checkCode(regNo))
}

// 校验组织机构代码
export function isOrgNo(orgNo) {
  const CVAL = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const regex = /^[0-9A-Z]{8}-?[0-9X]$/
  const MD = [3, 7, 9, 10, 5, 8, 4, 2]
  const CC = '0123456789X0'

  // 编码校验
  function checkCode(code) {
    code = String(code)
    const str = code.replace('-', '')
    let sum = 0
    let a
    for (let i = 0; i < 8; i++) {
      a = CVAL.indexOf(str[i])
      sum += a * MD[i]
    }
    sum %= 11
    return CC[11 - sum] === str[8]
  }

  return regex.test(orgNo) && checkCode(orgNo)
}
