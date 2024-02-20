export const BlendModeOptions = [
  { label: '正常', value: 'normal' }, // 正常 normal：默认值，元素呈现正常的颜色。
  { label: '正片叠底', value: 'multiply' }, // 正片叠底 multiply：将元素颜色与背景颜色相乘，产生较暗的颜色混合效果。
  { label: '叠加', value: 'overlay' }, // 叠加 overlay：在使用 multiply 和 screen 的基础上，根据背景颜色和元素颜色的亮度来决定混合程度。
  { label: '滤色', value: 'screen' }, // 滤色 screen：将元素颜色与背景颜色相加，产生较亮的颜色混合效果。
  { label: '变暗', value: 'darken' }, // 变暗 darken：将元素颜色与背景颜色进行比较，选取较暗的颜色作为最终颜色。
  { label: '变亮', value: 'lighten' }, // 变亮 lighten：将元素颜色与背景颜色进行比较，选取较亮的颜色作为最终颜色。
  { label: '颜色减淡', value: 'color-dodge' }, // 颜色减淡 color-dodge：根据元素颜色和背景颜色的比例，调整最终颜色的亮度和饱和度，使得颜色变得更亮。
  { label: '颜色加深', value: 'color-burn' }, // 颜色加深 color-burn：根据元素颜色和背景颜色的比例，调整最终颜色的亮度和饱和度，使得颜色变得更暗。
  { label: '强光', value: 'hard-light' },
  { label: '柔光', value: 'soft-light' },
  { label: '差值', value: 'difference' },
  { label: '排除', value: 'exclusion' },
  { label: '色相', value: 'hue' },
  { label: '饱和度', value: 'saturation' },
  { label: '颜色', value: 'color' },
  { label: '亮度', value: 'luminosity' },
]

export const FormatterOptions = [
  { value: '{b}', label: '数据名' },
  { value: '{c}', label: '数据值' },
  { value: '{d}', label: '百分比' },
  { value: '{b}:{d}', label: '列名:百分比' },
  { value: '{b}:{c} {d}', label: '全量显示' },
]

export const FontFamilyOptions = [
  { value: 'Microsoft Yahei', label: '微软雅黑' },
  { value: 'SimSun', label: '宋体' },
  { value: 'SimHei', label: '黑体' },
  { value: 'YouYuan', label: '幼圆' },
  { value: 'YouSheBiaoTiHei', label: '斜体标题' },
  { value: 'Orbitron-Bold', label: '数字加粗' },
  { value: 'LiSu', label: '隶书' },
  { value: 'tahoma', label: 'tahoma' },
  { value: 'arial', label: 'arial' },
  { value: 'sans-serif', label: 'sans-serif' },
]

export const FontWeightOptions = [
  { value: 'lighter', label: '细' },
  { value: 'normal', label: '正常' },
  { value: 'bolder', label: '粗' },
]

export const HAlignOptions = [
  { value: 'left', label: '左对齐' },
  { value: 'center', label: '居中对齐' },
  { value: 'right', label: '右对齐' },
]

export const VAlignOptions = [
  { value: 'top', label: '顶部对齐' },
  { value: 'middle', label: '居中对齐' },
  { value: 'bottom', label: '底部对齐' },
]

export const WritingModeOptions = [
  { value: 'horizontal-tb', label: '水平' },
  { value: 'vertical-rl', label: '垂直' },
]

export const JustifyContentOptions = [
  { value: 'flex-start', label: '左对齐' },
  { value: 'center', label: '居中对齐' },
  { value: 'flex-end', label: '右对齐' },
]

export const ArrangementOptions = [
  { value: 'top', label: '标题在上' },
  { value: 'left', label: '标题在左' },
  { value: 'bottom', label: '标题在下' },
]

export const AlignOptions = [
  { value: 'flex-start', label: '上对齐' },
  { value: 'center', label: '居中对齐' },
  { value: 'flex-end', label: '下对齐' },
]

export const TitleLocationOptions = [
  { value: 'start', label: '开头' },
  { value: 'center', label: '中间' },
  { value: 'end', label: '末尾' },
]

export const AxisPointerOptions = [
  { value: 'line', label: '直线指示器' },
  { value: 'shadow', label: '阴影指示器' },
  { value: 'none', label: '无指示器' },
  { value: 'cross', label: ' 十字准星指示器' },
]

export const LineStyleOptions = [
  { value: 'solid', label: '实线' },
  { value: 'dashed', label: '虚线' },
  { value: 'dotted', label: '点' },
]

