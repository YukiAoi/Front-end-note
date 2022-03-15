## 盒模型

CSS 盒模型本质上是一个盒子，它包括：边距，边框，填充和实际内容。
CSS 中的盒模型包括IE盒模型和标准盒模型。

### 标准盒模型

`width` = `content`
`总宽度` = `width` + `padding` + `border` + `margin`

### IE盒模型

`width` = `content` + `padding` + `border`
`总宽度` = `width` + `margin`

## box-size属性

### content-box

宽度和高度分别应用到元素的内容框，在宽度和高度之外绘制元素的内边距和边框。`标准盒模型`

### border-box

为元素设定的宽度和高度决定了元素的边框盒 `IE盒模型`

### inherit

继承父元素的box-sizing值