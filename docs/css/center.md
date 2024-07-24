# 水平垂直居中

## 实现方式

- 利用定位+margin:auto
- 利用定位+margin:负值
- 利用定位+transform
- table 布局
- flex 布局
- grid 布局

### 利用定位+margin:auto

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
  .father {
    width: 500px;
    height: 300px;
    border: 1px solid #0a3b98;
    position: relative;
  }
  .son {
    width: 100px;
    height: 40px;
    background: #f0a238;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
```

### 利用定位+margin:负值

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
  .father {
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -50px;
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
```

### 利用定位+transform

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
  .father {
    position: relative;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
```

### table 布局

设置父元素为 display:table-cell，子元素设置 display: inline-block。利用 vertical 和 text-align 可以让所有的行内块级元素水平垂直居中

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
  .father {
    display: table-cell;
    width: 200px;
    height: 200px;
    background: skyblue;
    vertical-align: middle;
    text-align: center;
  }
  .son {
    display: inline-block;
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
```

### flex 弹性布局

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
  .father {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
```

### grid 网格布局

```html
<div class="father">
  <div class="son"></div>
</div>
<style>
  .father {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background: skyblue;
  }
  .son {
    width: 10px;
    height: 10px;
    border: 1px solid red;
  }
</style>
```

## 总结

不知道元素宽高大小仍能实现水平垂直居中的方法有：

- 利用定位+margin:auto
- 利用定位+transform
- flex 布局
- grid 布局
