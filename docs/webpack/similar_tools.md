# 与 webpack 类似的工具

## 有哪些

- Rollup
- Parcel
- snowpack
- Vite

没有提及 gulp、grunt 是因为它们只是构建工具

### Rollup

Rollup 与 Webpack 非常类似。不过相比于 Webpack，Rollup 要小巧的多

现在很多我们熟知的库都都使用它进行打包，比如：Vue、React 和 three.js 等

#### 优点

- 代码效率更简洁、效率更高
- 默认支持 Tree-shaking

#### 缺点

- 不能加载其他类型的资源文件或者支持导入 CommonJS 模块
- 不能编译 ES 新特性

#### 结论

rollup 并不适合开发应用使用，但是在用于打包 JavaScript 库时，rollup 比 webpack 更有优势

### Parcel

Parcel 跟 Webpack 一样都支持以任意类型文件作为打包入口，但建议使用 HTML 文件作为入口

#### 优点

- Parcel 不仅打包了应用，同时也启动了一个开发服务器
- 支持模块热替换，但用法更简单
- 支持自动安装依赖
- 能够零配置加载其他类型的资源文件
- 构建速度会比 Webpack 快，输出文件也会被压缩，并且样式代码也会被单独提取到单个文件中

### Snowpack

Snowpack，是一种闪电般快速的前端构建工具，专为现代 Web 设计，是较复杂的打包工具（如 Webpack 或 Parcel）的替代方案，利用 JavaScript 的本机模块系统，避免不必要的工作并保持流畅的开发体验

开发阶段，每次保存单个文件时，Webpack 和 Parcel 都需要重新构建和重新打包应用程序的整个 bundle。而 Snowpack 为你的应用程序每个文件构建一次，就可以永久缓存，文件更改时，Snowpack 会重新构建该单个文件

### Vite

主要由两部分组成：

1. 一个开发服务器，它基于 原生 ES 模块 提供了丰富的内建功能
2. 一套构建指令，它使用 Rollup 打包你的代码，并且它是预配置的，可以输出用于生产环境的优化过的静态资源

作用类似 webpack+ webpack-dev-server，特点：

- 快速的冷启动
- 即时的模块热更新
- 真正的按需编译

### webpack

webpack 大而全，很多常用的功能做到开箱即用。有两大最核心的特点：一切皆模块和按需加载

- 智能解析：对 CommonJS 、 AMD 、ES6 的语法做了兼容
- 万物模块：对 js、css、图片等资源文件都支持打包
- 开箱即用：HRM、Tree-shaking 等功能
- 代码分割：可以将代码切割成不同的 chunk，实现按需加载，降低了初始化时间
- 插件系统：具有强大的 Plugin 接口，具有更好的灵活性和扩展性
- 易于调试：支持 SourceUrls 和 SourceMaps
- 快速运行：webpack 使用异步 IO 并具有多级缓存，这使得 webpack 很快且在增量编译上更加快
- 生态环境好：社区更丰富，出现的问题更容易解决
