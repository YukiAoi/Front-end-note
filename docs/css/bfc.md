# BFC

## 是什么

BFC，块级格式化上下文，它是页面中的一块渲染区域，并且有一套属于自己的渲染规则：

- 内部的盒子会在垂直方向上一个接一个的放置
- 对于同一个 BFC 的俩个相邻的盒子的垂直 margin 会发生重叠
- 每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
- BFC 的区域不会与 float 的元素区域重叠
- 计算 BFC 的高度时，浮动子元素也参与计算
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

BFC 目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

## 触发条件

- 根元素，即 HTML 元素
- 浮动元素，float 值为 left、right
- overflow 值为 auto、scroll、hidden
- display 的值为 inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
- position 的值为 absolute 或 fixed

## 应用场景

- 防止 margin 重叠
- 清除内部浮动
- 自适应多栏布局
