# Generator

## 是什么

是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同

执行 Generator 函数会返回一个遍历器对象，可以依次遍历 Generator 函数内部的每一个状态

形式上，Generator 函数是一个普通函数，但是有两个特征：

1. function 关键字与函数名之间有一个星号
2. 函数体内部使用 yield 表达式，定义不同的内部状态

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
```

## 使用

Generator 函数会返回一个遍历器对象，即具有 Symbol.iterator 属性，并且返回给自己

```js
function* gen() {
  // some code
}

var g = gen();

g[Symbol.iterator]() === g;
// true
```

通过 yield 关键字可以暂停 generator 函数返回的遍历器对象的状态

```js
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return "ending";
}
var hw = helloWorldGenerator();
```

上述代码存在三个状态：hello、world、return

通过 next 方法才会遍历到下一个内部状态，其运行逻辑如下：

- 遇到 yield 表达式，就暂停执行后面的操作，并将紧跟在 yield 后面的那个表达式的值，作为返回的对象的 value 属性值
- 下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式
- 如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 return 语句为止，并将 return 语句后面的表达式的值，作为返回的对象的 value 属性值
- 如果该函数没有 return 语句，则返回的对象的 value 属性值为 undefined

```js
hw.next();
// { value: 'hello', done: false }

hw.next();
// { value: 'world', done: false }

hw.next();
// { value: 'ending', done: true }

hw.next();
// { value: undefined, done: true }
```

done 用来判断是否存在下个状态，value 对应状态值

yield 表达式本身没有返回值，或者说总是返回 undefined

通过调用 next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值

```js
function* foo(x) {
  var y = 2 * (yield x + 1);
  var z = yield y / 3;
  return x + y + z;
}

var a = foo(5);
a.next(); // Object{value:6, done:false}
a.next(); // Object{value:NaN, done:false}
a.next(); // Object{value:NaN, done:true}

var b = foo(5);
b.next(); // { value:6, done:false }
b.next(12); // { value:8, done:false }
b.next(13); // { value:42, done:true }
```

因为 Generator 函数返回的是 Iterator 对象，所以我们还可以通过 for...of 进行遍历

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

原生对象没有遍历接口，通过 Generator 函数为它加上这个接口，就能使用 for...of 进行遍历了

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: "Jane", last: "Doe" };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

## 异步解决方案

### 回调函数

回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，再调用这个函数

```js
fs.readFile("/etc/fstab", function (err, data) {
  if (err) throw err;
  console.log(data);
  fs.readFile("/etc/shells", function (err, data) {
    if (err) throw err;
    console.log(data);
  });
});
```

readFile 函数的第三个参数，就是回调函数，等到操作系统返回了/etc/passwd 这个文件以后，回调函数才会执行

### Promise

Promise 是为了解决回调地狱而产生的，将回调函数的嵌套，改成链式调用

```js
const fs = require("fs");

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

readFile("/etc/fstab")
  .then((data) => {
    console.log(data);
    return readFile("/etc/shells");
  })
  .then((data) => {
    console.log(data);
  });
```

这种链式操作形式，使异步任务的两段执行更清楚了，但是也存在了很明显的问题，代码变得冗杂了，语义化并不强

### generator

yield 表达式可以暂停函数执行，next 方法用于恢复函数执行，这使得 Generator 函数非常适合将异步任务同步化

```js
const gen = function* () {
  const f1 = yield readFile("/etc/fstab");
  const f2 = yield readFile("/etc/shells");
  console.log(f1.toString());
  console.log(f2.toString());
};
```

### async/await

将上面 Generator 函数改成 async/await 形式，更为简洁，语义化更强

```js
const asyncReadFile = async function () {
  const f1 = await readFile("/etc/fstab");
  const f2 = await readFile("/etc/shells");
  console.log(f1.toString());
  console.log(f2.toString());
};
```

### 区别

- promise 和 async/await 是专门用于处理异步操作的
- Generator 并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署 Interator 接口……）
- promise 编写代码相比 Generator、async 更为复杂化，且可读性也稍差
- Generator、async 需要与 promise 对象搭配处理异步情况
- async 实质是 Generator 的语法糖，相当于会自动执行 Generator 函数
- async 使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案

## 使用场景

Generator 是异步解决的一种方案，最大特点则是将异步操作同步化表达出来

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();

// 卸载UI
loader.next();
```

还能利用 Generator 函数，在对象上实现 Iterator 接口

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```