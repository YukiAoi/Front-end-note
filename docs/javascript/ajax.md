# ajax

## 是什么

AJAX 全称(Async Javascript and XML)，就是异步的 Javascript 和 XML，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页

## 实现过程

实现 Ajax 需要完成以下步骤：

1. 创建 Ajax 的核心对象 XMLHttpRequest 对象
2. 通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接
3. 构建请求所需的数据内容，并通过 XMLHttpRequest 对象的 send() 方法发送给服务器端
4. 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端你的通信状态
5. 接受并处理服务端向客户端响应的数据结果
6. 将处理结果更新到 HTML 页面中

### 创建 XMLHttpRequest 对象

```js
const xhr = new XMLHttpRequest();
```

### 与服务器建立连接

```js
xhr.open(method, url, async, user, password);
```

参数：

- method：表示当前的请求方式，常见的有 GET、POST
- url：服务端地址
- async：布尔值，可选值，表示是否异步执行操作，默认为 true
- user: 用户名，可选值，用于认证，默认为 null
- password: 密码，可选值，用于认证，默认为 null

### 给服务端发送数据

```js
xhr.send(body);
```

body: 在 XHR 请求中要发送的数据体，如果不传递数据则为 null

使用 GET 请求发送数据的时候，需要注意：

- 将请求数据添加到 open()方法中的 url 地址中
- 发送请求数据中的 send()方法中参数设置为 null

### 绑定 onreadystatechange 事件

onreadystatechange 事件用于监听服务器端的通信状态，主要监听的属性为 XMLHttpRequest.readyState

XMLHttpRequest.readyState 有五个状态：

| 值  | 状态             | 描述                                            |
| --- | ---------------- | ----------------------------------------------- |
| 0   | UNSENT           | 代理被创建，但尚未调用 open() 方法              |
| 1   | OPENED           | open() 方法已经被调用                           |
| 2   | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得 |
| 3   | LOADING          | 下载中；responseText 属性已经包含部分数据       |
| 4   | DONE             | 下载操作已完成                                  |

只要 readyState 属性值一变化，就会触发一次 readystatechange 事件

XMLHttpRequest.responseText 属性用于接收服务器端的响应结果

## 封装

```js
//封装一个ajax请求
function ajax(options) {
  //创建XMLHttpRequest对象
  const xhr = new XMLHttpRequest();

  //初始化参数的内容
  options = options || {};
  options.type = (options.type || "GET").toUpperCase();
  options.dataType = options.dataType || "json";
  const params = options.data;

  //发送请求
  if (options.type === "GET") {
    xhr.open("GET", options.url + "?" + params, true);
    xhr.send(null);
  } else if (options.type === "POST") {
    xhr.open("POST", options.url, true);
    xhr.send(params);

    //接收请求
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        let status = xhr.status;
        if (status >= 200 && status < 300) {
          options.success && options.success(xhr.responseText, xhr.responseXML);
        } else {
          options.fail && options.fail(status);
        }
      }
    };
  }
}
```

使用方式：

```js
ajax({
  type: "post",
  dataType: "json",
  data: {},
  url: "https://xxxx",
  success: function (text, xml) {
    //请求成功后的回调函数
    console.log(text);
  },
  fail: function (status) {
    ////请求失败后的回调函数
    console.log(status);
  },
});
```
