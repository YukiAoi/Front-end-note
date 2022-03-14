## HTML5

### 语义化

1.  **概念**：
  HTML5的语义化指的是`合理正确的使用语义化的标签来创建页面结构`。【正确的标签做正确的事】
1.  **语义化标签**：
  header nav main article section aside footer
1.  **语义化的优点**:
  -   在`没CSS样式的情况下，页面整体也会呈现很好的结构效果`
  -   `代码结构清晰`，易于阅读，
  -   `利于开发和维护` 方便其他设备解析（如屏幕阅读器）根据语义渲染网页。
  -   `有利于搜索引擎优化（SEO）`，搜索引擎爬虫会根据不同的标签来赋予不同的权重

### 新特性有哪些

1. 语义化标签
1. 音视频处理API(audio,video)
1. canvas / webGL
1. 拖拽释放(Drag and drop) API
1. history API
1. requestAnimationFrame
1. 地理位置(Geolocation)API
1. webSocket
1. web存储 localStorage、SessionStorage
1. 表单控件，calendar、date、time、email、url、search

### `<script><script async><script defer>`的区别
1. `async`和`defer`都不会阻塞页面渲染
1. `async`的加载顺序是先加载完成的先执行，一般用于独立脚本
1. `defer`是按照他们在文档中的顺序加载，一般用于整个dom的脚本