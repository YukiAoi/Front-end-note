# Loader

## 是什么

loader 用于对模块的"源代码"进行转换，在 import 或加载模块时预处理文件

webpack 内部中，不仅仅只是 js 文件，任何文件都是模块

默认情况下，在遇到 import 或者 require 加载模块的时候，webpack 只支持对 js 和 json 文件打包

像 css、sass、png 等这些类型的文件的时候，webpack 则无能为力，这时候就需要配置对应的 loader 进行文件内容的解析

配置 loader 的方式有三种：

1. 配置方式（推荐）：在 webpack.config.js 文件中指定 loader
2. 内联方式：在每个 import 语句中显式指定 loader
3. CLI 方式：在 shell 命令中指定它们

### 配置方式

loader 的配置，写在 module.rules 属性中：

```js
module.exports = {
  module: {
    // rules是一个数组的形式，可以配置多个loader
    rules: [
      {
        test: /\.css$/,
        // use针对匹配到文件类型，调用对应的 loader 进行处理
        use: [
          // loader对应一个对象的形式，对象属性test 为匹配的规则，一般情况为正则表达式
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
```

## 特性

loader 支持链式调用，链中的每个 loader 会处理之前已处理过的资源，最终变为 js 代码。顺序为相反的顺序执行，即上述执行方式为 sass-loader、css-loader、style-loader

loader 的特性还有：

- loader 可以是同步的，也可以是异步的
- loader 运行在 Node.js 中，并且能够执行任何操作
- 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块
- 插件(plugin)可以为 loader 带来更多特性
- loader 能够产生额外的任意文件
- 可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力

## 常见的 loader

- style-loader: 将 css 添加到 DOM 的内联样式标签 style 里
- css-loader :允许将 css 文件通过 require 的方式引入，并返回 css 代码
- less-loader: 处理 less
- sass-loader: 处理 sass
- postcss-loader: 用 postcss 来处理 CSS
- autoprefixer-loader: 处理 CSS3 属性前缀，已被弃用，建议直接使用 postcss
- file-loader: 分发文件到 output 目录并返回相对路径
- url-loader: 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url
- html-minify-loader: 压缩 HTML
- babel-loader :用 babel 来转换 ES6 文件到 ES
