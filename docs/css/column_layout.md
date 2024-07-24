# 两栏布局与三栏布局

## 两栏布局

以一个定宽栏和一个自适应的栏并排展示存在

实现方式：

- float
- flex

### float

1. 使用 float 左浮左边栏
2. 右边模块使用 margin-left 撑出内容块做内容展示
3. 为父级元素添加 BFC，防止下方元素飞到上方内容

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>
<style>
  .box {
    /* 添加BFC */
    overflow: hidden;
  }
  .left {
    float: left;
    width: 200px;
    background-color: gray;
    height: 400px;
  }
  .right {
    margin-left: 210px;
    background-color: lightgray;
    height: 200px;
  }
</style>
```

### flex

```html
<div class="box">
  <div class="left">左边</div>
  <div class="right">右边</div>
</div>
<style>
  .box {
    display: flex;
    /* 防止left和right等高，并使两个子元素顶部对齐 */
    align-items: flex-start;
  }
  .left {
    width: 100px;
  }
  .right {
    flex: 1;
  }
</style>
```

flex 容器的一个默认属性值:align-items: stretch;，会导致 left 和 right 等高。为了防止 left 和 right 等高，需要设置: align-items: flex-start

## 三栏布局

实现三栏布局中间自适应的布局方式有：

- 两边使用 float，中间使用 margin
- 两边使用 absolute，中间使用 margin
- 两边使用 float 和负 margin
- table 布局
- flex 布局
- grid 布局

### 两边使用 float，中间使用 margin

需要将中间的内容放在 html 结构最后，否则右侧会沉在中间内容的下方

```html
<div class="wrap">
  <div class="left">左侧</div>
  <div class="right">右侧</div>
  <div class="middle">中间</div>
</div>
<style>
  .wrap {
    background: #eee;
    overflow: hidden; /* 生成BFC，计算高度时考虑浮动的元素 */
    padding: 20px;
    height: 200px;
  }
  .left {
    width: 200px;
    height: 200px;
    float: left;
    background: coral;
  }
  .right {
    width: 120px;
    height: 200px;
    float: right;
    background: lightblue;
  }
  .middle {
    margin-left: 220px;
    height: 200px;
    background: lightpink;
    margin-right: 140px;
  }
</style>
```

这种实现方式存在缺陷：

- 主体内容是最后加载的
- 右边在主体内容之前，如果是响应式设计，不能简单的换行展示

### 两边使用 absolute，中间使用 margin

```html
<div class="container">
  <div class="left">左边固定宽度</div>
  <div class="right">右边固定宽度</div>
  <div class="main">中间自适应</div>
</div>
<style>
  .container {
    position: relative;
  }

  .left,
  .right,
  .main {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    background: green;
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    background: green;
  }

  .main {
    margin: 0 110px;
    background: black;
    color: white;
  }
</style>
```

### 两边使用 float 和负 margin

```html
<div class="main-wrapper">
  <div class="main">中间自适应</div>
</div>
<div class="left">左边固定宽度</div>
<div class="right">右边固定宽度</div>
<style>
  .left,
  .right,
  .main {
    height: 200px;
    line-height: 200px;
    text-align: center;
  }

  .main-wrapper {
    float: left;
    width: 100%;
  }

  .main {
    margin: 0 110px;
    background: black;
    color: white;
  }

  .left,
  .right {
    float: left;
    width: 100px;
    margin-left: -100%;
    background: green;
  }

  .right {
    margin-left: -100px; /* 同自身宽度 */
  }
</style>
```

缺点：

- 增加了 .main-wrapper 一层，结构变复杂
- 使用负 margin，调试相对麻烦

### table 布局

```html
<div class="container">
  <div class="left">左边固定宽度</div>
  <div class="main">中间自适应</div>
  <div class="right">右边固定宽度</div>
</div>
<style>
  .container {
    height: 200px;
    line-height: 200px;
    text-align: center;
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  .left,
  .right,
  .main {
    display: table-cell;
  }

  .left,
  .right {
    width: 100px;
    background: green;
  }

  .main {
    background: black;
    color: white;
    width: 100%;
  }
</style>
```

### flex 布局

```html
<div class="wrap">
  <div class="left">左侧</div>
  <div class="middle">中间</div>
  <div class="right">右侧</div>
</div>
<style>
  .wrap {
    display: flex;
    justify-content: space-between;
  }

  .left,
  .right,
  .middle {
    height: 100px;
  }

  .left {
    width: 200px;
    background: coral;
  }

  .right {
    width: 120px;
    background: lightblue;
  }

  .middle {
    background: #555;
    width: 100%;
    margin: 0 20px;
  }
</style>
```

### grid 布局

```html
<div class="wrap">
  <div class="left">左侧</div>
  <div class="middle">中间</div>
  <div class="right">右侧</div>
</div>
<style>
  .wrap {
    display: grid;
    width: 100%;
    grid-template-columns: 300px auto 300px;
  }

  .left,
  .right,
  .middle {
    height: 100px;
  }

  .left {
    background: coral;
  }

  .right {
    background: lightblue;
  }

  .middle {
    background: #555;
  }
</style>
```
