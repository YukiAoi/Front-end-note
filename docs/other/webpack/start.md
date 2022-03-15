## 入门

### 初始化目录

新建一个目录，初始化npm

```
npm init
```

webpack是运行在node环境中的，需要安装下面两个包

```
npm i -D webpack webpack-cli
```

- npm i -D是npm install --save-dev的缩写
- npm i -S是npm install --save的缩写

新建一个文件夹`src`，然后新建一个文件`main.js`，写点代码

```js
console.log(123456789)
```

配置`package.json`命令

```json
"scripts":{
  "build":"webpack src/main.js"
}
```

执行

```
npm run build
```

如果生成了`dist`文件，则说明打包成功了

### 自己的配置

下面我们要实现更加丰富的自定义配置
新建一个`build`文件夹，里面新建一个`webpack.config.js`文件

```js
// webpack.config.js
const path = require('path')
module.exports = {
  mode:'development', //开发模式
  entry:path.resolve(__dirname,'../src/main.js'), //入口文件
  output:{
    filename:'output.js',  //打包后的文件名
    path:path.resolve(__dirname,'../dist')  //打包后的目录
  }
}
```

更改我们的打包命令

```json
// package.json
"scripts":{
  "build":"webpack --config build/webpack.config.js"
}
```

执行`npm run build`
其中`dist`文件中的`main.js`就是我们需要在浏览器中实际运行的文件

### 配置html模板

js文件打包好了，但是我们不可能每次在html文件中引入打包好的js

```js
// webpack.config.js
module.exports = {
  output:{
    filename:'[name].[hash:8].js',  //打包后的文件名
    path:path.resolve(__dirname,'../dist')  //打包后的目录
  }
}
```

为了缓存，你会发现打包好的js文件的名称每次都不一样。webpack打包出来的js文件我们需要引入到html中，但是每次我们都手动修改js文件名显得很麻烦，因此我们需要一个插件来帮我们完成这件事情

```
npm i -D html-webpack-plugin
```

新建一个`build`同级的文件夹`public`,里面新建一个`index.html`
具体配置文件如下：

```js
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'development', //开发模式
  entry:path.resolve(__dirname,'../src/main.js'), //入口文件
  output:{
    filename:'[name].[hash:8].js', //打包后的文件名
    path:path.resolve(__dirname,'../dist')  //打包后的目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html')
    })
  ]
}
```

此时打包生成的js文件已经被自动引入html文件中

#### 如何开发多入口文件

可以通过生成多个`html-webpack-plugin`实例来解决这个问题

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode:'development', // 开发模式
  entry:{ //入口文件
    main:path.resolve(__dirname,'../src/main.js'),
    header:path.resolve(__dirname,'../src/header.js'),
  },
  output:{
    filename:'[name].[hash:8].js', //打包后的文件名
    path:path.resolve(__dirname,'../dist')  //打包后的目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html',
      chunks:['main'] //与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/header.html'),
      filename:'header.html',
      chunks:['header'] //与入口文件对应的模块名
    }),
  ]
}
```

#### 清理上次打包后残留的文件

每次执行npm run build 会发现dist文件夹里会残留上次打包的文件，这里我们推荐一个plugin来帮我们在打包输出前清空文件夹`clean-webpack-plugin`

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  // ...省略其他配置
  plugins:[ new CleanWebpackPlugin() ]
}
```

### 引用css

我们的入口文件是js，所以我们在入口js中引入我们的css文件
同时我们也需要一些loader来解析我们的css文件

```
npm i -D style-loader css-loader
```

如果我们使用less来构建样式，则需要多安装两个

```
npm i -D less less-loader
```

配置文件如下：

```js
// webpack.config.js
module.exports = {
  // ...省略其他配置
  module:{
    rules:[
      {
        test:/\.css$/,
        use:['style-loader','css-loader'] // 从右向左解析原则
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader'] // 从右向左解析原则
      }
    ]
  }
}
```

#### 为css添加浏览器前缀

```js
// webpack.config.js
module.exports = {
  module:{
    rules:[
      {
        test:/\.less$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ] // 从右向左解析原则
      }
    ]
  }
} 
```

