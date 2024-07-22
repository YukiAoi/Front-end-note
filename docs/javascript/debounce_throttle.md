# 防抖和节流

本质上是优化高频率执行代码的一种手段

## 防抖

n 秒后再执行该事件，若在 n 秒内被重复触发，则重新计时

```js
// 简单版
function debounce(func, wait) {
  let timeout;

  return function () {
    let context = this; // 保存this指向
    let args = arguments; // 拿到event对象

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}
```

```js
// 防抖如果需要立即执行，可加入第三个参数用于判断
function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout); // timeout 不为null
    if (immediate) {
      let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        func.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}
```

## 节流

```js
function throttled(fn, delay) {
  let timer = null;
  let starttime = Date.now();
  return function () {
    let curTime = Date.now(); // 当前时间
    let remaining = delay - (curTime - starttime); // 从上一次到现在，还剩下多少多余时间
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    if (remaining <= 0) {
      fn.apply(context, args);
      starttime = Date.now();
    } else {
      timer = setTimeout(fn, remaining);
    }
  };
}
```

## 区别

- 防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现。节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能
- 防抖关注一定时间连续触发的事件，只在最后执行一次，而节流一段时间内只执行一次

## 应用场景

防抖：

- 手机号、邮箱验证输入检测
- 窗口大小 resize

节流：

- 滚动加载，加载更多或滚到底部监听
- 搜索框的搜索联想功能
- 表单重复提交
