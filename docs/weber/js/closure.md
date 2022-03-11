## 闭包

闭包就是一个函数和对其周围状态的引用捆绑在一起（或者说函数被引用包围）。即：闭包让你可以在一个内层函数中访问到其外层函数的作用域。在JS中每当创建一个函数，闭包就会在函数创建的同时被创建出来。

### 闭包的作用

1. 保护：避免自己的变量不受干扰（作用域）
1. 保存：私有变量不被释放，就可以供起下级的上下文调用

### 形成条件

1. 函数嵌套
1. 内部函数应用外部函数私有变量

### 用途

1. 模仿块级作用域
```js
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```
1. 保护变量不被回收
1. 封装私有化变量
1. 创建模块

### 应用场景

1. 回掉函数
1. 函数内部返回另一个匿名函数

### 优缺点

1. 延长局部变量的生命周期
2. 过多的闭包可能会导致内存泄漏