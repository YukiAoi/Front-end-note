## 常见问题

### 水平垂直居中

#### 水平居中

1. 行内元素：`text-align: center`
2. 确定宽度的块级元素
```css
/* width和margin实现 */
.a{
  margin: 0 auto
}
/* 绝对定位和margin-left */
.father{
  position: relative
}
.child{
  margin-left: (父width - 子width）/2
}
```
3. 宽度未知的块级元素
```css
/* table标签配合margin左右auto实现水平居中 */
table{
  margin:auto;
}
/* 或者修改display为table */
.a{
  display:table;
  margin:auto;
}
/* inline-block加text-align:center */
.a{
  display:inline-block;
  text-align:center;
}
/* 绝对定位加translate */
.a{
  position:absolute;
  translate:50% 0;
}
/* flex布局 */
.a{
  display:flex;
  justify-content:center;
}
```

#### 垂直居中

1. 单行文字：`line-height` = `height`
2. 相对定位加绝对定位
```css
.father{
  position:relative;
}
.child{
  position:absolute;
  margin:auto;
}
/* 或者子级使用translate */
.child{
  position:absolute;
  translate:50% 0;
}
```
3. flex加margin
```css
.father{
  display:flex;
}
.child{
  margin:auto;
}
```
4. table布局
```css
/* vertical-align: middle使用的前提条件是内联元素以及display值为table-cell的元素 */
.father{
  display:table;
}
.child{
  vertical-align:middle
}
```

### 隐藏

1. `opacity：0` 该元素隐藏起来了，但不会改变页面布局。如果该元素已经绑定一些事件，如click事件，那么点击该区域，也能触发点击事件
2. `visibility：hidden` 该元素隐藏起来了，但不会改变页面布局，但是不会触发该元素已 经绑定的事件，在文档布局中仍保留原来的空间（重绘）
3. `display：none` 该元素在页面中不存在，并且会改变页面布局，在文档布局中不再分配空间（回流+重绘）

### 三角符号

```css
div:after{
  position: absolute;
  width: 0px;
  height: 0px;
  content: " ";
  border-right: 100px solid transparent;
  border-top: 100px solid #ff0;
  border-left: 100px solid transparent;
  border-bottom: 100px solid transparent;
}
```

### 清除浮动

1. 添加额外标签

```html
<div class="parent">
    <!-- 添加额外标签并且添加clear属性 -->
    <div style="clear:both"></div>
    <!-- 也可以加一个br标签 -->
</div>
```

2. 父级添加overflow属性，或者设置高度
3. 建立伪类选择器清除浮动

```css
.parent:after{
  /* 设置添加子元素的内容是空 */
  content: '';
  /* 设置添加子元素为块级元素 */
  display: block;
  /* 设置添加的子元素的高度0 */
  height: 0;
  /* 设置添加子元素看不见 */
  visibility: hidden;
  /* 设置clear：both */
  clear: both;
}
```

### flex:1

1. flex:1 === flex:1(flex-grow) 1(flex-shrink) 0(flex-basis)
1. flex-grow：放大比例，默认为0，即有空间也不会放大
1. flex-shrink：缩小比例，默认为1，即空间不足会缩小
1. flex-basis：分配多余空间之前，会占据的主轴空间，默认auto，即本身的大小

## 伪类伪元素区别

1. 伪类是`:`，伪元素是`::`
2. 是否需要添加新元素才能达成目的，是的话就是伪元素，不是的话就是伪类

### 拖动窗口保持正方形

1. 使用vh
```css
  .a{
    width:100%;
    height:100vh;
  }
```
2. 使用垂直方向的padding
```css
.a{
  width:100%;
  height:0;
  padding-bottom:100%;
}
```
3. 使用伪元素的margin-top
```css
.a{
  width:100%;
  <!-- BFC问题，清除浮动 -->
  overflow:hidden;
}
.a:after{
  content:'';
  margin-top:100%;
  display:block:
}
```