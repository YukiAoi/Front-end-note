# 函数缓存

## 是什么

函数缓存，就是将函数运算过的结果进行缓存

本质上就是用空间（缓存存储）换时间（计算过程）

常用于缓存数据计算结果和缓存对象

## 如何实现

实现函数缓存主要依靠闭包、柯里化、高阶函数

### 闭包

```js
(function () {
  var a = 1;
  function add() {
    const b = 2;
    let sum = b + a;
    console.log(sum); // 3
  }
  add();
})();
```

### 柯里化

```js
// 非函数柯里化
var add = function (x, y) {
  return x + y;
};
add(3, 4); //7

// 函数柯里化
var add2 = function (x) {
  //**返回函数**
  return function (y) {
    return x + y;
  };
};
add2(3)(4); //7
```

### 高阶函数

```js
function foo() {
  var a = 2;

  function bar() {
    console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); //2
```

## 应用场景

以下几种情况下，适合使用缓存：

- 对于昂贵的函数调用，执行复杂计算的函数
- 对于具有有限且高度重复输入范围的函数
- 对于具有重复输入值的递归函数
- 对于纯函数，即每次使用特定输入调用时返回相同输出的函数
