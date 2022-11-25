const positionTip = `可取关键字或具体数值: [top|left|bottom|right|center|%|em|px];
两个值：一个定义 x 坐标，另一个定义 y 坐标;`

const sizeTip = `cover: 保持宽高比例缩放，超出部分会被剪裁;
contain: 缩放背景图装入容器，容易会留白;
一个值: 这个值指定图片的宽度，图片的高度隐式的为 auto, 可取<百分比>|<数值>|auto;
两个个值: 第一个值指定图片的宽度，第二个值指定图片的高度, 可取<百分比>|<数值>|auto;`

const shadowTip = `插页 (阴影向内) | x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径;
可选，inset关键字，没有指定inset，默认阴影在边框外，即阴影向外扩散;
<offset-x> <offset-y>: 用来设置阴影偏移量;
<blur-radius>：模糊面积越大，阴影就越大越淡。不能为负值;
<spread-radius>：取正值时，阴影扩大；取负值时，阴影收缩;`

const borderSliceTip = `图像切片，会将图像切分为9个区域：四个角、四个边（edges）以及中心区域;
四条切片线，从它们各自的侧面设置给定距离，控制区域的大小。
区域 1-4 为角区域（corner region）。每一个都被用于组成最终边框图像的四个角;
区域 5-8 边区域（edge region）。在最终的边框图像中重复、缩放或修改它们以匹配元素的大小;
区域 9 为中心区域（middle region）。它在默认情况下会被丢弃，但如果设置了关键字 fill，则会将其用作元素的背景图像。;
四个值: 作用到 上方、右方、下方和左方;取值：<百分比>|<数值>;
可选值 fill 可放在上面声明的值的末尾;`

const borderOutsetTip = `边框图像在四个方向超出边框盒的<length>或<number>数量;
一个值: 作用到 四个方向 ;
两个值: 作用到 垂直方向 和 水平方向;
三个值: 作用到 上方、水平方向、和下方;
四个值: 作用到 上方、右方、下方和左方;`

const borderWidthTip = `取值：<百分比>|<数值>|auto 不能为负值，类比padding,margin取值;
一个值: 作用到 四个方向 ;
两个值: 作用到 垂直方向 和 水平方向;
三个值: 作用到 上方、水平方向、和下方;
四个值: 作用到 上方、右方、下方和左方;`

const borderRepeatTip = `stretch: 拉伸图片以填充边框;
repeat: 平铺图片以填充边框;
round: 平铺图像。当不能整数次平铺时，根据情况放大或缩小图像。;
space: 平铺图像。当不能整数次平铺时，会用空白间隙填充在图像周围（不会放大或缩小图像）;`

export {
  positionTip,
  sizeTip,
  shadowTip,
  borderSliceTip,
  borderOutsetTip,
  borderWidthTip,
  borderRepeatTip,
}