接下来，我们还需要引入`autoprefixer`使其生效,这里有两种方式:

1. 在项目根目录下创建一个`postcss.config.js`文件，配置如下：

```js
module.exports = {
  plugins:[require('autoprefixer')] //直接引用该插件
}
```

2. 直接在`webpack.config.js`里配置

```js
// webpack.config.js
module.exports = {
  //...省略其他配置
  module:{
    rules:[{
      test:/\.less$/,
      use:[
        'style-loader',
        'css-loader',
        {
          loader:'postcss-loader',
          options:{
            plugins:[require('autoprefixer')]
          }
        },
        'less-loader'
      ] // 从右向左解析原则
    }]
  }
}
```

这时候我们发现css通过style标签的方式添加到了html文件中，但是如果样式文件很多，全部添加到html中，难免显得混乱。这时候我们想用把css拆分出来用外链的形式引入css文件怎么做呢？这时候我们就需要借助插件来帮助我们

#### 拆分css

`webpack 4.0以前`，我们通过`extract-text-webpack-plugin`插件，把css样式从js文件中提取到单独的css文件中。`webpack4.0以后`，官方推荐使用`mini-css-extract-plugin`插件来打包css文件

```
npm i -D mini-css-extract-plugin
```

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
  //...省略其他配置
  module:{
    rules:[{
      test: /\.less$/,
      use:[
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    })
  ]
}
```

#### 拆分多个css

这里需要说的细一点,上面我们所用到的`mini-css-extract-plugin`会将所有的css样式合并为一个css文件。如果你想拆分为一一对应的多个css文件,我们需要使用到`extract-text-webpack-plugin`，而目前`mini-css-extract-plugin`还不支持此功能。我们需要安装`@next版本的extract-text-webpack-plugin`

```
npm i -D extract-text-webpack-plugin@next
```

```js
// webpack.config.js
const path = require('path')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index.less')
let indexCss = new ExtractTextWebpackPlugin('index.css')
module.exports = {
  module:{
    rules:[
      {
        test:/\.css$/,
        use: indexCss.extract({
          use: ['css-loader']
        })
      },
      {
        test:/\.less$/,
        use: indexLess.extract({
          use: ['css-loader','less-loader']
        })
      }
    ]
  },
  plugins:[
    indexLess,
    indexCss
  ]
}
```

### 打包图片、字体、媒体等文件

`file-loader`就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件url），并将文件移动到输出的目录中
`url-loader`一般与`file-loader`搭配使用，功能与`file-loader`类似，如果文件小于限制的大小。则会返回`base64`编码，否则使用`file-loader`将文件移动到输出的目录中

```js
// webpack.config.js
module.exports = {
  // 省略其它配置 ...
  module:{
    rules:[
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 10240,
              fallback:{
                loader: 'file-loader',
                options:{
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 10240,
              fallback:{
                loader: 'file-loader',
                options:{
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use:[
          {
            loader: 'url-loader',
            options:{
              limit: 10240,
              fallback:{
                loader: 'file-loader',
                options:{
                  name:'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }
    ]
  }
}
```

### 用babel转义js文件

为了使我们的js代码兼容更多的环境我们需要安装依赖

```
npm i -D babel-loader @babel/preset-env @babel/core
```

- 注意`babel-loader`与`babel-core`的版本对应关系

1. `babel-loader` 8.x 对应`babel-core` 7.x
2. `babel-loader` 7.x 对应`babel-core` 6.x
配置如下：

```js
// webpack.config.js
module.exports = {
  // 省略其它配置 ...
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        },
        exclude:/node_modules/
      }
    ]
  }
}
```

上面的`babel-loader`只会将 ES6/7/8语法转换为ES5语法，但是对新api并不会转换 例如(promise、Generator、Set、Maps、Proxy等)
此时我们需要借助`babel-polyfill`来帮助我们转换

```
npm i @babel/polyfill
```

```js
// webpack.config.js
const path = require('path')
module.exports = {
  // 省略其它配置 ...
  entry:["@bable/polyfill",path.resolve(__dirname,'../src/index.js')] //入口文件
}
```