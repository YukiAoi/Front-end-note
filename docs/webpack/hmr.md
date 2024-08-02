# 热更新

## 是什么

在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个应用

在 webpack 中配置开启热模块也非常的简单：

```js
const webpack = require("webpack");
module.exports = {
  // ...
  devServer: {
    // 开启 HMR 特性
    hot: true,
    // hotOnly: true
  },
};
```

虽然 css 能热更新，但是 js 不能，HMR 并不像 Webpack 的其他特性一样可以开箱即用，需要有一些额外的操作

我们需要去指定哪些模块发生更新时进行 HRM：

```js
if (module.hot) {
  module.hot.accept("./util.js", () => {
    console.log("util.js更新了");
  });
}
```

## 实现原理

- 通过 webpack-dev-server 创建两个服务器：提供静态资源的服务（express）和 Socket 服务
- express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
- socket server 是一个 websocket 的长连接，双方可以通信
- 当 socket server 监听到对应的模块发生变化时，会生成两个文件.json（manifest 文件）和.js 文件（update chunk）
- 通过长连接，socket server 可以直接将这两个文件主动发送给客户端（浏览器）
- 浏览器拿到两个新的文件后，通过 HMR runtime 机制，加载这两个文件，并且针对修改的模块进行更新
