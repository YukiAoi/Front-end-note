# this

## 定义

this 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象

同时，在函数执行过程中，this 一旦被确定了，就不可以再更改

## 绑定规则

根据不同的使用场合，this 有不同的值：

- 默认绑定
- 隐式绑定
- new 绑定
- 显式绑定

### 默认绑定

全局环境中定义 person 函数，内部使用 this 关键字

```js
var name = "Jenny";
function person() {
  return this.name;
}
console.log(person()); //Jenny
```

调用函数的对象在浏览器中位于 window，因此 this 指向 window，所以输出 Jenny

注意：

严格模式下，不能将全局对象用于默认绑定，this 会绑定到 undefined，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象

### 隐式绑定

函数还可以作为某个对象的方法调用，这时 this 就指这个上级对象

```js
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```

这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this 指向的也只是它上一级的对象

```js
var o = {
  a: 10,
  b: {
    fn: function () {
      console.log(this.a); //undefined
    },
  },
};
o.b.fn();
```

this 的上一级对象为 b，b 内部并没有 a 变量的定义，所以输出 undefined

```js
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function () {
      console.log(this.a); //undefined
      console.log(this); //window
    },
  },
};
var j = o.b.fn;
j();
```

此时 this 指向的是 window，this 永远指向的是最后调用它的对象，虽然 fn 是对象 b 的方法，但是 fn 赋值给 j 时候并没有执行，所以最终指向 window

### new 绑定

通过 new 关键字生成一个实例对象，此时 this 指向这个实例对象

```js
function test() {
  this.x = 1;
}

var obj = new test();
obj.x; // 1
```

之所以输出 1，是因为 new 关键字改变了 this 的指向

再列举一些特殊情况：

new 过程遇到 return 一个对象，此时 this 指向为返回的对象

```js
function fn() {
  this.user = "xxx";
  return {};
}
var a = new fn();
console.log(a.user); //undefined
```

如果返回一个简单类型的时候，则 this 指向实例对象

```js
function fn() {
  this.user = "xxx";
  return 1;
}
var a = new fn();
console.log(a.user); //xxx
```

null 虽然也是对象，但是此时 new 仍然指向实例对象

```js
function fn() {
  this.user = "xxx";
  return null;
}
var a = new fn();
console.log(a.user); //xxx
```

### 显式绑定

apply()、call()、bind()是函数的一个方法，作用是改变函数的调用对象。它的第一个参数就表示改变后的调用这个函数的对象。因此，这时 this 指的就是这第一个参数

```js
var x = 0;
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;
obj.m.apply(obj); // 1
```

## 箭头函数

箭头函数的 this 指向它的定义对象

```js
const obj = {
  sayThis: () => {
    console.log(this);
  },
};

obj.sayThis(); // window 因为 JavaScript 没有块作用域，所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
const globalSay = obj.sayThis;
globalSay(); // window 浏览器中的 global 对象
```

但是有些其他问题，比如说：

绑定事件监听

```js
const button = document.getElementById("mngb");
button.addEventListener("click", () => {
  console.log(this === window); // true
  this.innerHTML = "clicked button";
});
```

我们想要 this 为点击的 button，但此时 this 指向了 window

在原型上添加方法时候，this 也指向 window

```js
Cat.prototype.sayName = () => {
  console.log(this === window); //true
  return this.name;
};
const cat = new Cat("mm");
cat.sayName();
```

## 优先级

new 绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级
