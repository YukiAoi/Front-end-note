# 本地缓存

## 有哪些

1. cookie
2. sessionStorage
3. localStorage
4. indexedDB

### cookie

1. 不超过 4K
2. 每次请求都会被发送
3. Expires：用于设置 Cookie 的过期时间
4. Max-Age：用于设置在 Cookie 失效之前需要经过的秒数（优先级比 Expires 高）
5. Domain：指定了 Cookie 可以送达的主机名
6. Path：指定了一个 URL 路径，这个路径必须出现在要请求的资源的路径中才可以发送 Cookie
7. Secure：Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端

### localStorage

1. 不会过期
2. 存储的信息在同一域中是共享的
3. 当本页操作（新增、修改、删除）了 localStorage 的时候，本页面不会触发 storage 事件,但是别的页面会触发 storage 事件
4. 大小：5M（跟浏览器厂商有关系）
5. localStorage 本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
6. 受同源策略的限制

```js
// 设置
localStorage.setItem("username", "cfangxu");
// 获取
localStorage.getItem("username");
// 获取键名
localStorage.key(0); //获取第一个键名
// 删除
localStorage.removeItem("username");
// 清除所有存储
localStorage.clear();
```

### sessionStorage

一旦页面（会话）关闭，sessionStorage 将会删除数据

## 区别

1. 存储大小：cookie 数据大小不能超过 4k，storage 可以达到 5M 或更大
2. 有效时间：localStorage 除非主动删除数据否则不过期； sessionStorage 数据在当前浏览器窗口关闭后自动删除；cookie 在设置的过期时间之前一直有效
3. 数据与服务器之间的交互方式：cookie 的数据会自动的传递到服务器，服务器端也可以写 cookie 到客户端； storage 仅在本地保存
