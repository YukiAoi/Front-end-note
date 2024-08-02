# plugin

## 是什么

plugin 会运行在 webpack 的不同阶段（钩子 / 生命周期），解决 loader 无法实现的其他事

## 配置方式

通过配置文件导出对象中 plugins 属性传入 new 实例对象

```js
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const webpack = require("webpack"); // 访问内置的插件
module.exports = {
  // ...
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
};
```

## 特性

本质是一个具有 apply 方法 javascript 对象

apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象

```js
const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("webpack 构建过程开始！");
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

## 常见的 Plugin

- HtmlWebpackPlugin：打包结束后，⾃动生成⼀个 html ⽂文件，并把打包生成的 js 模块引⼊到该 html 中
- clean-webpack-plugin：删除（清理）构建目录
- mini-css-extract-plugin：提取 CSS 到一个单独的文件中
- DefinePlugin：允许在编译时创建配置的全局对象，是一个 webpack 内置的插件，不需要安装
- copy-webpack-plugin：复制文件或目录到执行区域
