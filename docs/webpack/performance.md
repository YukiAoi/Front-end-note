# 优化前端性能

## 如何优化

- JS 代码压缩
- CSS 代码压缩
- Html 文件代码压缩
- 文件大小压缩
- 图片压缩
- Tree Shaking
- 代码分离
- 内联 chunk

### JS 代码压缩

在 production 模式下，webpack 默认就是使用 TerserPlugin 来处理我们的代码的

```js
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 电脑cpu核数-1
      }),
    ],
  },
};
```

- extractComments：默认值为 true，表示会将注释抽取到一个单独的文件中，开发阶段，我们可设置为 false ，不保留注释
- parallel：使用多进程并发运行提高构建的速度，默认值是 true，并发运行的默认数量： os.cpus().length - 1
- terserOptions：设置我们的 terser 相关的配置
- compress：设置压缩相关的选项
- mangle：设置丑化相关的选项，可以直接设置为 true
- toplevel：底层变量是否进行转换
- keep_classnames：保留类的名称
- keep_fnames：保留函数的名称

### CSS 代码压缩

CSS 的压缩我们可以使用：css-minimizer-webpack-plugin

```
npm install css-minimizer-webpack-plugin
```

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
```

### Html 文件代码压缩

使用 HtmlWebpackPlugin

```js
module.exports = {
  // ...
  plugin: [
    new HtmlwebpackPlugin({
      // ...
      minify: {
        minifyCSS: false, // 是否压缩css
        collapseWhitespace: false, // 是否折叠空格
        removeComments: true, // 是否移除注释
      },
    }),
  ],
};
```

设置了 minify，实际会使用另一个插件 html-minifier-terser

### 文件大小压缩

```
npm install compression-webpack-plugin -D
```

```js
new ComepressionPlugin({
  test: /\.(css|js)$/, // 哪些文件需要压缩
  threshold: 500, // 设置文件多大开始压缩
  minRatio: 0.7, // 至少压缩的比例
  algorithm: "gzip", // 采用的压缩算法
});
```

### 图片压缩

一些图片文件的大小是要比 js 或者 css 文件大得多，所以图片压缩较为重要

```js
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
          },
        },
        {
          loader: "image-webpack-loader",
          options: {
            // 压缩 jpeg 的配置
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
            optipng: {
              enabled: false,
            },
            // 使用 imagemin-pngquant 压缩 png
            pngquant: {
              quality: "65-90",
              speed: 4,
            },
            // 压缩 gif 的配置
            gifsicle: {
              interlaced: false,
            },
            // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
  ];
}
```

### Tree Shaking

打包时清除没有使用的模块

在 webpack 实现 Trss shaking 有两种不同的方案：

1. usedExports：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的
2. sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用

#### usedExports

```js
module.exports = {
  // ...
  optimization: {
    usedExports,
  },
};
```

没被用上的代码在 webpack 打包中会加入 unused harmony export mul 注释，用来告知 Terser 在优化时，可以删除掉这段代码

#### sideEffects

配置方法是在 package.json 中设置 sideEffects 属性

如果 sideEffects 设置为 false，就是告知 webpack 可以安全的删除未用到的 exports

如果有文件需要保留，可以设置为数组的形式

```js
sideEffecis: [
  "./src/util/format.js",
  "*.css", // 所有的css文件
];
```

### css tree shaking

css 同样也能够实现 tree shaking，可以安装 PurgeCss 插件

```
npm install purgecss-plugin-webpack -D
```

```js
const PurgeCssPlugin = require("purgecss-webpack-plugin");
module.exports = {
  // ...
  plugins: [
    new PurgeCssPlugin({
      path: glob.sync(`${path.resolve("./src")}/**/*`, { nodir: true }), // src里面的所有文件
      satelist: function () {
        return {
          standard: ["html"],
        };
      },
    }),
  ],
};
```

- paths：表示要检测哪些目录下的内容需要被分析，配合使用 glob
- 默认情况下，Purgecss 会将我们的 html 标签的样式移除掉，如果我们希望保留，可以添加一个 safelist 的属性

### 代码分离

将代码分离到不同的 bundle 中，之后我们可以按需加载，或者并行加载这些文件

通过 splitChunksPlugin 来实现，该插件 webpack 已经默认安装和集成，只需要配置即可

默认配置中，chunks 仅仅针对于异步（async）请求，我们可以设置为 initial 或者 all

```js
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

- chunks：对同步代码还是异步代码进行处理
- minSize： 拆分包的大小，包的大小至少为 minSize，如何包的大小不超过 minSize，这个包不会被拆分
- maxSize： 将大于 maxSize 的包，拆分为不小于 minSize 的包
- minChunks：被引入的次数，默认是 1

### 内联 chunk

可以通过 InlineChunkHtmlPlugin 插件将一些 chunk 的模块内联到 html，如 runtime 的代码

```js
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // ...
    plugin:[
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin,[/runtime.+\.js/]
}
```
