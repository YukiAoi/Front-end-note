# css 优化

## 实现方式

- 内联首屏关键 CSS
- 异步加载 CSS
- 资源压缩
- 合理使用选择器
- 减少使用昂贵的属性
- 不要使用@import

### 内联首屏关键 CSS

通过内联 css 关键代码能够使浏览器在下载完 html 后就能立刻渲染

而如果外部引用 css 代码，在解析 html 结构过程中遇到外部 css 文件，才会开始下载 css 代码，再渲染

但是较大的 css 代码并不合适内联（初始拥塞窗口、没有缓存），而其余代码则采取外部引用方式

### 异步加载 CSS

CSS 文件请求、下载、解析完成之前，CSS 会阻塞渲染，浏览器将不会渲染任何已处理的内容

可以采取异步加载的方案：

- 使用 javascript 将 link 标签插到 head 标签最后

```js
// 创建link标签
const myCSS = document.createElement("link");
myCSS.rel = "stylesheet";
myCSS.href = "mystyles.css";
// 插入到header的最后位置
document.head.insertBefore(
  myCSS,
  document.head.childNodes[document.head.childNodes.length - 1].nextSibling
);
```

- 设置 link 标签 media 属性为 noexis

```html
<link
  rel="stylesheet"
  href="mystyles.css"
  media="noexist"
  onload="this.media='all'"
/>
```

- 通过 rel 属性将 link 元素标记为 alternate 可选样式表，加载完成之后，将 rel 设回 stylesheet

```html
<link
  rel="alternate stylesheet"
  href="mystyles.css"
  onload="this.rel='stylesheet'"
/>
```

### 资源压缩

- webpack
- gulp/grunt
- rollup

### 合理使用选择器

在编写选择器的时候，可以遵循以下规则：

- 不要嵌套使用过多复杂选择器，最好不要三层以上
- 使用 id 选择器就没必要再进行嵌套
- 通配符和属性选择器效率最低，避免使用

### 减少使用昂贵的属性

box-shadow/border-radius/filter/透明度/:nth-child 等，会降低浏览器的渲染性能

### 不要使用@import

css 样式文件有两种引入方式，一种是 link 元素，另一种是@import

@import 会影响浏览器的并行下载，使得页面在加载时增加额外的延迟，增添了额外的往返耗时

而且多个@import 可能会导致下载顺序紊乱

### 其他

- 减少重排操作，以及减少不必要的重绘
- 了解哪些属性可以继承，避免对这些属性重复编写
- cssSprite（雪碧图），合成所有 icon 图片，用宽高加上 backgroud-position 的背景图方式显现出我们要的 icon 图，减少了 http 请求
- 把小的 icon 图片转成 base64 编码
- CSS3 动画或者过渡尽量使用 transform 和 opacity 来实现动画，不要使用 left 和 top 属性
