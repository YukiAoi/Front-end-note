## 手写webpack系列

### 手写webpack loader

```
loader从本质上来说其实就是一个node模块。
相当于一台榨汁机(loader)将相关类型的文件代码(code)给它。
根据我们设置的规则，经过它的一系列加工后还给我们加工好的果汁(code)。
```

`loader`编写原则：

- 单一原则: 每个`Loader`只做一件事
- 链式调用: `Webpack`会按顺序链式调用每个`Loader`
- 统一原则: 遵循`Webpack`制定的设计规则和结构，输入与输出均为字符串，各个`Loader`完全独立，即插即用

在日常开发环境中，为了方便调试我们往往会加入许多`console`。但是我们不希望在生产环境中存在打印的值。那么这里我们自己实现一个`loader`去除代码中的`console`

```
知识点普及之AST。
假设我们有一个文件a.js，我们对a.js里面的1000行进行一些操作处理，比如为所有的await 增加try catch，以及其他操作。
但是a.js里面的代码本质上来说就是一堆字符串。
那我们怎么办呢，那就是转换为带标记信息的对象(抽象语法树)我们方便进行增删改查。
这个带标记的对象(抽象语法树)就是AST
```

[AST快速入门](https://segmentfault.com/a/1190000016231512)

`npm i -D @babel/parser @babel/traverse @babel/generator @babel/types`

- `@babel/parser` 将源代码解析成 `AST`
- `@babel/traverse` 对`AST`节点进行递归遍历，生成一个便于操作、转换的`path`对象
- `@babel/generator` 将`AST`解码生成`js`代码
- `@babel/types`通过该模块对具体的`AST`节点进行进行增、删、改、查

新建`drop-console.js`

```js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
module.exports=function(source){
  const ast = parser.parse(source,{ sourceType: 'module'})
  traverse(ast,{
    CallExpression(path){ 
      if(t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, {name: "console"})){
        path.remove()
      }
    }
  })
  const output = generator(ast, {}, source);
  return output.code
}
```

如何使用

```js
const path = require('path')
module.exports = {
  mode:'development',
  entry:path.resolve(__dirname,'index.js'),
  output:{
    filename:'[name].[contenthash].js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[{
      test:/\.js$/,
      use:path.resolve(__dirname,'drop-console.js')
      }
    ]
  }
}
```

实际上在`webpack4`中已经集成了去除`console`功能，在`minimizer`中可配置[去除console](https://webpack.js.org/plugins/terser-webpack-plugin/#root)

[如何编写一个loader](https://webpack.docschina.org/contribute/writing-a-loader/)

### 手写webpack plugin

```
在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的API改变输出结果。
通俗来说：一盘美味的盐豆炒鸡蛋需要经历烧油，炒制，调味到最后的装盘等过程。
而plugin相当于可以监控每个环节并进行操作，比如可以写一个少放胡椒粉plugin，监控webpack暴露出的生命周期事件(调味)，在调味的时候执行少放胡椒粉操作。
那么它与loader的区别是什么呢？
上面我们也提到了loader的单一原则,loader只能一件事，比如说less-loader,只能解析less文件，plugin则是针对整个流程执行广泛的任务。
```

一个基本的plugin插件结构如下：

```js
class firstPlugin {
  constructor (options) {
    console.log('firstPlugin options', options)
  }
  apply (compiler) {
    compiler.plugin('done', compilation => {
      console.log('firstPlugin')
    ))
  }
}

module.exports = firstPlugin
```

`compiler 、compilation是什么？`

- `compiler` 对象包含了`Webpack` 环境所有的的配置信息。这个对象在启动 `webpack` 时被一次性建立，并配置好所有可操作的设置，包括 `options`，`loader` 和 `plugin`。当在 `webpack` 环境中应用一个插件时，插件将收到此 `compiler` 对象的引用。可以使用它来访问 `webpack` 的主环境。
- `compilation`对象包含了当前的模块资源、编译生成资源、变化的文件等。当运行`webpack` 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 `compilation`，从而生成一组新的编译资源。`compilation` 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

**compiler和 compilation的区别在于**

- `compiler`代表了整个`webpack`从启动到关闭的生命周期，而`compilation`只是代表了一次新的编译过程
- `compiler`和`compilation`暴露出许多钩子，我们可以根据实际需求的场景进行自定义处理

[compiler钩子文档](https://www.webpackjs.com/api/compiler-hooks/)
[compilation钩子文档](https://www.webpackjs.com/api/compilation-hooks/)

下面我们手动开发一个简单的需求,在生成打包文件之前自动生成一个关于打包出文件的大小信息

新建一个`webpack-firstPlugin.js`

```js
class firstPlugin{
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.plugin('emit',(compilation,callback)=>{
      let str = ''
      for (let filename in compilation.assets){
        str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
      }
      // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
      compilation.assets['fileSize.md'] = {
        source:function(){
          return str
        },
        size:function(){
          return str.length
        }
      }
      callback()
    })
  }
}
module.exports = firstPlugin
```

如何使用

```js
const path = require('path')
const firstPlugin = require('webpack-firstPlugin.js')
module.exports = {
  // 省略其他代码
  plugins:[
    new firstPlugin()
  ]
}
```

执行`npm run build`即可看到在`dist`文件夹中生成了一个包含打包文件信息的`fileSize.md`

[如何编写一个plugin](https://www.webpackjs.com/contribute/writing-a-plugin/)