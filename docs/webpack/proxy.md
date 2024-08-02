# webpack proxy

## 是什么

webpack proxy，就是 webpack 提供的代理服务

是为了便于开发者在开发模式下解决跨域问题（浏览器安全策略限制）

要实现代理首先需要一个中间服务器，webpack 中提供服务器的工具为 webpack-dev-server

### webpack-dev-server

webpack-dev-server 是 webpack 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起

目的是为了提高开发者日常的开发效率，只适用在开发阶段

```js
// ./webpack.config.js
const path = require("path");

module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    proxy: {
      "/api": {
        target: "https://api.github.com",
      },
    },
    // ...
  },
};
```

## 工作原理

实质上是利用 http-proxy-middleware 这个 http 代理中间件，实现请求转发给其他服务器

## 跨域

通过设置 webpack proxy 实现代理请求后，相当于浏览器与服务器中多了一个代理服务器

本地发送请求的时候，代理服务器响应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地

在代理服务器传递数据给本地浏览器的过程中，两者同源，并不存在跨域行为，这时候浏览器就能正常接收数据
