## BFC

块级格式化上下文（Block Formatting Context），是CSS布局的一个概念，是一个独立的渲染区域，规定了内部box如何布局， 并且这个区域的子元素不会影响到外面的元素，其中比较重要的布局规则有内部 box 垂直放置，计算 BFC 的高度的时候，浮动元素也参与计算。

### 布局规则

1. 内部的Box会在`垂直方向`，一个接一个地放置
1. Box`垂直方向的距离由margin决定`。属于同一个BFC的两个相邻Box的margin会发生重叠
1. 每个元素的margin bo的左边， 与包含块border的左边相接触（对于从左往右的格式化，否则相反）
1. BFC的区域`不会与float box重叠`
1. BFC是一个独立容器，容器里面的`子元素不会影响到外面的元素`
1. 计算BFC的高度时，`浮动元素也参与计算高度`
1. 元素的类型和`display属性，决定了这个Box的类型`。不同类型的Box会参与不同的`Formatting Context`。

### 如何创建BFC

1. 根元素，即HTML元素
1. float的值不为none
1. position为absolute或fixed
1. display的值为inline-block、table-cell、table-caption
1. overflow的值不为visible

### 使用场景

1. 去除边距重叠现象
1. 清除浮动（让父元素的高度包含子浮动元素）
1. 避免某元素被浮动元素覆盖
1. 避免多列布局由于宽度计算四舍五入而自动换行