## 函数柯里化

### arguments

1. 简单说就是所有（非箭头）函数的实参（是个伪数组，即arguments）
1. 除了length和索引元素外没有任何array属性
1. typeof返回object
1. 可以被转换为array

```js
let arr = Array.prototype.slice.call(arguments)
let arr = [].slice.call(arguments)
// ES6
let arr = Array.from(arguments)
let arr = [...arguments]
```

### 柯里化

把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数而且返回结果的新函数

```js
// 正则表达式

// 校验数字
let numberReg = /[0-9]+/g;

// 校验小写字母
let stringReg = /[a-z]+/g;

// currying 后（形成了闭包）
function curryingCheck(reg) {
  return function(txt) {
    return reg.test(txt);
  };
}

// 校验数字
let checkNumber = curryingCheck(numberReg);
let checkString = curryingCheck(stringReg);

// 使用
console.log(checkNumber("13888888888")); // true
console.log(checkString("loydLee")); // true
```

#### 好处

1. 参数复用
1. 提前确认
1. 延迟运行