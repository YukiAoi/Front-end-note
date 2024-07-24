# css3 新增特性

## 选择器

- 层次选择器（p~ul），选择前面有 p 元素的每个 ul 元素
- 伪类选择器

```css
/* 表示一组同级元素中其类型的第一个元素 */
:first-of-type
/* 表示一组同级元素中其类型的最后一个元素 */
:last-of-type
/* 表示没有同类型兄弟元素的元素 */
:only-of-type
/* 表示没有任何兄弟的元素 */
:only-child
/* 根据元素在一组同级中的位置匹配元素 */
:nth-child(n)
/* 匹配给定类型的元素，基于它们在一组兄弟元素中的位置，从末尾开始计数 */
:nth-last-of-type(n)
/* 表示一组兄弟元素中的最后一个元素 */
:last-child
/* 设置HTML文档 */
:root
/* 指定空的元素 */
:empty
/* 选择可用元素 */
:enabled
/* 选择被禁用元素 */
:disabled
/* 选择选中的元素 */
:checked
/* 选择与 selector 不匹配的所有元素 */
:not(selector)
```

## 新样式

### 边框

- border-radius：圆角边框
- box-shadow：为元素添加阴影
- border-image：使用图片来绘制边框

### 背景

- background-clip：设定背景颜色或图片的覆盖范围
- background-origin：设定背景颜色或图片从哪里对齐
- background-size：用来调整背景图片的大小
- background-break：用来控制背景怎样在这些不同的盒子中显示

### 文字

- word-wrap：设置文字换行规则
- text-overflow：设置当前行超过指定容器的边界时如何显示
- text-shadow：向文本设置阴影
- text-decoration：设置对文字的更深层次的渲染

### 颜色

- rgba：rgb 为颜色值，a 为透明度
- hala：h 为色相，s 为饱和度，l 为亮度，a 为透明度

## transition 过渡

transition 属性可以被指定为一个或多个 CSS 属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：

1. 过度效果
2. 持续时间

```css
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
```

可以分开写各个属性

```css
transition-property: width;
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
```

## transform 变形

transform 可以旋转，缩放，倾斜或平移给定元素

```css
/* 位移 */
transform: translate(120px, 50%)
/* 缩放 */
transform: scale(2, 0.5)
/* 旋转 */
transform: rotate(0.5turn)
/* 倾斜 */
transform: skew(30deg, 20deg)
```

## animation 动画

属性：

- animation-name：动画名称
- animation-duration：动画持续时间
- animation-timing-function：动画时间函数
- animation-delay：动画延迟时间
- animation-iteration-count：动画执行次数，可以设置为一个整数，也可以设置为 infinite，意思是无限循环
- animation-direction：动画执行方向
- animation-paly-state：动画播放状态
- animation-fill-mode：动画填充模式

## 渐变

- linear-gradient：线性渐变
- radial-gradient：径向渐变

## 其他

- flex
- grid
- 媒体查询
- 混合模式
