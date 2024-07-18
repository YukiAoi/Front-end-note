# 事件循环

## 是什么

同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就是事件循环

## 宏任务与微任务

异步任务还可以细分为微任务与宏任务

### 微任务

一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前

常见的微任务有：

- Promise.then
- MutaionObserver
- Object.observe（已废弃；Proxy 对象替代）
- process.nextTick（Node.js）

### 宏任务

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的

常见的宏任务有：

- script (可以理解为外层同步代码)
- setTimeout/setInterval
- UI rendering/UI 事件
- postMessage、MessageChannel
- setImmediate、I/O（Node.js）

![eventLoop-事件循环](../assets/image/eventLoop-%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF.png)

按照这个流程，它的执行机制是：

- 执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中
- 当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

## async 与 await

async 是用来声明一个异步方法，而 await 是用来等待异步方法执行

### async

async 函数返回一个 promise 对象，下面两种方法是等效的

```js
function f() {
  return Promise.resolve("TEST");
}

// asyncF is equivalent to f!
async function asyncF() {
  return "TEST";
}
```

### await

await 后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值

```js
async function f() {
  // 等同于
  // return 123
  return await 123;
}
f().then((v) => console.log(v)); // 123
```

不管 await 后面跟着的是什么，await 都会阻塞后面的代码

```js
async function fn1() {
  console.log(1);
  await fn2();
  console.log(2); // 阻塞
}

async function fn2() {
  console.log("fn2");
}

fn1();
console.log(3);
```

输出结果为：1，fn2，3，2
