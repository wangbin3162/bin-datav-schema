const SORT_FUN = {
  ASC: '升序',
  DESC: '降序',
}
const AGGREGATOR_FUN = {
  SUM: '求和',
  MAX: '最大值',
  MIN: '最小值',
  AVG: '平均数',
  COUNT: '计数',
  COUNTD: '去重计数',
}
const NODE_TYPE = {
  root: '根',
  folder: '文件夹',
  hierarchy: '层级',
  attribute: '属性',
}
const FIELD_TYPE = {
  D: '维度',
  M: '度量',
}
const DATA_TYPE = {
  NUMBER: '数字',
  STRING: '文本',
  DATE: '日期',
}
const COMPLEX_OPERATOR = {
  OR: '或条件',
  AND: '且条件',
}
const FILTER_STR_FUN = {
  IS_NULL: '为空',
  CONTAIN: '包含',
  NOT_CONTAIN: '不包含',
  NE: '不匹配',
  START_WITH: '开头是',
  EQ: '精确匹配',
  NOT_NULL: '不为空',
  NOT_EMPTY: '非空文本',
  END_WITH: '结尾是',
  IS_EMPTY: '空文本',
}
const FILTER_NUM_FUN = {
  NE: '≠ (不等于)',
  LT: '< (小于)',
  GTE: '>= (大于等于)',
  LTE: '<= (小于等于)',
  EQ: '= (等于)',
  GT: '> (大于)',
}
const FILTER_DATE_FUN = {
  START_WITH: '开始于',
  EQ: '精确匹配',
  END_WITH: '结束于',
}

const DATA_TYPE_FILTER = {
  NUMBER: FILTER_NUM_FUN,
  STRING: FILTER_STR_FUN,
  DATE: FILTER_DATE_FUN,
}
export {
  SORT_FUN,
  AGGREGATOR_FUN,
  NODE_TYPE,
  FIELD_TYPE,
  DATA_TYPE,
  FILTER_STR_FUN,
  FILTER_NUM_FUN,
  FILTER_DATE_FUN,
  COMPLEX_OPERATOR,
  DATA_TYPE_FILTER,
}
