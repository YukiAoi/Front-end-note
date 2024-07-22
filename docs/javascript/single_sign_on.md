# 单点登录

## 是什么

单点登录，简称为 SSO，是在多个应用系统中，用户只需要登录一次就可以访问所有相互信任的应用系统

## 实现

### 同域名下的单点登录

cookie 的 domain 属性设置为当前域的父域，并且父域的 cookie 会被子域所共享。path 属性默认为 web 应用的上下文路径

将 Cookie 的 domain 属性设置为父域的域名（主域名），同时将 Cookie 的 path 属性设置为根路径，将 Session ID（或 Token）保存到父域中。这样所有的子域应用就都可以访问到这个 Cookie

### 不同域名下的单点登录(一)

不同域的情况下，Cookie 是不共享的，这里我们可以部署一个认证中心，用于专门处理登录请求的独立的 Web 服务

用户统一在认证中心进行登录，登录成功后，认证中心记录用户的登录状态，并将 token 写入 Cookie（注意这个 Cookie 是认证中心的，应用系统是访问不到的）

应用系统检查当前请求有没有 Token，如果没有，说明用户在当前系统中尚未登录，那么就将页面跳转至认证中心

由于这个操作会将认证中心的 Cookie 自动带过去，因此，认证中心能够根据 Cookie 知道用户是否已经登录过了

如果认证中心发现用户尚未登录，则返回登录页面，等待用户登录

如果发现用户已经登录过了，就不会让用户再次登录了，而是会跳转回目标 URL，并在跳转前生成一个 Token，拼接在目标 URL 的后面，回传给目标应用系统

应用系统拿到 Token 之后，还需要向认证中心确认下 Token 的合法性，防止用户伪造。确认无误后，应用系统记录用户的登录状态，并将 Token 写入 Cookie，然后给本次访问放行。（注意这个 Cookie 是当前应用系统的）当用户再次访问当前应用系统时，就会自动带上这个 Token

### 不同域名下的单点登录(二)

可以选择将 Session ID （或 Token ）保存到浏览器的 LocalStorage 中，让前端在每次向后端发送请求时，主动将 LocalStorage 的数据传递给服务端

这些都是由前端来控制的，后端需要做的仅仅是在用户登录成功后，将 Session ID（或 Token）放在响应体中传递给前端

前端拿到 Session ID（或 Token ）后，除了将它写入自己的 LocalStorage 中之外，还可以通过特殊手段将它写入多个其他域下的 LocalStorage 中

```js
// 获取 token
var token = result.data.token;

// 动态创建一个不可见的iframe，在iframe中加载一个跨域HTML
var iframe = document.createElement("iframe");
iframe.src = "http://app1.com/localstorage.html";
document.body.append(iframe);
// 使用postMessage()方法将token传递给iframe
setTimeout(function () {
  iframe.contentWindow.postMessage(token, "http://app1.com");
}, 4000);
setTimeout(function () {
  iframe.remove();
}, 6000);

// 在这个iframe所加载的HTML中绑定一个事件监听器，当事件被触发时，把接收到的token数据写入localStorage
window.addEventListener(
  "message",
  function (event) {
    localStorage.setItem("token", event.data);
  },
  false
);
```

前端通过 iframe+postMessage() 方式，将同一份 Token 写入到了多个域下的 LocalStorage 中，前端每次在向后端发送请求之前，都会主动从 LocalStorage 中读取 Token 并在请求中携带，这样就实现了同一份 Token 被多个域所共享