export const FillTypeOptions = [
  { value: 'solid', label: '实体填充' },
  { value: 'gradient', label: '渐变填充' },
]

export const RepeatTypeOptions = [
  { value: 'no-repeat', label: '不重复，拉伸满' },
  { value: 'auto', label: '不重复，默认尺寸' },
  { value: 'repeat', label: '水平和垂直重复' },
  { value: 'repeat-x', label: '水平重复' },
  { value: 'repeat-y', label: '垂直重复' },
]

export const EchartsLabelPositionOptions = [
  { value: 'top', label: '顶部' },
  { value: 'left', label: '左侧' },
  { value: 'right', label: '右侧' },
  { value: 'bottom', label: '底部' },
  { value: 'inside', label: '内部' },
  { value: 'insideLeft', label: '内-左侧' },
  { value: 'insideRight', label: '内-右侧' },
  { value: 'insideTop', label: '内-顶部' },
  { value: 'insideBottom', label: '内-底部' },
  { value: 'insideTopLeft', label: '内-顶部居左' },
  { value: 'insideTopRight', label: '内-顶部居右' },
  { value: 'insideBottomLeft', label: '内-底部居左' },
  { value: 'insideBottomRight', label: '内-底部居右' },
]

export const PieLabelPositionOptions = [
  { value: 'outside', label: '扇区外侧' },
  { value: 'inside', label: '扇区内部' },
  { value: 'center', label: '中心' },
]

export const OrientsOptions = [
  { value: 'horizontal', label: '水平' },
  { value: 'vertical', label: '垂直' },
]

export const LegendIconOptions = [
  { value: 'auto', label: '自适应' },
  { value: 'circle', label: '圆形' },
  { value: 'rect', label: '矩形' },
  { value: 'roundRect', label: '圆角矩形' },
  { value: 'triangle', label: '三角形' },
  { value: 'diamond', label: '菱形' },
  { value: 'arrow', label: '箭头' },
]

export const ImageTypeOptions = [
  { value: 'bitmap', label: '位图' },
  { value: 'vector', label: '矢量图' },
]

export const CloudShapeOptions = [
  { value: 'circle', label: '圆形' },
  { value: 'cardioid', label: '心形' },
  { value: 'diamond', label: '菱形' },
  { value: 'triangle-forward', label: '侧三角形' },
  { value: 'triangle', label: '三角形' },
  { value: 'pentagon', label: '五边形' },
  { value: 'star', label: '星形' },
]

export const SortTypeOptions = [
  { value: 'ascending', label: '正三角' },
  { value: 'descending', label: '倒三角' },
]

export const OverflowTypeOptions = [
  { value: 'truncate', label: '截断' },
  { value: 'break', label: '换行' },
  { value: 'breakAll', label: '强制换行' },
]

// 回归方式
export const LineEcStatOptions = [
  { value: 'linear', label: '线性回归' },
  { value: 'exponential', label: '指数回归' },
  { value: 'logarithmic', label: '对数回归' },
  { value: 'polynomial', label: '多项式回归' },
]

// 指针类型
export const PointerIconsOptions = [
  { value: 'auto', label: '自适应' },
  { value: 'circle', label: '圆形' },
  { value: 'rect', label: '矩形' },
  { value: 'roundRect', label: '圆角矩形' },
  { value: 'triangle', label: '三矩形' },
  { value: 'diamond', label: '菱形' },
  { value: 'arrow', label: '箭头' },
  { value: 'pin', label: '钉' },
]

// 吸附位置
export const PositionOptions = [
  { value: 'align-to-top', label: '移至顶部' },
  { value: 'align-to-center', label: '垂直居中' },
  { value: 'align-to-bottom', label: '移至底部' },
  { value: 'align-to-left', label: '移至左侧' },
  { value: 'align-to-middle', label: '水平居中' },
  { value: 'align-to-right', label: '移至右侧' },
]

// 多选对齐设置
export const MultiplAlignOptions = [
  { value: 'align-top', label: '顶对齐' },
  { value: 'align-center', label: '垂直居中对齐' },
  { value: 'align-bottom', label: '底对齐' },
  { value: 'align-left', label: '左对齐' },
  { value: 'align-middle', label: '水平居中对齐' },
  { value: 'align-right', label: '右对齐' },
]

// 日期类型
export const DateTypeOptions = [
  { value: 'year', label: '年份' },
  { value: 'month', label: '月份' },
  { value: 'date', label: '日期' },
]
