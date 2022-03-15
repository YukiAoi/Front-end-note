## 优化

1. 优化`Webpack`的构建速度
  - 使用高版本的 Webpack （使用webpack4）
  - 多线程/多实例构建：HappyPack(不维护了)、thread-loader
  - 缩小打包作用域：
    exclude/include (确定 loader 规则范围)
    resolve.modules 指明第三方模块的绝对路径 (减少不必要的查找)
    resolve.extensions 尽可能减少后缀尝试的可能性
    noParse 对完全不需要解析的库进行忽略 (不去解析但仍会打包到 bundle 中，注意被忽略掉的文件里不应该包含 import、require、define 等模块化语句)
    IgnorePlugin (完全排除模块)
    合理使用alias
  - 充分利用缓存提升二次构建速度：
    babel-loader 开启缓存
    terser-webpack-plugin 开启缓存
    使用 cache-loader 或者 hard-source-webpack-plugin
    **注意：thread-loader 和 cache-loader 两个要一起使用的话，先放 cache-loader 接着是 thread-loader 最后才是 heavy-loader**
  - DLL：
    使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
2. 使用`webpack4`优化原因
  - V8带来的优化（for of替代forEach、Map和Set替代Object、includes替代indexOf）
  - 默认使用更快的md4 hash算法
  - webpacks AST可以直接从loader传递给AST，减少解析时间
  - 使用字符串方法替代正则表达式
3. 优化`Webpack`打包体积
  - 压缩代码
  - 提取页面公共资源
  - Tree shaking
  - Scope hoisting
  - 图片压缩
  - 动态Polyfill
4. `speed-measure-webpack-plugin`
  简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈
```js
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6
        }
      })
    ]
  }
}
```