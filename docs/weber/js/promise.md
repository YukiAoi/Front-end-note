## promise

本质上`Promise`是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。更现代的函数会返回一个`Promise对象`，使得你可以`将你的回调函数绑定在该Promise`上。

### 链式调用

在过去，要想做多重的异步操作，会导致经典的回调地狱：

```js
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

现在，我们可以把回调绑定到返回的 Promise 上，形成一个 Promise 链：

```js
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```

### Catch的后续链式操作

**因为抛出了错误，所以前一个then中的回调不会执行**

```js
new Promise((resolve, reject) => {
    console.log('初始化');
    resolve();
})
.then(() => {
    throw new Error('有哪里不对了');
    console.log('执行「这个」');
})
.catch(() => {
    console.log('执行「那个」');
})
.then(() => {
    console.log('执行「这个」，无论前面发生了什么');
});
/*
输出结果：
初始化
执行“那个”
执行“这个”，无论前面发生了什么
*/
```

### 组合

`Promise.resolve()`和`Promise.reject()`是手动创建一个已经`resolve`或者`reject`的Promise快捷方法。
`Promise.all()`和`Promise.race()`是并行运行异步操作的两个组合式工具。

#### Promise.all

如果都成功，则返回所有的promise，但是只要有一个失败，就会抛出错误信息

```js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

#### Promise.race

返回一个promise，一旦迭代器中的某个promise解决或拒绝，返回的promise就会解决或拒绝

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'one');
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2]).then((value) => {
  // promise2更快，所以只打印two
  console.log(value);
});
```

### promise优缺点
1. 对象的状态不受外界影响
1. 一旦状态改变，就不会再变，任何时候都可以得到这个结果
1. 无法取消Promise
1. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部
1. 处于pending状态时，无法得知目前进展到哪一个阶段