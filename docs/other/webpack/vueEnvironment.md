## 搭建vue开发环境

### 解析.vue文件

```
npm i -D vue-loader vue-template-compiler vue-style-loader
npm i -S vue
```

`vue-loader`用于解析`.vue`文件
`vue-template-compiler`用于编译模板，配置如下：

```js
const vueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:['vue-loader']
      }
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      ' @':path.resolve(__dirname,'../src')
    },
    extensions:['*','.js','.json','.vue']
  },
  plugins:[
    new vueLoaderPlugin()
  ]
}
```

### 配置webpack-dev-server进行热更新

```
npm i -D webpack-dev-server
```

配置如下：

```js
const Webpack = require('webpack')
module.exports = {
  // ...省略其他配置
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
}
```

完整配置如下：

```js
// webpack.config.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')
module.exports = {
  mode:'development', // 开发模式
  entry:{ //入口文件
    main:path.resolve(__dirname,'../src/main.js')
  },
  output:{
    filename: '[name].[hash:8].js', //打包后的文件名称
    path: path.resolve(__dirname,'../dist') //打包后的目录
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        use:['vue-loader']
      },
      {
        test:/\.js$/,
        use:{
          loader:'babel-loader',
          options:{
            presets:['@babel/preset-env']
          }
        }
      },
      {
        test:/\.css$/,
        use:[
          'vue-style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              plugins:[require('autoprefixer')]
            }
          }
        ]
      },
      {
        test:/\.less$/,
        use:[
          'vue-style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options:{
              plugins:[require('autoprefixer')]
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      ' @':path.resolve(__dirname,'../src')
    },
    extensions:['*','.js','.json','.vue']
  },
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html'),
      filename:'index.html'
    }),
    new vueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}

```

### 配置打包命令

```json
// package.json
"scripts":{
  "dev":"webpack-dev-server --config build/webpack.config.js --open",
  "build":"webpack --config build/webpack.config.js"
}
```

打包文件已经配置完毕，接下来让我们测试一下
首先在src新建一个main.js

```js
import Vue from 'vue'
import App from './app'
new VUE({
  render:h => h(App)
}).$mount('#app')
```

新建一个App.vue

```vue
<template>
  <div class="content">{{content}}</div>
</template>

<script>
export default{
  data(){
    return {
      content:'vue开发环境运行成功'
    }
  }
}
</script>

<style>
.content{
  color:red
}
</style>
```

新建一个public文件夹，里面新建一个index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div>content</div>
</body>
</html>
```

执行`npm run dev`

### 区分开发环境与生产环境

实际应用到项目中，我们需要区分开发环境与生产环境，我们在原来webpack.config.js的基础上再新增两个文件

- `webpack.dev.js`开发环境配置文件

`开发环境主要实现的是热更新,不要压缩代码，完整的sourceMap`

- `webpack.prod.js`生产环境配置文件

```
生产环境主要实现的是压缩代码、提取css文件、合理的sourceMap、分割代码
需要安装以下模块:
npm i -D  webpack-merge copy-webpack-plugin optimize-css-assets-webpack-plugin uglifyjs-webpack-plugin
```

- `webpack-merge`合并配置
- `copy-webpack-plugin`拷贝静态资源
- `optimize-css-assets-webpack-plugin`压缩css
- `uglifyjs-webpack-plugin`压缩js

```
webpack mode设置production的时候会自动压缩js代码。
原则上不需要引入uglifyjs-webpack-plugin进行重复工作。
但是optimize-css-assets-webpack-plugin压缩css的同时会破坏原有的js压缩，所以这里我们引入uglifyjs进行压缩
```

#### webpack.config.js

```js
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const devMode = process.argv.indexOf('--mode=production') === -1

