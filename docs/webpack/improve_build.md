# 提高 webpack 构建速度

## 如何优化

- 优化 loader 配置
- 合理使用 resolve.extensions
- 优化 resolve.modules
- 优化 resolve.alias
- 使用 DLLPlugin 插件
- 使用 cache-loader
- terser 启动多线程
- 合理使用 sourceMap

### 优化 loader 配置

在使用 loader 时，可以通过配置 include、exclude、test 属性来匹配文件

```js
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ["babel-loader?cacheDirectory"],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
};
```

### 合理使用 resolve.extensions

resolve 可以帮助 webpack 从每个 require/import 语句中，找到需要引入到合适的模块代码

```js
module.exports = {
  // ...
  extensions: [".warm", ".mjs", ".js", ".json"],
};
```

### 优化 resolve.modules

resolve.modules 用于配置 webpack 去哪些目录下寻找第三方模块。默认值为['node_modules']

当安装的第三方模块都放在项目根目录下的 ./node_modules 目录下时，所以可以指明存放第三方模块的绝对路径，以减少寻找

```js
module.exports = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, "node_modules")],
  },
};
```

### 优化 resolve.alias

alias 给一些常用的路径起一个别名，通过配置 alias 以减少查找过程

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
```

### 使用 DLLPlugin 插件

DLL 是动态链接库，是为软件在 winodw 中实现共享函数库的一种方式，而 Webpack 也内置了 DLL 的功能

使用步骤分成两部分：

1. 打包一个 DLL 库
2. 引入 DLL 库

#### 打包 DLL 库

webpack 内置了一个 DllPlugin 可以帮助我们打包一个 DLL 的库文件

```js
module.exports = {
  // ...
  plugins: [
    new webpack.DllPlugin({
      name: "dll_[name]",
      path: path.resolve(__dirname, "./dll/[name].mainfest.json"),
    }),
  ],
};
```

#### 引入 DLL 库

使用 webpack 自带的 DllReferencePlugin 插件对 mainfest.json 映射文件进行分析，获取要使用的 DLL 库

然后再通过 AddAssetHtmlPlugin 插件，将我们打包的 DLL 库引入到 Html 模块中

```js
module.exports = {
  // ...
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, "./dll/dll_react.js"),
      mainfest: path.resolve(__dirname, "./dll/react.mainfest.json"),
    }),
    new AddAssetHtmlPlugin({
      outputPath: "./auto",
      filepath: path.resolve(__dirname, "./dll/dll_react.js"),
    }),
  ],
};
```

### 使用 cache-loader

在一些性能开销较大的 loader 之前添加 cache-loader，以将结果缓存到磁盘里，显著提升二次构建速度

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ["cache-loader", ...loaders],
        include: path.resolve("src"),
      },
    ],
  },
};
```

### terser 启动多线程

```js
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
};
```

### 合理使用 sourceMap

打包生成 sourceMap 的时候，如果信息越详细，打包速度就会越慢
