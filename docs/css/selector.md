# 选择器

## 有哪些

- id 选择器（#box），选择 id 为 box 的元素
- 类选择器（.one），选择类名为 one 的所有元素
- 标签选择器（div），选择标签为 div 的所有元素
- 后代选择器（#box div），选择 id 为 box 元素内部所有的 div 元素
- 子选择器（.one>one_1），选择父元素为.one 的所有.one_1 的元素
- 相邻同胞选择器（.one+.two），选择紧接在.one 之后的所有.two 元素
- 群组选择器（div,p），选择 div、p 的所有元素
- 伪类选择器

```css
/* 选择未被访问的链接 */
:link
/* 选取已被访问的链接 */
:visited
/* 选择活动链接 */
:active
/* 鼠标指针浮动在上面的元素 */
:hover
/* 选择具有焦点的 */
:focus
/* 父元素的首个子元素 */
:first-child
```

- 伪元素选择器

```css
/* 用于选取指定选择器的首字母 */
:first-letter
/* 选取指定选择器的首行 */
:first-line
/* 选择器在被选元素的内容前面插入内容 */
:before
/* 选择器在被选元素的内容后面插入内容 */
:after
```

- 属性选择器

```css
/* 选择带有attribute属性的元素 */
[attribute]
/* 选择所有使用attribute=value的元素 */
[attribute=value]
/* 选择attribute属性包含value的元素 */
[attribute~=value]
/* 选择attribute属性以value开头的元素 */
[attribute|=value]
```

### css3 新增的选择器

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

- 属性选择器

```css
/* 选择attribute属性值包含value的所有元素 */
[attribute*=value]
/* 选择attribute属性开头为value的所有元素 */
[attribute^=value]
/* 选择attribute属性结尾为value的所有元素 */
[attribute$=value]
```

## 优先级

内联 > ID 选择器 > 类选择器 > 标签选择器

比较规则：

- 从左往右依次进行比较 ，较大者优先级更高
- 如果相等，则继续往右移动一位进行比较
- 如果 4 位全部相等，则后面的会覆盖前面的

## 继承属性

### 字体系列属性

```css
/* 组合字体 */
font
/* 规定元素的字体系列 */
font-family
/* 设置字体的粗细 */
font-weight
/* 设置字体的尺寸 */
font-size
/* 定义字体的风格 */
font-style
/* 偏大或偏小的字体 */
font-variant
```

### 文本系列属性

```css
/* 文本缩进 */
text-indent
/* 文本水平对齐 */
text-align
/* 行高 */
line-height
/* 增加或减少单词间的空白 */
word-spacing
/* 增加或减少字符间的空白 */
letter-spacing
/* 控制文本大小写 */
text-transform
/* 规定文本的书写方向 */
direction
/* 文本颜色 */
color
```

### 元素可见性

```css
visibility
```

### 表格布局属性

```css
/* 定位表格标题位置 */
caption-side
/* 合并表格边框 */
border-collapse
/* 设置相邻单元格的边框间的距离 */
border-spacing
/* 单元格的边框的出现与消失 */
empty-cells
/* 表格的宽度由什么决定 */
table-layout
```

### 列表属性

```css
/* 文字前面的小点点样式 */
list-style-type
/* 小点点位置 */
list-style-position
/* 以上的属性可通过这属性集合 */
list-style
```

### 引用

```css
/* 设置嵌套引用的引号类型 */
quotes
```

### 光标属性

```css
/* 箭头可以变成需要的形状 */
cursor
```

## 不能继承的属性

- display
- 文本属性：vertical-align、text-decoration
- 盒子模型的属性：宽度、高度、内外边距、边框等
- 背景属性：背景图片、颜色、位置等
- 定位属性：浮动、清除浮动、定位 position 等
- 生成内容属性：content、counter-reset、counter-increment
- 轮廓样式属性：outline-style、outline-width、outline-color、outline
- 页面样式属性：size、page-break-before、page-break-after