module.exports = {
  entry:{
    main:path.resolve(__dirname,'../src/main.js')
  },
  output:{
    path:path.resolve(__dirname,'../dist'),
    filename:'js/[name].[hash:8].js',
    chunkFilename:'js/[name].[hash:8].js'
  },
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
      },
      {
        test:/\.vue$/,
        use:[{
          loader:'vue-loader',
          options:{
            compilerOptions:{
              preserveWhitespace:false
            }
          }
        }]
      },
      {
        test:/\.css$/,
        use:[{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options:{
            publicPath:"../dist/css/",
            hmr:devMode
          }
        },'css-loader',{
          loader:'postcss-loader',
          options:{
            plugins:[require('autoprefixer')]
          }
        }]
      },
      {
        test:/\.less$/,
        use:[{
          loader:devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options:{
            publicPath:"../dist/css/",
            hmr:devMode
          }
        },'css-loader','less-loader',{
          loader:'postcss-loader',
          options:{
            plugins:[require('autoprefixer')]
          }
        }]
      },
      {
        test:/\.(jep?g|png|gif)$/,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use:{
          loader:'url-loader',
          options:{
            limit:10240,
            fallback:{
              loader:'file-loader',
              options:{
                name:'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      }
    ]
  },
  resolve:{
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      ' @':path.resolve(__dirname,'../src')
    },
    extensions:['*','.js','.json','.vue']
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template:path.resolve(__dirname,'../public/index.html')
    }),
    new vueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
  ]
}
```

#### webpack.dev.js

```js
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(webpackConfig,{
  mode:'development',
  devtool:'cheap-module-eval-source-map',
  devServer:{
    port:3000,
    hot:true,
    contentBase:'../dist'
  },
  plugins:[
    new Webpack.HotModuleReplacementPlugin()
  ]
})
```

#### webpack.prod.js

```js
const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = WebpackMerge(webpackConfig,{
  mode:'production',
  devtool:'cheap-module-source-map',
  plugins:[
    new CopyWebpackPlugin([{
      from:path.resolve(__dirname,'../public'),
      to:path.resolve(__dirname,'../dist')
    }]),
  ],
  optimization:{
    minimizer:[
      new UglifyJsPlugin({//压缩js
        cache:true,
        parallel:true,
        sourceMap:true
    }),
    new OptimizeCssAssetsPlugin({})
    ],
    splitChunks:{
      chunks:'all',
      cacheGroups:{
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})
```

### 优化webpack配置

优化配置对我们来说非常有实际意义，这实际关系到你打包出来文件的大小，打包的速度等。 具体优化可以分为以下几点：

#### 优化打包速度

`构建速度指的是我们每次修改代码后热更新的速度以及发布前打包文件的速度。`

##### 合理的配置mode参数与devtool参数

`mode`可设置`development production`两个参数
如果没有设置，`webpack4` 会将 `mode` 的默认值设置为 `production` 
`production`模式下会进行`tree shaking`(去除无用代码)和`uglifyjs`(代码压缩混淆)

##### 缩小文件的搜索范围(配置include exclude alias noParse extensions)

- `alias`: 当我们代码中出现`import 'vue'`时， webpack会采用向上递归搜索的方式去`node_modules`目录下找。为了减少搜索范围我们可以直接告诉webpack去哪个路径下查找。也就是别名(`alias`)的配置。
- `include exclude` 同样配置`include exclude`也可以减少`webpack loader`的搜索转换时间。
- `noParse`  当我们代码中使用到`import jq from 'jquery'`时，`webpack`会去解析jq这个库是否有依赖其他的包。但是我们对类似`jquery`这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。增加`noParse`属性,告诉`webpack`不必解析，以此增加打包速度。
- `extensions` `webpack`会根据`extensions`定义的后缀查找文件(频率较高的文件类型优先写在前面)

##### 使用HappyPack开启多进程Loader转换

```
在webpack构建过程中，实际上耗费时间大多数用在loader解析转换以及代码的压缩中。
日常开发中我们需要使用Loader对js，css，图片，字体等文件做转换操作，并且转换的文件数据量也是非常大。
由于js单线程的特性使得这些转换操作不能并发处理文件，而是需要一个个文件进行处理。
HappyPack的基本原理是将这部分任务分解到多个子进程中去并行处理，子进程处理完成后把结果发送到主进程中，从而减少总的构建时间
```

`npm i -D happypack`

```js
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size:os.cpus().length ))
module.exports= {
// 省略其他配置
module:{
  rules:[
    { 
      test:/.js$/,//把jS文件处理交给id为happyBabelf的HappyPack的实例执行
      use:[{
        loader: 'happypack/loader?id=happyBabel'
      }],
      exclude:/node_modules/
    }
  ],
  plugin: [
    new HappyPack({
      id: 'happyBabel', //与loader对应的id标识
      // 用法和Loader的配置一样，注意这里是loaders
      loaders:[
        loader: 'babel-loader',
        options:{
          presets:[
            ['@babel/preset-env']
          ],
          cacheDirectory: true
        }
      ],
      threadPool:happyThreadPool//共享进程池
    })
  ]
}
```

##### 使用webpack-parallel-uglify-plugin增强代码压缩

`上面对于loader转换已经做优化，那么下面还有另一个难点就是优化代码的压缩时间`

`npm i -D webpack-parallel-uglify-plugin`

```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = {
  // ...省略其他配置
  optimization:{
    minimizer:[
      new ParallelUglifyPlugin({
        cacheDir:'.cache/',
        uglifyjs:{
          output:{
            comments:false,
            beautify:false
          },
          compress:{
            drop_console:true,
            collapse_vars:true,
            reduce_vars:true
          }
        }
      })
    ]
  }
}
```

##### 抽离第三方模块

```
对于开发项目中不经常会变更的静态依赖文件。类似于我们的elementUi、vue全家桶等等。
因为很少会变更，所以我们不希望这些依赖要被集成到每一次的构建逻辑中去。 
这样做的好处是每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库。
以后只要我们不升级第三方包的时候，那么webpack就不会对这些库去打包，这样可以快速的提高打包的速度。
```

这里我们使用`webpack`内置的`DllPlugin DllReferencePlugin`进行抽离
在与`webpack`配置文件同级目录下新建`webpack.dll.config.js`，代码如下：

```js
// webpack.dll.config.js
const path = require("path")
const webpack = require("webpack")
module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: ['vue','element-ui'] 
  },
  output: {
    path: path.resolve(__dirname, 'static/js'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library' // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '[name]-manifest.json'),
      name: '[name]_library', 
      context: __dirname
    })
  ]
}
```

在`package.json`中配置如下命令

`"dll": "webpack --config build/webpack.dll.config.js"`

接下来在我们的`webpack.config.js`中增加以下代码

```js
module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor-manifest.json')
    }),
    new CopyWebpackPlugin([ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
      {from: 'static', to:'static'}
    ]),
  ]
}
```

执行`npm run dll`,会发现生成了我们需要的集合第三方代码的`vendor.dll.js`，我们需要在`html`文件中手动引入这个`js`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="static/js/vendor.dll.js"></script>
</head>
<body>
  <div>content</div>
</body>
</html>
```

