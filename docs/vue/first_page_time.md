# SPA 首屏加载速度太慢

## 怎么计算首屏加载时间

用 DOMContentLoad 或者 performance 来计算出首屏时间

```js
// 方案一：
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('first contentful painting');
});
// 方案二：
performance.getEntriesByName("first-contentful-paint")[0].startTime

// performance.getEntriesByName("first-contentful-paint")[0]
// 会返回一个 PerformancePaintTiming的实例，结构如下：
{
  name: "first-contentful-paint",
  entryType: "paint",
  startTime: 507.80000002123415,
  duration: 0,
};
```

## 加载慢的原因

1. 网络延时
2. 资源文件体积过大
3. 重复发送请求
4. 加载脚本的时候，渲染内容堵塞

## 解决方案

1. 减小入口文件体积
2. 静态资源本地缓存
3. UI 框架按需加载
4. 图片资源压缩
5. 重复的组件打包
6. 开启 Gzip 压缩
7. 使用 SSR

### 减小入口文件体积

常用的手段是路由懒加载，在 vue-router 配置路由的时候，动态加载路由

```js
routes:[
    path: 'Blogs',
    name: 'ShowBlogs',
    component: () => import('./components/ShowBlogs.vue')
]
```

### 静态资源本地缓存

后端返回资源问题：

- 使用 HTTP 缓存，设置 Cache-Control，Last-Modified，Etag 等响应头
- 使用 Service Worker 离线缓存

前端合理使用 localStorage

### UI 框架按需加载

```js
import {
  Button,
  Input,
  Pagination,
  Table,
  TableColumn,
  MessageBox,
} from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(Pagination);
```

### 重复的组件打包

如果 A.js 是一个常用的库，又有很多路由在使用它，就会造成重复下载。可以在 webpack 的 config 文件中，修改 CommonsChunkPlugin 的配置

```js
minChunks: 3; //表示会把使用3次及以上的包抽离出来，放进公共依赖文件
```

### 图片资源的压缩

图片资源是对页面性能影响最大的因素

- 对于所有的图片资源，我们可以进行适当的压缩
- 对页面上使用到的 icon，可以使用在线字体图标，或者雪碧图，将众多小图标合并到同一张图上

### 开启 GZip 压缩

安装 compression-webpack-plugin

```js
npm i compression-webpack-plugin -D
```

在 vue.congig.js 中引入并修改 webpack 配置

```js
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
  // 其他配置
  configureWebpack: (config) => {
    // 直接写成process.env.   NODE_ENV会报错
    if (process.env["NODE_ENV"] === "production") {
      config.mode = "production";
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|\.css/, //匹配文件名
            threshold: 10240, //对超过10k的数据进行压缩
            deleteOriginalAssets: false, //是否删除原文件
          }),
        ],
      };
    }
  },
};
```
