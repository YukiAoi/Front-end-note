# HTML5

## 新特性

- 语义化标签
- 音视频处理 API(audio,video)
- canvas / webGL
- 拖拽释放(Drag and drop) API
- history API
- requestAnimationFrame
- 地理位置(Geolocation)API
- webSocket
- web 存储 localStorage、SessionStorage
- 表单控件，calendar、date、time、email、url、search

### 语义化

使用合理正确的使用语义化的标签来创建页面结构

语义化标签有：

- header
- nav
- main
- article
- section
- aside
- footer

#### 优点

- 在没 CSS 样式的情况下，页面整体也会呈现很好的结构效果
- 代码结构清晰，易于阅读
- 利于开发和维护，方便其他设备解析（如屏幕阅读器）根据语义渲染网页
- 有利于搜索引擎优化（SEO），搜索引擎爬虫会根据不同的标签来赋予不同的权重

## `<script><script async><script defer>`的区别

- async 和 defer 都不会阻塞页面渲染
- async 的加载顺序是先加载完成的先执行，一般用于独立脚本
- defer 是按照他们在文档中的顺序加载，一般用于整个 dom 的脚本
