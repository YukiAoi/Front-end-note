# NextTick

## 是什么

Vue 在更新 Dom 时是异步的。当数据发生变化时，Vue 将开启一个异步队列，视图需要等待数据全部变化完成之后，再统一更新

## 为什么要有 nexttick

如果没有 nexttick，每次数据更新都会触发视图更新。有了的话，只会更新一次。所以本质是一个优化机制

## 使用场景

在修改数据后想要得到立刻更新的 Dom 结构，可以使用 Vue.nextTick()

```js
// 组件内使用 vm.$nextTick() 实例方法只需要通过this.$nextTick()，并且回调函数中的 this 将自动绑定到当前的 Vue 实例上
this.message = "修改后的值";
console.log(this.$el.textContent); // => '原始的值'
this.$nextTick(function () {
  console.log(this.$el.textContent); // => '修改后的值'
});
```

```js
// $nextTick() 会返回一个 Promise 对象，可以是用async/await完成相同作用的事情
this.message = "修改后的值";
console.log(this.$el.textContent); // => '原始的值'
await this.$nextTick();
console.log(this.$el.textContent); // => '修改后的值'
```

## 原理

源码位置：/src/core/util/next-tick.js

callbacks 也就是异步操作队列

callbacks 新增回调函数后又执行了 timerFunc 函数，pending 是用来标识同一个时间只能执行一次

```js
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;

  // cb 回调函数会经统一处理压入 callbacks 数组
  callbacks.push(() => {
    if (cb) {
      // 给 cb 回调函数执行加上了 try-catch 错误处理
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  // 执行异步延迟函数 timerFunc
  if (!pending) {
    pending = true;
    timerFunc();
  }

  // 当 nextTick 没有传入函数参数的时候，返回一个 Promise 化的调用
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```

timerFunc 函数定义，这里是根据当前环境支持什么方法则确定调用哪个，分别有：

Promise.then、MutationObserver、setImmediate、setTimeout

通过上面任意一种方法，进行降级操作

```js
export let isUsingMicroTask = false;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  //判断1：是否原生支持Promise
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
  isUsingMicroTask = true;
} else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
  //判断2：是否原生支持MutationObserver
  let counter = 1;
  const observer = new MutationObserver(flushCallbacks);
  const textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}
```

无论是微任务还是宏任务，都会放到 flushCallbacks 使用

这里将 callbacks 里面的函数复制一份，同时 callbacks 置空

依次执行 callbacks 里面的函数

```js
function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
```

### 小结

1. 把回调函数放入 callbacks 等待执行
2. 将执行函数放到微任务或者宏任务中
3. 事件循环到了微任务或者宏任务，执行函数依次执行 callbacks 中的回调
