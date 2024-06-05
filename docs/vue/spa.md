# 单页应用（SPA）

## 什么是 SPA

SPA 是一种网络应用程序或网站的模型，通过动态重写当前页面来与用户交互。举个例子就是一个杯子，早上装的是豆浆，中午装的茶，晚上装的可乐。
`vue`，`react`，`angular`都是 SPA。

## SPA 与 MPA 的区别

MAP 就是多页应用，当我们访问另外一个页面的时候，都需要重新加载 html，css，js

|                  | SPA                      | MPA                                   |
| ---------------- | ------------------------ | ------------------------------------- |
| 组成             | 一个主页面和多个页面片段 | 多个主页面                            |
| 刷新方式         | 局部刷新                 | 整页刷新                              |
| url 模式         | 哈希模式                 | 历史模式                              |
| SEO 搜索引擎优化 | 难实现，可以用 SSR 改善  | 容易实现                              |
| 数据传递         | 容易                     | 通过 url、cookie、localStorage 等传递 |
| 页面切换         | 速度快，用户体验友好     | 速度慢，用户体验差                    |
| 维护成本         | 相对容易                 | 相对复杂                              |

## 优点

1. 用户体验好，快，内容改变不需要重新加载页面
2. 前后端分离，分工明确

## 缺点

1. 不利于搜索引擎抓取
2. 首次渲染比较慢

## 实现一个 SPA

### 原理

1. hash 模式下，监听地址栏 hash 值的变化，然后改变页面
2. history 模式下，用 pushState 记录浏览器历史，然后改变页面

### 实现

#### hash 模式

```js
//定义Router
class Router {
  constructor() {
    this.routes = {}; //存放路由path和calback
    this.currentUrl = "";
    // 监听路由变化并调用相应的路由回调
    window.addEventListener("load", () => this.refresh(), false);
    window.addEventListener("hashchange", () => this.refresh(), false);
  }
  route(path, callback) {
    this.routes[path] = callback;
  }
  push(path) {
    window.location.hash = path;
  }
  refresh() {
    this.currentUrl = location.hash.slice(1) || "/"; //去掉hash中的#
    this.routes[this.currentUrl] && this.routes[this.currentUrl](); //使用回调
  }
}

// 使用router
window.miniRouter = new Router();
miniRouter.route("/", () => console.log("page1"));
miniRouter.route("/page2", () => console.log("page2"));

miniRouter.push("/");
miniRouter.push("/page2");
```

#### history 模式

history 模式核心是调用 html5 history api，以下是几个相关的 api

- history.pushState：向浏览器历史记录里添加记录
- history.replaceState：修改浏览器历史记录中当前的记录
- hostory.popState：history 改变时触发

```js
// 定义Router
class Router {
  constructor() {
    this.routes = {};
    this.listenPopState();
  }
  init(path) {
    history.replaceState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  route(path, callback) {
    this.routes[path] = callback;
  }
  push(path) {
    history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }
  listenPopState() {
    window.addEventListener("popState", (e) => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}

// 使用Router
window.miniRouter = new Router();
miniRouter.route("/", () => console.log("page1"));
miniRouter.route("/page2", () => console.log("page2"));

// 初始化
miniRouter.init("/");
// 跳转
miniRouter.push("/page2");
```

## 如何给 SPA 做 SEO

1. SSR 服务端渲染
   将组件或页面通过服务器生成 html，再传给浏览器，比如 nuxt.js
2. 静态化

- 通过程序将动态页面抓取并保存为静态页面，页面实际存在于服务器的硬盘中
- 通过 web 服务器的 URL Rewrite，把外部请求的静态地址转化为动态页面，而静态页面是不存在的
