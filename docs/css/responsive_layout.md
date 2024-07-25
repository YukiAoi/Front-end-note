# 响应式设计

## 是什么

页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

响应式网站常见特点：

- 同时适配 PC + 平板 + 手机等
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航
- 网站的布局会根据视口来调整模块的大小和位置

## 实现方式

响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理，为了处理移动端，页面头部必须有 meta 声明 viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no”>
```

- width=device-width：自适应手机屏幕的尺寸宽度
- maximum-scale：缩放比例的最大值
- inital-scale：缩放的初始化
- user-scalable：用户的可以缩放的操作

实现响应式布局的方式有：

- 媒体查询
- 百分比
- vw/vh
- rem

### 媒体查询

使用@Media 查询，可以针对不同的媒体类型定义不同的样式：

```css
@media screen and (max-width: 1920px) {
  /* .... */
}
```

视口在 375px - 600px 之间，设置特定字体大小 18px

```css
@media screen (min-width: 375px) and (max-width: 600px) {
  body {
    font-size: 18px;
  }
}
```

### 百分比

height、width 属性的百分比依托于父标签的宽高，但是其他盒子属性则不完全依赖父元素：

- 子元素的 top/left 和 bottom/right 如果设置百分比，则相对于直接非 static 定位(默认定位)的父元素的高度/宽度
- 子元素的 padding 如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的 width，而与父元素的 height 无关
- 子元素的 margin 如果设置成百分比，不论是垂直方向还是水平方向，都相对于直接父元素的 width
- border-radius 不一样，如果设置 border-radius 为百分比，则是相对于自身的宽度

### vw/vh

vw 表示相对于视图窗口的宽度，vh 表示相对于视图窗口高度

与百分比布局很相似

### rem

rem 是相对于根元素 html 的 font-size 属性，默认情况下浏览器字体大小为 16px，此时 1rem = 16px

## 总结

优点：

- 面对不同分辨率设备灵活性强
- 能够快捷解决多设备显示适应问题

缺点：

- 仅适用布局、信息、框架并不复杂的部门类型网站
- 兼容各种设备工作量大，效率低下
- 代码累赘，会出现隐藏无用的元素，加载时间加长
- 是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
- 一定程度上改变了网站原有的布局结构，会出现用户混淆的情况