这样如果我们没有更新第三方依赖包，就不必`npm run dll`。直接执行`npm run dev npm run build`的时候会发现我们的打包速度明显有所提升。因为我们已经通过`dllPlugin`将第三方依赖包抽离出来了。

##### 配置缓存

```
我们每次执行构建都会把所有的文件都重复编译一遍，这样的重复工作是否可以被缓存下来呢？
答案是可以的，目前大部分 loader 都提供了cache 配置项。
比如在 babel-loader 中，可以通过设置cacheDirectory 来开启缓存，babel-loader?cacheDirectory=true 就会将每次的编译结果写进硬盘文件（默认是在项目根目录下的node_modules/.cache/babel-loader目录内，当然你也可以自定义）
```

但如果`loader`不支持缓存呢？我们也有方法,我们可以通过`cache-loader`，它所做的事情很简单，就是`babel-loader`开启`cache`后做的事情，将`loader`的编译结果写入硬盘缓存。再次构建会先比较一下，如果文件较之前的没有发生变化则会直接使用缓存。使用方法如官方`demo`所示，在一些性能开销较大的`loader`之前添加此`loader`即可

`npm i -D cache-loader`

```js
module.exports = {
  module:{
    rules:[
      {
        test: /\.ext$/,
        use:[
          'cache-loader',
          ...loaders
        ],
        include:path.resolve(__dirname,'src')
      }
    ]
  }
}
```

#### 优化打包文件体积

```
打包的速度我们是进行了优化，但是打包后的文件体积却是十分大，造成了页面加载缓慢，浪费流量等，接下来让我们从文件体积上继续优化
```

##### 引入webpack-bundle-analyzer分析打包后的文件

`webpack-bundle-analyzer`将打包后的内容束展示为方便交互的直观树状图，让我们知道我们所构建包中真正引入的内容

`npm i -D webpack-bundle-analyzer`

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  plugins:[
    new BundleAnalyzerPlugin({
      analyzerHost: '127.0.0.1',
      analyzerPort: 8889
    })
  ]
}
```

接下来在`package.json`里配置启动命令

`"analyz": "NODE_ENV=production npm_config_report=true npm run build"`

windows请安装`npm i -D cross-env`

`"analyz": "cross-env NODE_ENV=production npm_config_report=true npm run build"`

接下来`npm run analyz`浏览器会自动打开文件依赖图的网页

##### externals

```
按照官方文档的解释，如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置Externals。
这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用
Externals的方式，我们将这些不需要打包的静态资源从构建逻辑中剔除出去，而使用 CDN
的方式，去引用它们。
```

有时我们希望我们通过`script`引入的库，如用CDN的方式引入的`jquery`，我们在使用时，依旧用`require`的方式来使用，但是却不希望`webpack`将它又编译进文件中。[webpack](https://webpack.js.org/configuration/externals/#root)官网案例如下：

```html
<script
  src="https://code.jquery.com/jquery-3.1.0.js"
  integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk="
  crossorigin="anonymous">
</script>
```

```js
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
}
```

```js
import $ from 'jquery'
$('.my-element').animate(/* ... */)
```

##### Tree-shaking

```
这里单独提一下tree-shaking,是因为这里有个坑。
tree-shaking的主要作用是用来清除代码中无用的部分。
目前在webpack4 我们设置mode为production的时候已经自动开启了tree-shaking。
但是要想使其生效，生成的代码必须是ES6模块。
不能使用其它类型的模块如CommonJS之流。
如果使用Babel的话，这里有一个小问题，因为Babel的预案（preset）默认会将任何模块类型都转译成CommonJS类型，这样会导致tree-shaking失效。
修正这个问题也很简单，在.babelrc文件或在webpack.config.js文件中设置modules： false就好了
```

```js
// .babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}
```

或者

```js
// webpack.config.js
module: {
  rules: [
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', { modules: false }]
        }
      },
      exclude: /(node_modules)/
    }
  ]
}
```