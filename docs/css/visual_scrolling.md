# 视差滚动效果

## 是什么

视差滚动是指多层背景以不同的速度移动，形成立体的运动效果

## 实现方式

- background-attachment
- transform:translate3D

### background-attachment

视差滚动需要将 background-attachment 属性设置为 fixed，让背景相对于视口固定

```css
/* 核心代码 */
section {
  height: 100vh;
}

.g-img {
  background-image: url(...);
  background-attachment: fixed;
  background-size: cover;
  background-position: center center;
}
```

```html
<!-- 具体例子 -->
<div class="a-text">1</div>
<div class="a-img1">2</div>
<div class="a-text">3</div>
<div class="a-img2">4</div>
<div class="a-text">5</div>
<div class="a-img3">6</div>
<div class="a-text">7</div>
<style>
  div {
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    line-height: 100vh;
    text-align: center;
    font-size: 20vh;
  }

  .a-img1 {
    background-image: url(https://images.pexels.com/photos/1097491/pexels-photo-1097491.jpeg);
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }

  .a-img2 {
    background-image: url(https://images.pexels.com/photos/2437299/pexels-photo-2437299.jpeg);
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }

  .a-img3 {
    background-image: url(https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg);
    background-attachment: fixed;
    background-size: cover;
    background-position: center center;
  }
</style>
```

### transform:translate3D

- transform: css3 属性，可以对元素进行变换(2d/3d)，包括平移，旋转，缩放等等
- perspective: css3 属性，当元素涉及 3d 变换时，perspective 可以定义我们眼睛看到的 3d 立体效果

```html
<div id="app">
  <div class="one">one</div>
  <div class="two">two</div>
  <div class="three">three</div>
</div>
<style>
  html {
    overflow: hidden;
    height: 100%;
  }

  body {
    /* 视差元素的父级需要3D视角 */
    perspective: 1px;
    transform-style: preserve-3d;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  #app {
    width: 100vw;
    height: 200vh;
    background: skyblue;
    padding-top: 100px;
  }
  .one {
    width: 500px;
    height: 200px;
    background: #409eff;
    transform: translateZ(0px);
    margin-bottom: 50px;
  }
  .two {
    width: 500px;
    height: 200px;
    background: #67c23a;
    transform: translateZ(-1px);
    margin-bottom: 150px;
  }
  .three {
    width: 500px;
    height: 200px;
    background: #e6a23c;
    transform: translateZ(-2px);
    margin-bottom: 150px;
  }
</style>
```

这种方式实现视觉差动的原理：

- 容器设置上 transform-style: preserve-3d 和 perspective: xpx，那么处于这个容器的子元素就将位于 3D 空间中
- 子元素设置不同的 transform: translateZ()，这个时候，不同元素在 3D Z 轴方向距离屏幕（我们的眼睛）的距离也就不一样
- 滚动滚动条，由于子元素设置了不同的 transform: translateZ()，那么他们滚动的上下距离 translateY 相对屏幕（我们的眼睛），也是不一样的，这就达到了滚动视差的效果
